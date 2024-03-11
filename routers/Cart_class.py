class Cart:
    def __init__(self):
        self.__book_cart_list = []

    @property
    def book_cart_list(self):
        return self.__book_cart_list

    def add_book_to_cart(self, book):
        self.__book_cart_list.append(book)

    def remove_book_from_cart(self, book_id):
        for book in self.__book_cart_list:
            if book.id == book_id:
                self.__book_cart_list.remove(book)
                return True
        return False

    def buy(self):
        pass

    def rent(self):
        pass