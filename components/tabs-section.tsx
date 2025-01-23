import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('tasa');

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`px-8 py-2 text-base font-medium ${
            activeTab === 'tasa'
              ? 'bg-pink-600 text-white'
              : 'bg-pink-300 text-white'
          }`}
          onClick={() => setActiveTab('tasa')}
        >
          Tasa
        </button>
        <button
          className={`px-8 py-2 text-base font-medium ${
            activeTab === 'seguro'
              ? 'bg-pink-600 text-white'
              : 'bg-pink-300 text-white'
          }`}
          onClick={() => setActiveTab('seguro')}
        >
          Seguro
        </button>
        <button
          className={`px-8 py-2 text-base font-medium ${
            activeTab === 'fianza'
              ? 'bg-pink-600 text-white'
              : 'bg-pink-300 text-white'
          }`}
          onClick={() => setActiveTab('fianza')}
        >
          Fianza o FGA
        </button>
      </div>

      {/* Content */}
      <div className="border border-gray-200 p-6 bg-white min-h-[280px] flex items-center justify-center">
        {activeTab === 'tasa' && (
          <div className="text-base">
            <h2 className="font-medium mb-4 text-lg">
              Tasa de interés corriente fija durante todo tu Crédito:
            </h2>
            <p className="mb-4">
              • Desde 1.49% E.M. (19.42% E.A.) hasta 1.85% E.M. (24.59% E.A.)
            </p>
            <h3 className="font-medium mb-2 text-lg">Tasa de mora:</h3>
            <p className="mb-4">• 1.86% E.M. (24.79% E.A.)</p>
            <div className="text-sm text-gray-600">
              <p>E.M: Efectiva Mensual</p>
              <p>E.A: Efectiva Anual</p>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              *Para este crédito, la tasa no superará nunca la tasa de usura de consumo.
            </p>
          </div>
        )}
        {activeTab === 'seguro' && (
          <div className="text-gray-500 text-lg">
            Contenido de Seguro
          </div>
        )}
        {activeTab === 'fianza' && (
          <div className="text-gray-500 text-lg">
            Contenido de Fianza o FGA
          </div>
        )}
      </div>
    </div>
  );
}

export default App;