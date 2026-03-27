from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI(title="DSA Visualizer AI Tutor API")

# 1. Definimos la estructura de datos que esperamos recibir del Frontend (Next.js)
class CodeSubmission(BaseModel):
    problem_title: str
    problem_description: str
    user_code: str
    language: str

@app.post("/api/v1/tutor/hint")
def get_hint(submission: CodeSubmission):
   # 2. El "System Prompt": Reglas a prueba de modelos tercos
    system_prompt = """You are a strict Socratic tutor for Data Structures and Algorithms.
    A student will show you their code. 
    YOUR ONLY TASK is to provide ONE short conceptual hint to improve time complexity.
    
    CRITICAL RESTRICTIONS:
    - YOU MUST NOT write ANY code snippets. Zero code.
    - YOU MUST NOT mention specific variable names for the solution.
    - KEEP IT UNDER 3 SENTENCES.
    
    Example response: "Your current nested loop gives an O(N^2) time complexity. Is there a way we can store the numbers we've already seen to look them up instantly in O(1) time?"
    """
    # 3. El "User Prompt": Juntamos el problema con el código del usuario
    user_prompt = f"""
    Problem: {submission.problem_title}
    Description: {submission.problem_description}
    Language: {submission.language}
    User's Code:
    {submission.user_code}
    """

    # 4. Hacemos la petición HTTP a la API local de Ollama (puerto 11434 por defecto)
    ollama_url = "http://localhost:11434/api/generate"
    payload = {
        "model": "qwen2.5-coder:1.5b",  # Asegúrate de que este sea el modelo que descargaste
        "system": system_prompt,
        "prompt": user_prompt,
        "stream": False
    }

    try:
        response = requests.post(ollama_url, json=payload)
        response.raise_for_status()
        ai_data = response.json()

        return {
            "status": "success",
            "hint": ai_data.get("response", ""),
            "model_used": ai_data.get("model", "")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error conectando con la IA local: {str(e)}")