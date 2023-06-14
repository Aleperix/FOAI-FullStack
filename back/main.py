from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from src.routes import user, gpt

app = FastAPI(
    title="FOAI API",
    description="An ChatGPT-3 text to speech project",
    version="0.1.0",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message": "This is an example route"}


app.include_router(user.route)
app.include_router(gpt.route)

if __name__=="__main__":
    uvicorn.run("main:app", port=8000, reload=True)