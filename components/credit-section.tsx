import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'

export default function CreditSection() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">
        Desembolsa hasta 25.000.000*
      </h1>
      <h2 className="text-4xl font-bold text-[#2D004C] mb-4">
        Crédito
        <br />
        Propulsor
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        *Crédito de Consumo de Libre inversión, el monto máximo depende de tu capacidad de endeudamiento y políticas internas
      </p>
      <h3 className="text-xl mb-6">
        ¡Recibe la plata de una en tu Nequi!
      </h3>
      <Button className="w-full py-6 text-lg bg-[#E6007E] hover:bg-[#C4006B]">
        Solicítalo
      </Button>

      {/* Floating chat button */}
      <button
        className="fixed bottom-6 right-6 bg-[#2D004C] text-white p-4 rounded-full shadow-lg"
        aria-label="Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

