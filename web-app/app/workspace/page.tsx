"use client";

import React, { useState } from 'react';

export default function WorkspacePage() {
  // Estados para manejar el código, el estado de carga y la respuesta de la IA
  const [code, setCode] = useState("def twoSum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]");
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función que se comunica con tu microservicio de Python
  const handleAskAI = async () => {
    setIsLoading(true);
    setHint(""); // Limpiamos la pista anterior
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/tutor/hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_title: "Two Sum",
          problem_description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          user_code: code,
          language: "python"
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      
      const data = await response.json();
      setHint(data.hint); // Guardamos la pista que nos dio Ollama
      
    } catch (error) {
      console.error(error);
      setHint("⚠️ Error de conexión. Verifica que tu servidor de FastAPI (Python) esté corriendo en el puerto 8000.");
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

      {/* PANEL DERECHO: Editor de Código y Tutor IA */}
      <div className="w-2/3 flex flex-col gap-4">
        
        {/* Editor de Código Falso (Textarea) */}
        <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-slate-700">
            <span className="text-slate-300 text-sm font-mono">solution.py</span>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm transition-colors">
              Run Code ▶
            </button>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-transparent text-slate-300 font-mono text-sm p-4 focus:outline-none resize-none"
            spellCheck="false"
          />
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
                <span className="ml-2 text-sm">El tutor está leyendo tu código...</span>
              </div>
            ) : hint ? (
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {hint}
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Presiona "Ask AI Tutor" para recibir una pista conceptual basada en tu código actual. No te daremos la respuesta directa.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}