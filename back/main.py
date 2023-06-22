from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from src.routes import user, gpt

app = FastAPI(
    title="FOAI API", #Docs page project title
    description="A ChatGPT-3 text to speech project", #Docs page project description
    version="0.1.0", #Docs page project version
    swagger_ui_parameters={"defaultModelsExpandDepth": -1} #Remove schemas from docs page
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)