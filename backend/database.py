from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_MAIN = os.getenv("COLLECTION_MAIN")
COLLECTION_FORTUNE = os.getenv("COLLECTION_FORTUNE")

# 🔥 SAFETY CHECK
missing = []
if not MONGO_URI: missing.append("MONGO_URI")
if not DB_NAME: missing.append("DB_NAME")
if not COLLECTION_MAIN: missing.append("COLLECTION_MAIN")
if not COLLECTION_FORTUNE: missing.append("COLLECTION_FORTUNE")

if missing:
    raise RuntimeError(f"❌ Missing environment variables: {', '.join(missing)}")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

company_collection = db[COLLECTION_MAIN]
company_collection_fortune = db[COLLECTION_FORTUNE]
