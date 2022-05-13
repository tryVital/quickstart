# TEST BACKEND IMPLEMENTATION
from http.client import HTTPException
from tracemalloc import start
from typing import Optional
from vital import Client
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

client = Client(api_key=os.getenv("VITAL_API_KEY", key), environment="sandbox")

app.add_middleware(  # type: ignore
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/token/{user_key}")
def get_token(user_key: str):
    return client.Link.create(user_key)


class CreateUserData(BaseModel):
    client_user_id: str


@app.post("/user/")
def create_user(data: CreateUserData):
    return client.User.create(data.client_user_id)


@app.get("/users/")
def get_users():
    return client.User.get_all()


@app.get("/summary/{data_type}/{user_id}")
def get_users(data_type: str, user_id: str, start_date: str, end_date: str):
    func_map = {
        "sleep": client.Sleep.get,
        "activity": client.Activity.get,
        "body": client.Body.get,
        "workouts": client.Workouts.get,
    }
    func = func_map.get(data_type)
    if not func:
        raise HTTPException(400, "Failed to find data type")
    data = func(user_id, start_date, end_date)
    return data


@app.get("/summary/{user_id}")
def get_users(user_id: str, start_date: str, end_date: str):
    sleep = client.Sleep.get(user_id, start_date, end_date)
    activity = client.Activity.get(user_id, start_date, end_date)
    body = client.Body.get(user_id, start_date, end_date)
    workouts = client.Workouts.get(user_id, start_date, end_date)
    return {"sleep": sleep, "activity": activity, "body": body, "workouts": workouts}
