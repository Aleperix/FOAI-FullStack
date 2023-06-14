import os, openai, pyttsx3, random
from fastapi import APIRouter, Response, status
from ..models.gpt import Gpt
from ..config.db import conn
from ..schemas.gpt import gptEntity, gptsEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
import base64

route = APIRouter()

#Create one gpt
@route.post("/gpt", tags=["gpt"], response_model=Gpt)
def create_one_gpt(gpt: Gpt):
    new_gpt = dict(gpt)
    new_gpt["response"] = get_gpt_response(new_gpt["prompt"], new_gpt["language"])
    del new_gpt["id"], new_gpt["src"]
    id = conn["gpt"].insert_one(new_gpt).inserted_id
    gpt = conn["gpt"].find_one({"_id": id})
    file_name = "./speech"+str(random.randint(1,999999))+".mp3"
    gpt["src"] = generate_audio(new_gpt["response"], file_name, new_gpt["language"])
    os.remove(file_name)
    return gptEntity(gpt)
    

#Get one gpt by ID
@route.get("/gpt/{id}", tags=["gpt"], response_model=Gpt)
def read_one_gpt(id: str):
    result = dict(conn["gpt"].find_one({"_id": ObjectId(id)}))
    file_name = "./speech"+str(random.randint(1,999999))+".mp3"
    result["src"] = generate_audio(result["response"], file_name)
    os.remove(file_name)
    return gptEntity(result)

#Get all gpts
@route.get("/gpt", tags=["gpt"], response_model=list[Gpt])
def read_all_gpt():
    results = list(conn["gpt"].find())
    for i in range(len(results)):
        file_name = "./speech"+str(random.randint(1,999999))+".mp3"
        results[i]["src"] = generate_audio(results[i]["response"], file_name)
        os.remove(file_name)
        
    return gptsEntity(results)

#Update one gpt by ID
@route.put("/gpt/{id}", tags=["gpt"], response_model=Gpt)
def update_one_gpt(id: str, gpt: Gpt):
    return gptEntity(conn["gpt"].find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(gpt)}))

#Delete one gpt by ID
@route.delete("/gpt/{id}", tags=["gpt"], status_code=status.HTTP_204_NO_CONTENT)
def delete_one_gpt(id: str):
    gptEntity(conn["gpt"].find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)


##Methods
def get_gpt_response(prompt, lang):
    print(prompt, lang)
    if lang == "en_US":
        prompt = "Generate an answer(only text without format) in english to the following question: "+prompt+"{}"
    elif lang == "es_ES":
        prompt = "Genera una respuesta(solo texto sin formato) en español para la siguiente consulta: "+prompt+"{}"
    openai.api_key = os.environ["GPT_KEY"]

    completion = openai.Completion.create(engine="text-davinci-003",
                                            prompt=prompt,
                                            n=1,
                                            max_tokens=128)
    return completion.choices[0].text

def generate_audio(response, file_name, lang):
    voice = pyttsx3.init()
    voices = voice.getProperty('voices')
    if lang == "en_US":
        voice.setProperty('voice', voices[1].id) #Set English speech
    elif lang == "es_ES":
        voice.setProperty('voice', voices[0].id) #Set Spanish speech
    voice.save_to_file(response, file_name)
    voice.runAndWait()
    with open(file_name, "rb") as f:
        data = f.read()
        b64 = base64.b64encode(data).decode() #Convert the file to a base64 string
        return b64
    