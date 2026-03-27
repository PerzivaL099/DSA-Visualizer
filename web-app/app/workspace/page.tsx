"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function WorkspacePage() {
  // Estados para las Pestañas (Tabs)
  const [activeTab, setActiveTab] = useState('code'); // 'edge', 'pseudo', 'code', 'complexity'
  
  // Estados para el contenido de cada paso
  const [edgeCases, setEdgeCases] = useState("");
  const [pseudocode, setPseudocode] = useState("");
  const [code, setCode] = useState("def twoSum(nums, target):\n    # Escribe tu código aquí\n    pass");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");

  // Estados para la IA
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    setIsLoading(true);
    setHint(""); 
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/tutor/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem_title: "Two Sum",
          problem_description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          user_code: code,
          language: "python"
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      
      const data = await response.json();
      setHint(data.hint);
      
    } catch (error) {
      console.error(error);
      setHint("⚠️ Error de conexión. Verifica que tu servidor de FastAPI esté corriendo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      
      {/* PANEL IZQUIERDO: Descripción del Problema */}
      <div className="w-1/3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-slate-800">1. Two Sum</h1>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">Easy</span>
        </div>
        
        <div className="prose prose-slate text-sm">
          <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
          <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
          <p>You can return the answer in any order.</p>
          
          <h3 className="text-lg font-bold mt-6 mb-2">Example 1:</h3>
          <div className="bg-slate-100 p-3 rounded-md font-mono text-xs">
            <strong>Input:</strong> nums = [2,7,11,15], target = 9<br/>
            <strong>Output:</strong> [0,1]<br/>
            <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: Metodología y Tutor IA */}
      <div className="w-2/3 flex flex-col gap-4">
        
        {/* CONTENEDOR PRINCIPAL DE TRABAJO */}
        <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
          
          {/* Navegación de Pestañas (Tabs) */}
          <div className="flex bg-[#2d2d2d] border-b border-slate-700 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('edge')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'edge' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-blue-500' : 'text-slate-400 hover:text-slate-200 hover:bg-[#363636]'}`}
            >
              1. Edge Cases
            </button>
            <button 
              onClick={() => setActiveTab('pseudo')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'pseudo' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-blue-500' : 'text-slate-400 hover:text-slate-200 hover:bg-[#363636]'}`}
            >
              2. Pseudocode
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'code' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-blue-500' : 'text-slate-400 hover:text-slate-200 hover:bg-[#363636]'}`}
            >
              3. Code
            </button>
            <button 
              onClick={() => setActiveTab('complexity')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'complexity' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-blue-500' : 'text-slate-400 hover:text-slate-200 hover:bg-[#363636]'}`}
            >
              4. Complexity
            </button>

            <div className="ml-auto flex items-center pr-4">
               <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
                Submit ▶
              </button>
            </div>
          </div>
          
          {/* ÁREA DE CONTENIDO DINÁMICO (Depende de activeTab) */}
          <div className="flex-1 overflow-hidden relative">
            
            {/* Contenido 1: Edge Cases */}
            {activeTab === 'edge' && (
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-slate-200 text-lg mb-2">Preguntas Aclaratorias & Casos Extremos</h3>
                <p className="text-slate-400 text-sm mb-4">¿Qué pasa si el arreglo está vacío? ¿Hay números negativos? Anota aquí tus observaciones antes de programar.</p>
                <textarea 
                  value={edgeCases}
                  onChange={(e) => setEdgeCases(e.target.value)}
                  placeholder="- ¿Pueden repetirse los números?&#10;- ¿El array siempre tendrá una solución válida?"
                  className="flex-1 w-full bg-[#252526] text-slate-300 p-4 rounded-lg focus:outline-none border border-slate-700 focus:border-blue-500 resize-none"
                />
              </div>
            )}

            {/* Contenido 2: Pseudocode */}
            {activeTab === 'pseudo' && (
              <div className="p-6 h-full flex flex-col">
                 <h3 className="text-slate-200 text-lg mb-2">Pseudocódigo Lógico</h3>
                 <p className="text-slate-400 text-sm mb-4">Escribe la lógica paso a paso sin preocuparte por la sintaxis de Python.</p>
                 <textarea 
                  value={pseudocode}
                  onChange={(e) => setPseudocode(e.target.value)}
                  placeholder="1. Crear un diccionario vacío&#10;2. Iterar sobre el array&#10;3. Calcular el complemento..."
                  className="flex-1 w-full bg-[#252526] text-slate-300 p-4 rounded-lg focus:outline-none border border-slate-700 focus:border-blue-500 resize-none font-mono text-sm"
                />
              </div>
            )}

            {/* Contenido 3: Code (Monaco Editor) */}
            {activeTab === 'code' && (
              <div className="h-full pt-4">
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
                />
              </div>
            )}

            {/* Contenido 4: Complexity */}
            {activeTab === 'complexity' && (
              <div className="p-6 h-full flex flex-col justify-center max-w-md mx-auto">
                 <h3 className="text-slate-200 text-xl text-center mb-6">Análisis Big O</h3>
                 
                 <label className="text-slate-400 text-sm mb-2">Complejidad de Tiempo (Time Complexity)</label>
                 <input 
                  type="text" 
                  value={timeComplexity}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                  placeholder="Ej: O(N), O(N^2)" 
                  className="w-full bg-[#252526] text-slate-300 p-3 rounded-lg mb-6 focus:outline-none border border-slate-700 focus:border-blue-500 font-mono text-center text-lg"
                 />

                 <label className="text-slate-400 text-sm mb-2">Complejidad de Espacio (Space Complexity)</label>
                 <input 
                  type="text" 
                  value={spaceComplexity}
                  onChange={(e) => setSpaceComplexity(e.target.value)}
                  placeholder="Ej: O(1), O(N)" 
                  className="w-full bg-[#252526] text-slate-300 p-3 rounded-lg focus:outline-none border border-slate-700 focus:border-blue-500 font-mono text-center text-lg"
                 />
              </div>
            )}

          </div>
        </div>

        {/* Consola de Tutor IA */}
        <div className="h-1/3 bg-white rounded-xl border border-blue-200 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-800 flex items-center gap-2">
              🧠 AI Tutor Socrático
            </h3>
            <button 
              onClick={handleAskAI}
              disabled={isLoading}
              className={`px-4 py-1.5 rounded text-sm font-bold transition-colors ${isLoading ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
            >
              {isLoading ? 'Analizando...' : 'Ask AI Tutor'}
            </button>
          </div>
          
          <div className="flex-1 bg-blue-50/50 rounded-lg p-4 overflow-y-auto border border-blue-100">
            {isLoading ? (
              <div className="flex items-center gap-2 text-blue-500 animate-pulse">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animation-delay-200"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animation-delay-400"></div>
                <span className="ml-2 text-sm font-medium">El tutor está evaluando...</span>
              </div>
            ) : hint ? (
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {hint}
              </p>
            ) : (
              <p className="text-sm text-slate-500 italic">
                Presiona "Ask AI Tutor" para recibir una pista socrática. Recuerda: ¡Primero define tus casos extremos y tu pseudocódigo!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}