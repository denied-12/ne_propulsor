import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
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
            <CardTitle>Crédito Propulsor</CardTitle>
            <CardDescription>
              Solicita hasta $25.000.000 de forma rápida y segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/cedula">
              <Button className="w-full bg-[#E6007E] hover:bg-[#C4006B]">
                Solicitar ahora
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

