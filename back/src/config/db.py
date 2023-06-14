import os
from pymongo import MongoClient

conn = MongoClient(os.environ["MONGO_DB_URL"])[os.environ["MONGO_DB_NAME"]]