from typing import Optional
from typing import Union
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# routers class
from routers.Controller_class import Controller
from routers.Account_class import Reader, Writer
from routers.Book_class import Book
from routers.Review_class import Review
from routers.Promotion_class import Promotion
from routers.Complain_class import Complain
from routers.PaymentMethod_class import PaymentMethod

# models
from models.BaseModel_class import User, coinInput, BookIdList, Uploadbook

app = FastAPI()

origins = [
    "http://localhost:5500",
    "localhost:5500",
    "http://127.0.0.1:5500",
    "127.0.0.1:5500/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")

controller = Controller()

reader1 = Reader("Min", "Do")
reader2 = Reader("May", "Da")
reader3 = Reader("Moo", "Di")
reader4 = Reader("Mer", "De")
reader5 = Reader("Muc", "Du")
reader6 = Reader('get','1234')

writer1 = Writer("Wrpak", "it")
writer2 = Writer("Warinww", 'me')
writer3 = Writer("Varinlu", "you")
writer4 = Writer("Monsac", "my")

book1 = Book("Great Book", "Fiction", 100, "intro", "Content")
book2 = Book("Thai Book", "Non-fiction", 200, "intro", "Content")
book3 = Book("Japan Book", "Non-fiction", 300, "intro", "Content")
book4 = Book("Code Book", "Non-fiction", 400, "intro", "Content")
book5 = Book("Food Book", "Non-fiction", 500, "intro", "Content")
book6 = Book("Animal Book", "Non-fiction", 600, "intro", "Content")

promotion1 = Promotion("Valentine", 10, 7)
# promotion2 = Promotion("new year", 15, 7)

chanels = [
    PaymentMethod("bank",1),
    PaymentMethod("credit card",2)
    ]

for c in chanels:
    controller.add_payment_method(c)

controller.top_up(7,500,1)

book1.review.add_comment(reader1, "I really enjoyed this book!")
book1.review.add_comment(reader2, "Highly recommend it.")
book2.review.add_comment(reader1, "A must-read for everyone!")

# promotion2.add_book_list(book1)
promotion1.add_book_list(book2)
promotion1.add_book_list(book3)
# promotion2.add_book_list(book4)
# promotion2.add_book_list(book5)
promotion1.add_book_list(book6)

controller.upload_book(book1, writer1)
controller.upload_book(book2, writer2)
controller.upload_book(book3, writer3)
controller.upload_book(book4, writer4)
controller.upload_book(book5, writer1)
controller.upload_book(book6, writer2)

controller.add_reader(reader1)
controller.add_reader(reader2)
controller.add_reader(reader3)
controller.add_reader(reader4)
controller.add_reader(reader5)
controller.add_reader(reader6)

controller.add_writer(writer1)
controller.add_writer(writer2)
controller.add_writer(writer3)
controller.add_writer(writer4)

controller.add_rating(1, 4)
controller.add_rating(1, 5)
controller.add_rating(2, 5)
controller.add_rating(2, 3)
controller.add_rating(3, 2)
controller.add_rating(3, 4)
controller.add_rating(4, 5)
controller.add_rating(4, 3)
controller.add_rating(5, 2)
controller.add_rating(5, 4)
controller.add_rating(6, 5)
controller.add_rating(6, 3)

controller.add_promotion_list(promotion1)
# controller.add_promotion_list(promotion2)

# ------------------------------------------
reader1.update_book_collection_list(book1)

controller.top_up(1, 500, 1)

writer1.adding_coin = 10
reader1.adding_coin = 2000  
# ------------------------------------------


#  Book
@app.get("/get_all_book", tags=['Book'])
async def get_all_book():
    return {"book_list": controller.get_all_book()}

@app.get("/book_info", tags=['Book'])
async def get_book_info(id:int) -> dict:
    return {"Book's info": controller.show_book_info(id)}

@app.post("/upload_book",tags = ["Book"]) #Error
async def upload_book(writer_id : int , book_detail : Uploadbook) -> dict:
    writer = controller.search_writer_by_id(writer_id)
    if writer is not None:
        book = Book(book_detail.name,book_detail.book_type,book_detail.price_coin,book_detail.intro,book_detail.content)
        controller.upload_book(book,writer)
        return {"Book's List" : controller.book_of_writer(writer)}
    
@app.get("/show_book_collection_of_reader", tags=["Book"])
async def Show_Book_Collection_of_Reader(Reader_id:int) -> dict:
    return {"Book's list" : controller.show_book_collection_of_reader(Reader_id)}

@app.get("/show_book_collection_of_writer", tags=["Book"])
async def show_book_when_upload_book(writer_name: str) -> dict:
    return {"Book's list" : controller.show_book_collection_of_writer(writer_name)}

# Search
@app.get("/search_book_by_name", tags = ["Search"])
async def search_book_by_bookname(name:str) -> dict:
    return {"book_list" : controller.search_book_by_bookname(name)}

@app.get("/search_book", tags = ["Search"])
async def search_book(book_name:str = None, writer_name:str = None , type:str = None) -> dict:
    return {"Book's List" : controller.search_book(book_name,writer_name,type)}

@app.get("/book_from_promotion", tags=['Search'])
async def get_book_by_promotion(promotion:str) -> dict:
    return {"Book in this promotion": controller.search_book_by_promotion(promotion)}


#Cart
@app.get("/add_cart", tags=['Cart'])
async def add_book_to_card(reader_id: int, book_id: int) -> dict:
    return {"Book's in card": controller.add_book_to_cart(book_id, reader_id)}

@app.delete("/remove_book", tags = ["Cart"])
async def remove_book_from_cart(reader_id :int, book_id :int) -> dict:
    return {"Message" : controller.remove_book_from_cart(reader_id, book_id)}

@app.get("/show_cart", tags=["Cart"])
async def show_cart(reader_id: int) -> dict:
    return {"Reader's Cart": controller.show_reader_cart(reader_id)}  

@app.post("/select_book_checkout", tags=['Cart'])
async def select_book_checkout(reader_id: int, book_ids: List[int]):
    return controller.select_book_checkout(reader_id, book_ids)


# But / Rent
@app.post("/buy_book", tags=["Buy"])
async def buy_book(account_id: int, list_book : BookIdList):
    return {
        "Buy" : controller.buy_book(account_id,list_book.book_id)
    }

@app.post("/rent", tags=['Rent'])
async def rent(reader_id: int, data: BookIdList):
    return {"rent": controller.rent(reader_id, data.book_id)}


# Coin Transaction History
@app.get("/show_coin_transaction",tags=["Coin Transaction"])
async def show_coin_transaction(ID:int) -> dict:
    return{"Coin Transaction's List" : controller.cointrasaction_history(ID)}

# Payment History
@app.get("/show_payment_history", tags=["History"])
async def show_payment_history(ID : int) -> dict:
    return{"Payment History's List" : controller.payment_history(ID)}

# Money
@app.get("/chanels",tags=["Money"])
async def show_payment_method()->dict:
    return {"chanels":controller.show_payment_method()}

@app.post("/top_up", tags=['Money'])
async def top_up(account_id : int, money : coinInput, chanel_id:int):
    return {controller.top_up(account_id, money.coin,chanel_id)}

@app.post("/transfer", tags=['Money'])
async def transfer_coin_to_money(writer_id:int, data: coinInput):
    return {controller.transfer(writer_id, data.coin)}


# Review
@app.post("/rating", tags=['Review'])
async def add_rating(book_id: int, rating: int):
    return {"rating": controller.add_rating(book_id, rating)}

@app.post("/comment",tags = ["Review"])
async def submit_comment(Reader_id : int , Book_id : int, comment : str) -> dict:
    return{"result" : controller.submit_comment(Reader_id,Book_id,comment)}

@app.get("/view_comment_of_book", tags=["Review"])
async def view_comment(Book_id : int) -> dict:
    return{"Comment's list" : controller.view_comment(Book_id)}


# Promotion
@app.get("/show_promotion", tags=['Promotion'])
async def show_promotion() -> dict:
    return {"Promotion": controller.show_promotion()}

#Complain
@app.post("/submit_complaint", tags = ["Complain"])
async def submit_complaint(user_id: int, message: str):
    return {"result": controller.submit_complaint(user_id, message)}

@app.get("/view_complaints", tags = [ "Complain"])
async def view_complaints():
    return {"Complain": controller.view_complaints()}

from fastapi import HTTPException

# Register/Login
@app.post("/register", tags = [ "Register/Login"])
async def register(user: User):
    message = controller.register_reader(user.account_name, user.password)
    if "successfully" in message:
        return {"message": message}
    else:
        raise HTTPException(status_code=400, detail=message)

@app.post("/login", tags = [ "Register/Login"])
async def login(user: User):
    account = controller.login_reader(user.account_name, user.password)
    if account:
        return {"message": "Login successful", "account_id": account.id_account}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")

@app.get("/view_reader_list", tags = [ "Register/Login"])
async def view_reader_list():
    readers = []
    for reader in controller.reader_list:
        format = {
            "id": reader.id_account,
            "username": reader.account_name,
            "password": reader.password
        }
        readers.append(format)
    return {"readers": readers}