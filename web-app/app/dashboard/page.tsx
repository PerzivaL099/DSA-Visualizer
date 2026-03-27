import React from 'react';

export default function DashboardPage() {
  // Generamos 84 días (12 semanas) de datos falsos para el calendario de actividad
  // Los números van del 0 al 3 (0 = sin actividad, 3 = mucha actividad)
  const activityData = Array.from({ length: 84 }, () => Math.floor(Math.random() * 4));

  // Función para asignar el color verde estilo GitHub dependiendo de la actividad
  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-100'; // Vacío
      case 1: return 'bg-green-200'; // Poco
      case 2: return 'bg-green-400'; // Medio
      case 3: return 'bg-green-600'; // Mucho
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* 1. Encabezado y Resumen Rápido */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Mi Perfil</h1>
        <p className="text-slate-500 mt-1">Sigue tu progreso y mantén tu racha de estudio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Problemas Resueltos</h3>
          <p className="text-4xl font-bold text-slate-800 mt-2">124</p>
          <div className="flex gap-2 mt-4 text-sm">
            <span className="text-green-600 font-medium">45 Easy</span>
            <span className="text-yellow-600 font-medium">60 Medium</span>
            <span className="text-red-600 font-medium">19 Hard</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Racha Actual</h3>
          <p className="text-4xl font-bold text-orange-500 mt-2">12 🔥</p>
          <p className="text-slate-400 text-sm mt-4">Días consecutivos resolviendo problemas</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Ranking Global</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">Top 5%</p>
          <p className="text-slate-400 text-sm mt-4">Basado en complejidad de tiempo optimizada</p>
        </div>
      </div>

      {/* 2. Calendario de Actividad (Estilo GitHub) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Actividad Reciente</h3>
        <div className="overflow-x-auto pb-2">
          {/* Usamos CSS Grid con 12 columnas (semanas) y 7 filas (días) usando flex column wrapper */}
          <div className="flex gap-1" style={{ width: 'fit-content' }}>
            {Array.from({ length: 12 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {activityData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((level, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className={`w-4 h-4 rounded-sm ${getActivityColor(level)}`}
                    title={`Nivel de actividad: ${level}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500">
          <span>Menos</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
          <div className="w-3 h-3 rounded-sm bg-green-200"></div>
          <div className="w-3 h-3 rounded-sm bg-green-400"></div>
          <div className="w-3 h-3 rounded-sm bg-green-600"></div>
          <span>Más</span>
        </div>
      </div>

      {/* 3. Tópicos Dominados (Barras de progreso) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Tópicos Dominados</h3>
        <div className="space-y-4">
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">Arrays & Hashing</span>
              <span className="text-slate-500">100%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">Two Pointers</span>
              <span className="text-slate-500">80%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">Trees & Graphs</span>
              <span className="text-slate-500">35%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}