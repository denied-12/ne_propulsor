import React from 'react';

const CreditSteps: React.FC = () => {
return (
    <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="grid gap-8 md:gap-12">
        {/* Title and Step 1 */}
        <div className="grid md:grid-cols-[auto_2fr] gap-6 items-start">
        <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-[300px]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D0C3A]">
                ¿Cómo pido mi crédito propulsor?
            </h2>
            </div>
            <div className="md:ml-[130px]">
            <div className="bg-[#FAF5FF] rounded-2xl p-6 w-24 h-24 flex items-end justify-end relative">
            <span className="text-[#E20B8C] text-7xl font-bold absolute bottom-2 right-2">1.</span>
            </div>
        </div>
        </div>
        <div className="space-y-2 md:ml-[124px]">
            <h3 className="text-2xl font-bold text-gray-900">Pídelo desde la app</h3>
            <p className="text-lg text-gray-600">
            Entra a tu app Nequi y en <span className="font-semibold">Servicios</span> ingresa a la categoría{" "}
            <span className="font-semibold">Finanzas</span>, toca el icono de{" "}
            <span className="font-semibold">Préstamos</span> y allí escoge{" "}
            <span className="font-semibold">Préstamo Propulsor</span>.
            </p>
        </div>
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <div className="md:ml-[450px]">
            <div className="bg-[#FAF5FF] rounded-2xl p-6 w-24 h-24 flex items-end justify-end relative">
            <span className="text-[#E20B8C] text-7xl font-bold absolute bottom-2 right-2">2.</span>
            </div>
        </div>
        <div className="space-y-2 md:ml-[124px]">
            <h3 className="text-2xl font-bold text-gray-900">Selecciona el valor y consulta las cuotas</h3>
            <p className="text-lg text-gray-600">
            Podemos prestarte desde <span className="font-semibold">$100.000</span> hasta{" "}
            <span className="font-semibold">$25.000.000</span>, escoge el valor y te mostraremos cuánto pagarás en
            cuotas.
            </p>
        </div>
        </div>

        {/* Step 3 */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <div className="md:ml-[450px]">
            <div className="bg-[#FAF5FF] rounded-2xl p-6 w-24 h-24 flex items-end justify-end relative">
            <span className="text-[#E20B8C] text-7xl font-bold absolute bottom-2 right-2">3.</span>
            </div>
        </div>
        <div className="space-y-2 md:ml-[124px]">
            <h3 className="text-2xl font-bold text-gray-900">Lee y acepta las condiciones</h3>
            <p className="text-lg text-gray-600">
            Revisa el costo de respaldo de tu préstamo, las condiciones, llena tus datos personales y si te suena{" "}
            <span className="font-semibold">¡acepta!</span>
            </p>
        </div>
        </div>
    </div>
    </div>
);
};

export default CreditSteps;