import React from 'react';
import { ChevronRight, Clock, Wallet, PiggyBank } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#1A0B1F] text-white p-6 md:p-12 mt-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,2fr] gap-12">
        {/* Header - Left aligned */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-pink-300  top-12">
            ¿Cómo pago mi crédito?
          </h1>
        </div>

        {/* Main content - Right aligned */}
        <div className="space-y-12">
          {/* Payment info grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Pagos</h2>
                <p className="text-gray-300 mb-4">
                  El día del pago de tu cuota, <span className="font-semibold">entra a tu app Nequi</span> y realiza el pago con el saldo que tengas en tu Disponible.
                  también puedes recargar tu Nequi y procederemos con el <span className="font-semibold">débito automático</span> para el pago de tu crédito.

                  Recuerda que <span className="font-semibold">durante las 11:00 p.m. y las 6:00 a.m.</span> (hora Colombia), <span className="font-semibold">las opciones de pedir o pagar un crédito en Nequi no estarán disponibles.</span>
                
                </p>
              </div>

              
            </div>

            {/* Right column */}
            <div className=" p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                
                Abono a capital
              </h2>
              <p className="text-gray-300">
                Puedes hacer abonos anticipados a tu préstamo sin tener ninguna penalización, con esto puedes disminuir tu cuota mensual o el plazo que resta para pagar tu préstamo.
              </p>
            </div>
          </div>

          {/* How much to pay section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">¿Cuánto debo pagar?</h2>
            <p className="text-gray-300">
              Antes de desembolsar tu crédito te mostramos cuánto tienes que pagar en cada cuota, al hacer abonos extras a capital puedes bajar el valor de la cuota o el tiempo que te demoras pagando, pero si quedas en mora puedes terminar pagando más. Te invitamos a que consultes el valor a pagar en la App, haciendo clic en el botón de Préstamos
            </p>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-pink-300">Resuelve tus dudas</h2>
            <div className="space-y-4">
              {[
                '¿Se puede pedir más de un préstamo Propulsor?',
                '¿Puedo pagar antes mi préstamo?',
                '¿Cómo mejorar la info financiera para pedir un préstamo Propulsor?'
              ].map((question, index) => (
                <button
                  key={index}
                  className="w-full bg-white text-[#1A0B1F] p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <span>{question}</span>
                  <ChevronRight className="text-[#1A0B1F]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;