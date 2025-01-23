import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';

function App() {
  const [amount, setAmount] = useState('1000000');
  const [months, setMonths] = useState('36');
  const [openFaq, setOpenFaq] = useState('');

  const faqItems = [
    { id: 'use', question: '¿Para qué usar este simulador?' },
    { id: 'fga', question: '¿Qué es la fianza o FGA?' },
    { id: 'interest', question: '¿Qué son los intereses (E.A y E.M)?' },
    { id: 'insurance', question: '¿Por qué hay que pagar un seguro?' },
    { id: 'vtua', question: '¿Qué es VTUA?' },
  ];

  const calculateLoan = () => {
    const loanAmount = parseFloat(amount);
    const bondAmount = loanAmount * 0.119;
    const monthlyInterest = 0.0185;
    const monthlyPayment = (loanAmount + bondAmount) * 
      (monthlyInterest * Math.pow(1 + monthlyInterest, parseInt(months))) / 
      (Math.pow(1 + monthlyInterest, parseInt(months)) - 1);
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      bondAmount: Math.round(loanAmount + bondAmount),
      insurance: 4350
    };
  };

  const loanInfo = calculateLoan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Column - FAQ */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Simula tu préstamo</h1>
          <p className="text-pink-600 mb-4">Por si te lo preguntabas:</p>
          
          <div className="space-y-2">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === item.id ? '' : item.id)}
                >
                  <span>{item.question}</span>
                  {openFaq === item.id ? (
                    <MinusIcon className="w-5 h-5" />
                  ) : (
                    <PlusIcon className="w-5 h-5" />
                  )}
                </button>
                {openFaq === item.id && (
                    <div className="px-4 pb-3 text-gray-600">
                    {item.id === 'use' && (
                      <p>Aquí podrás revisar tus cuentas. Simula el valor que quisieras pedir y toma la mejor decisión conociendo a detalle lo que compone tu préstamo.</p>
                    )}
                    {item.id === 'fga' && (
                      <p>La fianza o FGA es un porcentaje adicional que se suma al valor del préstamo para garantizar el pago del mismo.</p>
                    )}
                    {item.id === 'interest' && (
                      <p>Los intereses E.A (Efectivo Anual) y E.M (Efectivo Mensual) son las tasas que se aplican al préstamo para calcular el costo del mismo.</p>
                    )}
                    {item.id === 'insurance' && (
                      <p>El seguro es un monto adicional que se paga para cubrir cualquier eventualidad que pueda afectar el pago del préstamo.</p>
                    )}
                    {item.id === 'vtua' && (
                      <p>VTUA es un término utilizado para describir el valor total de uso del activo, que incluye el préstamo y todos los costos adicionales.</p>
                    )}
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-gray-700 font-medium mb-2">¿Cuánta plata necesitas?</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Hasta $25.000.000</p>
                </div>
                <div className="flex-1">
                  <select
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    {[12, 24, 36, 48, 60].map((m) => (
                      <option key={m} value={m}>{m} meses</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Hasta 60 meses</p>
                </div>
              </div>
            </div>

            <button className="bg-purple-900 text-white px-6 py-2 rounded-md">
              Calcular
            </button>

            <div className="border-t pt-6">
              <h3 className="text-2xl text-pink-600 font-medium mb-4">Info de tu préstamo</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Valor prestado:</p>
                  <p className="text-xl">$ {parseInt(amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Valor prestado + fianza</p>
                  <p className="text-xl">$ {loanInfo.bondAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-pink-600 text-white p-4 rounded-lg mb-6">
                <p className="text-sm">Cuota de tu préstamo</p>
                <p className="text-3xl font-bold">$ {loanInfo.monthlyPayment.toLocaleString()}</p>
              </div>

              <div>
                <h4 className="text-xl text-pink-600 mb-4">Detalles</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Tasa interés hasta</p>
                    <p>1.85 % E.M (24.59% E.A)</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Cuotas</p>
                    <p>{months} meses</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tu seguro</p>
                    <p>$ {loanInfo.insurance.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;