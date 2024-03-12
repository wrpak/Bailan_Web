import datetime
from routers.BookStatus_class import BookStatus
from routers.Complain_class import Complain
from routers.Review_class import Review
from routers.Account_class import Reader, Writer

class Controller:
    def __init__(self):
        self.__reader_list = []
        self.__writer_list = []
        self.__complain_list = []
        self.__book_list = []
        self.__payment_method_list = []
        self.__promotion_list = []
        self.__num_of_book = 0
        self.__num_of_account = 0

    @property
    def reader_list(self):
        return self.__reader_list
    
    @property
    def writer_list(self):
        return self.__writer_list

    @property
    def complain_list(self):
        return self.__complain_list

    @property
    def book_list(self):
        return self.__book_list

    @property
    def payment_method_list(self):
        return self.__payment_method_list
    
    @property
    def promotion_list(self):
        return self.__promotion_list

# Add
    def add_reader(self, reader):
        self.__num_of_account += 1
        reader.id_account = self.__num_of_account
        self.__reader_list.append(reader)
        
    def add_writer(self, writer):
        self.__num_of_account += 1
        writer.id_account = self.__num_of_account
        self.__writer_list.append(writer)
        
    

    def add_complain(self, complain):
        self.__complain_list.append(complain)

    def upload_book(self, book, writer):
        self.__num_of_book += 1
        book.id = self.__num_of_book
        book.writer = writer
        self.__book_list.append(book)
        writer.book_collection_list.append(book)
        return "Success"

    def add_payment_method(self, payment_method):
        self.__payment_method_list.append(payment_method)
        
    def add_promotion_list(self, promotion):
        self.__promotion_list.append(promotion)
        for prom in self.__promotion_list:
            if datetime.datetime.now() > prom.end_date_time:
                self.__promotion_list.remove(prom)

# Book
    def get_all_book(self):
        list = []
        for book in self.__book_list:
            format = {
                "id": book.id,
                "book_name" : book.name,
                "writer_name" : book.writer.account_name,
                "type_book" : book.book_type,
                "rating" : book.review.rating,
                "price" : book.price_coin
            }
            list.append(format)
        if list:
            return list
        else:
            return None

    def search_reader_by_id(self, reader_id):
        for reader in self.__reader_list:
            if reader.id_account == reader_id:
                return reader
        return None
    
    def search_writer_by_id(self, writer_id):
        for writer in self.__writer_list:
            if writer.id_account == writer_id:
                return writer
        return None
    
    def search_book_by_id(self, book_id):
        for book in self.__book_list:
            if book.id == book_id:
                return book
        return None
    
    def search_coin(self, account_id):
        account = self.search_reader_by_id(account_id)
        if account is None:
            account = self.search_writer_by_id(account_id)
            if account is None:
                return "Not found account"
        return account.coin
    
    def search_book_by_bookname(self, bookname):
        new_book_list = []
        for book in self.__book_list:
            if book.name.lower() == bookname.lower() or bookname.lower() in book.name.lower():
                format = {
                    "id": book.id,
                    "book_name" : book.name,
                    "writer_name" : book.writer.account_name,
                    "type_book" : book.book_type,
                    "rating" : book.review.rating,
                    "price" : book.price_coin
                }
                new_book_list.append(format)
        if new_book_list:
            return new_book_list
        else:
            return None

    def search_book(self,bookname=None,writer=None,type=None): #searchทุกอย่าง
        new_book_list = []
        if writer == None and type == None: #bookname
            for book in self.__book_list:
                if book.name == bookname or bookname in book.name:
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif bookname == None and type == None: #writer
            for book in self.__book_list:
                if book.writer.account_name == writer or writer in book.writer.account_name:
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif bookname == None and writer == None: #type
            for book in self.__book_list:
                if book.book_type == type:
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif type == None: #bookname writer
            for book in self.__book_list:
                if (book.writer.account_name == writer and book.name == bookname) or (writer in book.writer.account_name and book.name == bookname) or (book.writer.account_name == writer and bookname in book.name) or ( bookname in book.name and writer in book.writer.account_name):
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif writer == None: #bookname type
            for book in self.__book_list:
                if (book.name == bookname and book.book_type == type) or (bookname in book.name and book.book_type == type):
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif bookname == None: #writer type
            for book in self.__book_list:
                if (book.writer.account_name == writer and book.book_type == type) or (writer in book.writer.account_name and book.book_type == type):
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)
        elif bookname and writer and type: #bookname writer type
            for book in self.__book_list:
                if bookname in book.name and writer in book.writer.account_name and book.book_type == type:
                    format = [f'Book Name: {book.name}' , f'Writer Name: {book.writer.account_name}' , f'Type of Book: {book.book_type}']
                    new_book_list.append(format)

        if new_book_list:
                return new_book_list
        else:
                return None
            
    def search_book_by_promotion(self, promotion_name):
        books = []
        for promotion in self.__promotion_list:
            if promotion.name_festival == promotion_name:
                for book in promotion.book_list:
                    format = {
                        "id": book.id,
                        "book_name" : book.name,
                        "writer_name" : book.writer.account_name,
                        "type_book" : book.book_type,
                        "rating" : book.review.rating,
                        "price" : book.price_coin
                    }
                    books.append(format)
                if books == []:
                    return "No book in this promotion"
                return books
        return "Not found this promotion"
            
    def show_book_info(self, book_id):
        book = self.search_book_by_id(book_id)
        if book is not None:
            format = {
                    "book_name" : book.name,
                    "writer_name" : book.writer.account_name,
                    "type_book" : book.book_type,
                    "intro" : book.intro,
                    "rating" : book.review.rating,
                    "price" : book.price_coin
                }
            return format
        return 'Not Found'
            
    def show_book_collection_of_writer(self,writer_name):
        book_collection = []
        for account in self.__writer_list:
            if account.account_name == writer_name:
                for book in account.book_collection_list:
                    format = {
                        "id": book.id,
                        "book_name" : book.name,
                        "writer_name" : book.writer.account_name,
                        "type_book" : book.book_type,
                        "intro" : book.intro,
                        "rating" : book.review.rating,
                        "price" : book.price_coin
                    }
                    book_collection.append(format)
                return book_collection
        return "Not found account"
    
    def show_book_collection_of_reader(self, reader_id):
        book_collection = []
        account = self.search_reader_by_id(reader_id)
        if account is not None:
            for book in account.book_collection_list:
                format = {
                    "id": book.id,
                    "book_name" : book.name,
                    "writer_name" : book.writer.account_name,
                    "type_book" : book.book_type,
                    "intro" : book.intro,
                    "rating" : book.review.rating,
                    "price" : book.price_coin
                }
                book_collection.append(format)
        if book_collection:
            return book_collection
        else:
            return "No Book"

# Cart
    def add_book_to_cart(self, book_id, reader_id):
        book = self.search_book_by_id(book_id)
        if book is not None:
            reader = self.search_reader_by_id(reader_id)
            if reader is not None:
                if book not in reader.cart.book_cart_list:
                    reader.cart.add_book_to_cart(book)
                    return "Success"
                else:
                    return "Book is already in the cart"
        return "Not found"  
    
    def remove_book_from_cart(self, reader_id, book_id):
        reader = self.search_reader_by_id(reader_id)
        if reader is not None:
            if reader.cart is not None:
                for book in reader.cart.book_cart_list:
                    if book.id == book_id:
                        reader.cart.book_cart_list.remove(book)
                        return "Book removed from the cart"
                return "Book not found in the cart"
            else:
                return "Reader's cart is empty"
        else:
            return "Reader not found"
        
    def show_reader_cart(self, reader_id):
        reader = self.search_reader_by_id(reader_id)
        if reader is not None:
            if reader.cart is not None and reader.cart.book_cart_list:
                cart_info = []
                for book in reader.cart.book_cart_list:
                    cart_info.append({"name": book.name, "price": book.price_coin, "id": book.id})
                return cart_info
            else:
                return "Reader's cart is empty"
        else:
            return "Reader not found"
        
    def select_book_checkout(self, reader_id, book_ids):
        reader = self.search_reader_by_id(reader_id)
        if reader is not None:
            if reader.cart is not None and reader.cart.book_cart_list:
                selected_books = [book for book in reader.cart.book_cart_list if book.id in book_ids]
                if selected_books:
                    total_coin = sum(book.price_coin for book in selected_books)
                    return {"message": "Books selected for checkout", "total_coin": total_coin, "list book": book_ids}
                else:
                    return {"error": "Invalid book selection"}
            else:
                return {"error": "The shopping cart is empty."}
        else:
            return {"error": "The reader does not exist."}

# History
    def cointrasaction_history(self,account_id):
        coin_tran_list = []
        account = self.search_reader_by_id(account_id)
        if account is None:
            account = self.search_writer_by_id(account_id)
            if account is None:
                return "Not Found Account"
        
        for info in account.coin_transaction_history_list:
            if info.type == "Buy" or info.type == "Rent":
                coin_tran_list.append(f"You {info.type} books by using {info.coin} coin on {info.date_time}.")
            elif info.type == "top up":
                coin_tran_list.append(f"You {info.type} {info.coin} coin.")
            elif info.type == "Transfer":
                coin_tran_list.append(f"You {info.type} {info.coin} coin on {info.date_time}.")

        if coin_tran_list:
            return coin_tran_list
        else:
            return "Not History"
        
    def payment_history(self,account_id):
        payment_list = []
        account = self.search_reader_by_id(account_id)
        if account is  None:
            account = self.search_writer_by_id(account_id)
            if account is None:
                return "Not Found Account"
        for data in account.payment_history_list:
             payment_list.append(f"You top up {data.money} Bath on {data.date_time}")
    
        if payment_list:
            return payment_list
        else:
            return "Not History"

# Money
    def show_payment_method(self):
        chanels = []
        for c in self.__payment_method_list:
             format = {
                 "id":c.chanel_id,
                "name":c.chanel_name
             }
             chanels.append(format)
        return chanels

    def top_up(self, id_account, money, chanel):
        account = self.search_reader_by_id(id_account)
        if account is not None:  
            for c in self.__payment_method_list:
                if c.chanel_id == chanel:
                    if money % 2 == 0:
                        coin = money/2
                        date_time = datetime.datetime.now()
                        account.adding_coin = coin
                        account.update_payment_history_list(money,date_time)
                        account.update_coin_transaction_history_list(coin,date_time,"top up")
                        return "Success"
                    else : return "Please increse/decrese money 1 Baht"
            return "Not Found Chanel"
        return "Don't Have any Account"
    def transfer(self, writer_id, coin):
        account = self.search_writer_by_id(writer_id)
        if account is not None:
            if account.coin >= coin:
                money = coin*2
                date_time = datetime.datetime.now()
                account.money = money
                account.losing_coin = coin
                account.update_coin_transaction_history_list(coin, date_time, "Transfer")
                return "Success"
            return "You don't have enough coin"
        return "Not found your account"

# Buy / Rent
    def buy_book(self, id_account ,list_book_id): 
            account = self.search_reader_by_id(id_account)
            if account is not None:
                price = 0
                for id in list_book_id:
                    book = self.search_book_by_id(id)
                    if book is not None:
                        if book in account.book_collection_list:
                            return "You already have "+str(book.name)
                        price += book.price_coin
                        account.update_book_collection_list(book)
                        book.writer.adding_coin = book.price_coin 
                    else : return "No Book"
                    
                    if account.coin >= price:
                        date_time = datetime.datetime.now()
                        account.update_coin_transaction_history_list(price, date_time, "Buy")
                        account.losing_coin = price 
                        book.num_of_reader = 1
                        return "success" 
                    else : return "Don't have coin enough"
                else : return "Not Found Account"
    
    def rent(self, reader_id, book_id_list):
        account = self.search_reader_by_id(reader_id)
        if account is not None:
            sum_price = 0
            for id in book_id_list:
                book = self.search_book_by_id(id)
                if book is not None:
                    if book in account.book_collection_list:
                        return "You already have "+str(book.name)
                    book.update_book_status()
                    book.num_of_reader = 1
                    new_book_price = book.price_coin*0.8
                    sum_price += new_book_price
                    account.update_book_collection_list(book)
                    book.writer.adding_coin = new_book_price
                else: return "Not found book"
                
                if account.coin >= sum_price:
                    account.losing_coin = sum_price
                    date_time = datetime.datetime.now()
                    account.update_coin_transaction_history_list(sum_price, date_time, "Rent")
                    return "Success"
                return "Don't have coin enough"
            return "Not found account"
    
# Review
    def add_rating(self, book_id, rating):
        book = self.search_book_by_id(book_id)
        if book is not None:
            if rating < 0 or rating >5:
                return "Please rate this book in 0-5"
            else:
                book.review.add_rating(rating)
                return book.review.rating
        return "Not found book"
    
    def submit_comment(self, reader_id, book_id, message):
        reader_account = self.search_reader_by_id(reader_id)
        if reader_account is not None:
            book = self.search_book_by_id(book_id)
            if book is not None:
                book.review.add_comment(reader_account, message)
                return "Success"
            return "Not found book"
        return "Not found account"

    def view_comment(self, book_id):
        comment_list = []
        book = self.search_book_by_id(book_id)

        if book is not None:
            for account, comment, date_time in book.review.comment_list:
                format = {
                    "account" : account.account_name,
                    "comment" : comment,
                    "datetime" : date_time
                }
                comment_list.append(format)
            return comment_list
        return "Not found book"

# Promotion
    def show_promotion(self):
        for promotion in self.__promotion_list:
            return promotion.name_festival
        return "don't have pormotion now"

# Complain
    def submit_complaint(self, user_id, message):
        complain = Complain(user_id, message)
        
        user = self.search_reader_by_id(user_id)
        if user is None:
            user = self.search_writer_by_id(user_id)
            if user is None:
                return "Not found account"
            
        date_time = datetime.datetime.now()
        complain.date_time = date_time
        self.__complain_list.append((user.account_name, message, complain.date_time))
        return "Success"

    def view_complaints(self):
        if not self.complain_list:
            return "No complaints available."
        complaints_info = []
        for account, message, datetime in self.__complain_list:
            format = {
                "account": account,
                "message": message,
                "datetime": datetime
            }
            complaints_info.append(format)
        if complaints_info == []:
            return "Have no complain."
        return complaints_info

    def login(self, account_name, password):
        for account in self.__reader_list:
            if account.account_name == account_name and account.password == password:
                return account.id_account, "reader"
        for account in self.writer_list:
            if account.account_name == account_name and account.password == password:
                return account.id_account, "writer"
        return None, None

    def register_reader(self, account_name, password):
        for reader in self.__reader_list:
            if reader.account_name == account_name:
                return "Username already exists. Please choose another one."

        self.__num_of_account += 1
        reader = Reader(account_name, password)
        reader.id_account = self.__num_of_account
        self.__reader_list.append(reader)
        
        return "Reader registered successfully."
    
    def register_writer(self, account_name, password):
        for writer in self.__writer_list:
            if writer.account_name == account_name:
                return "Username already exists. Please choose another one."

        self.__num_of_account += 1
        writer = Writer(account_name, password)
        writer.id_account = self.__num_of_account
        self.__writer_list.append(writer)
        
        return "Writer registered successfully."