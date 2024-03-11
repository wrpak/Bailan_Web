from typing import List
from pydantic import BaseModel

class User(BaseModel):
    account_name: str
    password: str

class coinInput(BaseModel):
    coin: int
    
class BookIdList(BaseModel):
    book_id: List[int]
    
class Uploadbook(BaseModel):
    name: str
    # writer: str 
    book_type: str
    price_coin: int
    intro: str
    content: str