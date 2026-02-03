from fastapi import APIRouter, HTTPException
from database import (
    company_collection,
    company_collection_fortune
)
from models.company import Company
from bson import ObjectId

router = APIRouter(prefix="/companies", tags=["Companies"])


# -------------------------
# Utils
# -------------------------
def serialize_company(company):
    company["_id"] = str(company["_id"])
    return company


# -------------------------
# 🔹 FILTER METADATA (MAIN COLLECTION ONLY)
# -------------------------
@router.get("/filters")
def get_company_filters():
    companies = list(company_collection.find({}))

    countries = sorted({
        c.get("Country")
        for c in companies
        if isinstance(c.get("Country"), str)
    })

    areas = sorted({
        c.get("Primary Area")
        for c in companies
        if isinstance(c.get("Primary Area"), str)
    })

    gcc_cities = sorted({
        city.strip()
        for c in companies
        for city in (c.get("GCC Cities") or "").split(",")
        if city.strip() and city.strip() != "-"
    })

    # 🔥 Exclude Pharma for "Others" dropdown
    categories = sorted({
        c.get("Category")
        for c in companies
        if isinstance(c.get("Category"), str)
        and c.get("Category") != "Pharma"
    })

    return {
        "countries": countries,
        "areas": areas,
        "gccCities": gcc_cities,
        "categories": categories,
    }


# -------------------------
# 🔹 MAIN COMPANIES
# -------------------------
@router.get("/")
def get_companies():
    companies = company_collection.find()
    return [serialize_company(c) for c in companies]


# -------------------------
# 🔹 FORTUNE LIST (NEW)
# -------------------------
@router.get("/fortune")
def get_fortune_companies():
    companies = company_collection_fortune.find()
    return [
        {**c, "_id": str(c["_id"])}
        for c in companies
    ]


# -------------------------
# 🔹 CREATE COMPANY (MAIN)
# -------------------------
@router.post("/")
def create_company(company: Company):
    result = company_collection.insert_one(company.dict())
    return {"id": str(result.inserted_id)}


# -------------------------
# 🔹 GET COMPANY BY ID
# ⚠️ MUST STAY AT BOTTOM
# -------------------------
@router.get("/{company_id}")
def get_company(company_id: str):
    try:
        company = company_collection.find_one({"_id": ObjectId(company_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid company ID")

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return serialize_company(company)


# -------------------------
# 🔹 DELETE COMPANY
# -------------------------
@router.delete("/{company_id}")
def delete_company(company_id: str):
    try:
        company_collection.delete_one({"_id": ObjectId(company_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid company ID")

    return {"status": "deleted"}
