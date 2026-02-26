from fastapi import FastAPI

#Initialize application
app = FastAPI(title="DSA Visualizer API")

#check everything is working
@app.get("/")
def read_root():
    return {"status": "Back-end is working!"}