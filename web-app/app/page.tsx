"use client"; // Necesario porque React Flow es interactivo y corre del lado del cliente

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // Importamos los estilos base

// 1. Definimos los "Nodos" (Los temas de DSA)
// Le damos estilos diferentes dependiendo de si están completados, en progreso o bloqueados.
const initialNodes = [
  { 
    id: '1', 
    position: { x: 350, y: 50 }, 
    data: { label: 'Arrays & Hashing ✅' }, 
    style: { background: '#22c55e', color: 'white', border: 'none', fontWeight: 'bold', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '2', 
    position: { x: 200, y: 150 }, 
    data: { label: 'Two Pointers 🔄' }, 
    style: { background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '3', 
    position: { x: 500, y: 150 }, 
    data: { label: 'Stack 🔄' }, 
    style: { background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '4', 
    position: { x: 350, y: 250 }, 
    data: { label: 'Linked List 🔒' }, 
    style: { background: '#f1f5f9', color: '#94a3b8', border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '5', 
    position: { x: 350, y: 350 }, 
    data: { label: 'Trees 🔒' }, 
    style: { background: '#f1f5f9', color: '#94a3b8', border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '10px' } 
  },
];

// 2. Definimos los "Edges" (Las flechas que conectan los temas)
// Las flechas hacia temas desbloqueados están animadas para llamar la atención.
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#cbd5e1', strokeWidth: 2 } },
];

export default function RoadmapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Tu Roadmap de Algoritmos</h1>
        <p className="text-slate-500 mt-2">
          Domina los conceptos básicos para desbloquear temas avanzados. Haz scroll o arrastra el mapa para explorar.
        </p>
      </div>

      {/* Contenedor del Mapa - Debe tener un height definido para que React Flow funcione */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" style={{ minHeight: '65vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView // Centra el mapa automáticamente al cargar
          attributionPosition="bottom-right"
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#cbd5e1" />
          <Controls /> {/* Botones de zoom */}
          <MiniMap nodeStrokeWidth={3} zoomable pannable /> {/* Minimapa en la esquina */}
        </ReactFlow>
      </div>
    </div>
  );
}