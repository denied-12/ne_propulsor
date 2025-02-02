import { NextResponse } from 'next/server';
import { getLoanStatus } from '@/app/actions/telegram';

/**
 * Maneja solicitudes HTTP GET para obtener el estado de un préstamo.
 * 
 * @param {Request} req - La solicitud HTTP entrante.
 * @returns {Promise<NextResponse>} - Una respuesta JSON con el estado del préstamo o un mensaje de error.
 */
export async function GET(req: Request): Promise<NextResponse> {
  // Extrae los parámetros de búsqueda de la URL de la solicitud.
  const { searchParams } = new URL(req.url);
  const cedula = searchParams.get('cedula');

  // Verifica si el parámetro 'cedula' está presente.
  if (!cedula) {
    // Si 'cedula' no está presente, devuelve una respuesta de error.
    return NextResponse.json(
      { error: 'Cédula is required' },
      { status: 400 }
    );
  }

  // Llama a la función getLoanStatus para obtener el estado del préstamo.
  const status = await getLoanStatus(cedula);
  
  // Devuelve una respuesta JSON con el estado del préstamo.
  return NextResponse.json({ status });
}
