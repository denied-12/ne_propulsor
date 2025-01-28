import React from 'react';
import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="max-h-[755px] w-full bg-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">¿Tienes preguntas?</h1>
          <p className="text-gray-600">Resuélvelas en segundos y saca todo el provecho de tu Nequi</p>
        </div>

        {/* Questions Cards */}
        <div className="grid grid-cols-3 gap-4">
          <QuestionCard 
            text="Todo lo que debes saber del préstamo Propulsor"
          />
          <QuestionCard 
            text="¿Qué pasas si pagas antes tu Propulsor?"
          />
          <QuestionCard 
            text="¿Se puede pedir más de un préstamo Propulsor?"
          />
        </div>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex items-center gap-4">
            <div className="text-pink-500">
              <img src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/6526b19318bd134a66e77632_dudas.svg" 
              width={88} height={88} alt="dudas" />
            </div>
            <div>
              <p className="text-gray-700">¿Más dudas? ¡Resuélvelas todas en el Centro de Ayuda!</p>
              <button className="mt-2 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                Ir al Centro de ayuda
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-pink-500">
            <img src="https://cdn.prod.website-files.com/6317a229ebf7723658463b4b/6526bf7d8eadcfff9b32a678_15VISITA%20LA%20COMUNIDAD.svg" 
              width={88} height={88} alt="dudas" />
            </div>
            <div>
              <p className="text-gray-700">
                Si prefieres preguntar en el foro, {' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  visita la comunidad
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ text }: { text: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-800 flex-1">{text}</p>
        <ArrowRight className="text-pink-500 ml-4" />
      </div>
    </div>
  );
}

export default App;