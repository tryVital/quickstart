# TEST BACKEND IMPLEMENTATION
from http.client import HTTPException
from tracemalloc import start
from typing import Optional
from vital.client import Vital
from vital.environment import VitalEnvironment
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
VITAL_API_KEY = os.getenv("VITAL_API_KEY")
VITAL_ENVIRONMENT = os.getenv("VITAL_ENV")

if VITAL_ENVIRONMENT == "sandbox":
    vital_env = VitalEnvironment.SANDBOX
elif VITAL_ENVIRONMENT == "production":
    vital_env = VitalEnvironment.PRODUCTION

client = Vital(api_key=VITAL_API_KEY, environment=vital_env)

app.add_middleware(  # type: ignore
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/token/{user_id}")
def get_token(user_id: str):
    return client.link.token(user_id=user_id)


class CreateUserData(BaseModel):
    client_user_id: str


@app.post("/user/")
def create_user(data: CreateUserData):
    return client.user.create(client_user_id=data.client_user_id)


@app.get("/users/")
def get_users():
    return client.user.get_all()


@app.get("/summary/{data_type}/{user_id}")
def get_users(data_type: str, user_id: str, start_date: str, end_date: str):
    func_map = {
        "sleep": client.sleep.get,
        "activity": client.activity.get,
        "body": client.body.get,
        "workouts": client.workouts.get,
    }
    func = func_map.get(data_type)
    if not func:
        raise HTTPException(400, "Failed to find data type")
    data = func(user_id=user_id, start_date=start_date, end_date=end_date)
    return data


@app.get("/summary/{user_id}")
def get_users(user_id: str, start_date: str, end_date: str):
    sleep = client.sleep.get(user_id=user_id, start_date=start_date, end_date=end_date)
    activity = client.activity.get(user_id=user_id, start_date=start_date, end_date=end_date)
    body = client.body.get(user_id=user_id, start_date=start_date, end_date=end_date)
    workouts = client.workouts.get(user_id=user_id, start_date=start_date, end_date=end_date)
    return {"sleep": sleep, "activity": activity, "body": body, "workouts": workouts}
