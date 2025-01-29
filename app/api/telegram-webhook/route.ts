import { NextResponse } from 'next/server';
import { handleTelegramWebhook } from '@/app/actions/telegram';

export async function POST(req: Request) {
  try {
    const result = await handleTelegramWebhook(req);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}    
