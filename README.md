#  DSA Visualizer & Intelligent Learning Platform

Una plataforma EdTech moderna diseñada para ayudar a estudiantes de Ciencias de la Computación y desarrolladores a dominar Estructuras de Datos y Algoritmos (DSA) para entrevistas técnicas de alto nivel. 

A diferencia de las plataformas tradicionales de LeetCode/Hackerrank, este proyecto integra un **Nodo de Inferencia de Inteligencia Artificial Alojado Localmente**, el cual actúa como un tutor socrático que guía al usuario mediante pistas en lugar de darle la respuesta directa.

## 🏗 Arquitectura del Proyecto (Monorepo)

Este proyecto está dividido en dos sistemas principales que se comunican mediante una API RESTful:

*  **`ai-microservice/`**: Un microservicio backend en Python (FastAPI) que maneja la inferencia de Modelos de Lenguaje Grande (LLMs) usando **Ollama**. Este servicio está diseñado para correr localmente de forma privada, garantizando cero costos de tokens y máxima privacidad de datos.
*  **`web-app/`** *(En desarrollo)*: El frontend interactivo y backend lógico construido con **Next.js (App Router)**. Maneja la interfaz de usuario, la autenticación, el progreso del roadmap y la ejecución de código en el navegador.

##  Características Principales

*  **Roadmap Visual Estructurado:** Un árbol de aprendizaje basado en pre-requisitos para dominar DSA paso a paso.
*  **Espacio de Trabajo de Entrevista:** Un entorno que obliga a seguir las mejores prácticas: *Preguntas Aclaratorias → Casos Extremos → Pseudocódigo → Código Real → Análisis Big-O*.
*  **Tutor IA Socrático ("Ask AI"):** Un asistente basado en IA (ej. `qwen2.5-coder` / `llama3`) que analiza el código en tiempo real y ofrece sugerencias estructuradas sin revelar la solución.
*  **Analizador de Complejidad Automatizado:** Evaluación del código enviado para calcular y explicar su complejidad de Tiempo ($O(N)$) y Espacio.
*  **Dashboard de Análisis:** Seguimiento de actividad estilo GitHub, retención de temas y métricas de rendimiento.

## 🛠 Tech Stack

**Frontend & Logic (Web App)**
* Framework: Next.js (React) con TypeScript
* Estilos: Tailwind CSS & shadcn/ui
* Base de Datos & Auth: Supabase (PostgreSQL)

**AI Core (Microservicio)**
* API Framework: FastAPI (Python) & Uvicorn
* Motor LLM: Ollama
* Modelos: `qwen2.5-coder:1.5b` (Desarrollo V1) / `deepseek-coder:6.7b` (Producción V2)

##  Cómo Empezar (Desarrollo Local)

### 1. Requisitos Previos
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 18+](https://nodejs.org/)
* [Ollama](https://ollama.com/) instalado y corriendo en tu máquina.

### 2. Iniciar el Microservicio de IA
Abre una terminal y descarga el modelo de IA base:
```bash
ollama run qwen2.5-coder:1.5b
    