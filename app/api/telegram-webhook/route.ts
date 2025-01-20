import { handleTelegramWebhook } from '@/app/actions/telegram'

export async function POST(req: Request) {
  return handleTelegramWebhook(req)
}

