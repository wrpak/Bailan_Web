class PaymentHistory:
    def __init__(self, money, date_time):
        self.__money = money
        self.__date_time = date_time
        
    def __str__(self):
        return str(self.money) + str(self.date_time)

    @property
    def money(self):
        return self.__money

    @money.setter
    def money(self, new_money):
        self.__money = new_money

    @property
    def date_time(self):
        return self.__date_time

    @date_time.setter
    def date_time(self, new_date_time):
        self.__date_time = new_date_time