from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.company import router as company_router

app = FastAPI(title="GCC Insight Explorer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company_router)

@app.get("/")
def health():
    return {"status": "Backend running successfully"}
