import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from ai_model.model import run_model

client = MongoClient("mongodb://localhost:27017/")
db = client["energy_db"]
collection = db["meter_data"]

app = FastAPI()   # ✅ FIRST create app

app.add_middleware(   # ✅ THEN add CORS
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

@app.post("/add-data")
def add_data(data: dict):
    result = collection.insert_one(data)

    return {
        "message": "Data stored in DB",
        "id": str(result.inserted_id)   # ✅ convert ObjectId to string
    }

@app.get("/test")
def test_api():
    return {"message": "Test API working"}

@app.get("/get-data")
def get_data():
    data = list(collection.find({}, {"_id": 0}))  # hide _id

    return data
@app.post("/detect")
def detect(data: dict):
    input_energy = data.get("input_energy")
    billed_energy = data.get("billed_energy")

    loss = input_energy - billed_energy

    if loss > 200:
        status = "Theft Detected"
        risk = "High"
    else:
        status = "Normal"
        risk = "Low"

    result_data = {
        "input_energy": input_energy,
        "billed_energy": billed_energy,
        "loss": loss,
        "status": status,
        "risk_level": risk
    }

    result = collection.insert_one(result_data)  # insert in DB

    return {
        "message": "Detection complete",
        "id": str(result.inserted_id),   # ✅ fix here
        "status": status,
        "loss": loss,
        "risk_level": risk
    }

    collection.insert_one(result_data)   # ✅ store result

    return result_data

@app.get("/ml-detect")
def ml_detect():
    data = run_model("ai_model/Real_data.xlsx")
    return {"result": data}
