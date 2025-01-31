import { NextResponse } from 'next/server';
import { getLoanStatus } from '@/app/actions/telegram';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cedula = searchParams.get('cedula');

  if (!cedula) {
    return NextResponse.json(
      { error: 'Cédula is required' },
      { status: 400 }
    );
  }

  const status = await getLoanStatus(cedula);
  return NextResponse.json({ status });
}