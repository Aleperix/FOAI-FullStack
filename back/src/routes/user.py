from fastapi import APIRouter, Response, status
from ..models.user import User
from ..config.db import conn
from ..schemas.user import userEntity, usersEntity
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
from passlib.hash import pbkdf2_sha256

route = APIRouter()

#Create one user
@route.post("/users", tags=["users"], response_model=User)
def create_one_user(user: User):
    new_user = dict(user)
    new_user["password"] = pbkdf2_sha256.hash(user.password) #Transcribe plain_text password to a hashed password
    del new_user["id"]
    id = conn["users"].insert_one(new_user).inserted_id
    user = conn["users"].find_one({"_id": id})
    return userEntity(user)

#Get one user by ID
@route.get("/users/{id}", tags=["users"], response_model=User)
def read_one_user(id: str):
    return userEntity(conn["users"].find_one({"_id": ObjectId(id)}))

#Get all users
@route.get("/users", tags=["users"], response_model=list[User])
def read_all_users():
    return usersEntity(conn["users"].find())

#Update one user by ID
@route.put("/users/{id}", tags=["users"], response_model=User)
def update_one_user(id: str, user: User):
    return userEntity(conn["users"].find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)}))

#Delete one user by ID
@route.delete("/users/{id}", tags=["users"], status_code=status.HTTP_204_NO_CONTENT)
def delete_one_user(id: str):
    userEntity(conn["users"].find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)
