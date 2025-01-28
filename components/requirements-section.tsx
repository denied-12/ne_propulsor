import React from 'react';

function App() {
  return (
    <div className="min-h-[755px] w-full bg-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Text content on the left */}
          <div className="md:w-1/3 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-950 mb-4">
              ¿Qué requisitos<br />debo cumplir?
            </h1>
            <p className="text-gray-600 text-lg mb-12">
              Confirma lo que necesitas para solicitar tu préstamo
            </p>
          </div>

          {/* Cards container on the right */}
          <div className="md:w-2/3 relative">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 max-w-md">
                <img 
                  src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/66e9e67235dfd05e3a7242d1__Prestamo%20propulsor.webp" 
                  alt="Personas usando celular"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-950 mb-3">
                    Tu Nequi abierto y activo
                  </h3>
                  <p className="text-gray-600">
                    Necesitamos conocerte muy bien, ¡tu cuenta activa nos ayudará a hacerlo!
                  </p>
                </div>
              </div>

              {/* Card 2 - positioned slightly lower */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 max-w-md md:mt-16">
                <img 
                  src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/66e9e674f2831b2b46a0c6ba_Prestamo%20nequi.webp" 
                  alt="Personas revisando finanzas"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-950 mb-3">
                    Tu vida financiera
                  </h3>
                  <p className="text-gray-600">
                    Asegúrate de que tu vida financiera esté super bien, evita estar en deuda con otras entidades.
                  </p>
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