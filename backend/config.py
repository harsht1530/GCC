import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_MAIN = os.getenv("COLLECTION_MAIN")
COLLECTION_FORTUNE = os.getenv("COLLECTION_FORTUNE")