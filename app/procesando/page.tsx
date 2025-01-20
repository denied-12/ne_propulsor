'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import LoadingSpinner from "../components/loading-spinner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProcesandoPage() {
  const [status, setStatus] = useState<'processing' | 'approved' | 'rejected'>('processing')
  const router = useRouter()

  useEffect(() => {
    const checkStatus = async () => {
      const cedula = sessionStorage.getItem('cedula')
      // Aquí deberías implementar una función para verificar el estado del préstamo
      // Por ahora, simularemos una respuesta después de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 5000))
      setStatus(Math.random() > 0.5 ? 'approved' : 'rejected')
    }

    checkStatus()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/placeholder.svg?height=48&width=96"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {status === 'processing' ? 'Procesando tu solicitud' : 
               status === 'approved' ? 'Solicitud Aprobada' : 'Solicitud Rechazada'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {status === 'processing' ? (
              <>
                <LoadingSpinner />
                <p className="text-gray-600">
                  Estamos validando tu información. Por favor espera un momento...
                </p>
              </>
            ) : status === 'approved' ? (
              <>
                <p className="text-green-600">
                  ¡Felicidades! Tu solicitud de préstamo ha sido aprobada.
                </p>
                <Button 
                  onClick={() => router.push('/')}
                  className="bg-[#E6007E] hover:bg-[#C4006B]"
                >
                  Volver al inicio
                </Button>
              </>
            ) : (
              <>
                <p className="text-red-600">
                  Lo sentimos, tu solicitud de préstamo ha sido rechazada.
                </p>
                <Button 
                  onClick={() => router.push('/')}
                  className="bg-[#E6007E] hover:bg-[#C4006B]"
                >
                  Volver al inicio
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

