class Complain:
    def __init__(self, user_id, message):
        self.__user_id = user_id
        self.__message = message
        self.__date_time = None
        self.__complain_list = []

    @property
    def user_id(self):
        return self.__user_id

    @property
    def message(self):
        return self.__message

    @property
    def date_time(self):
        return self.__date_time

    @date_time.setter
    def date_time(self, newtime):
        self.__date_time = newtime

    @property
    def complain_list(self):
        return self.__complain_list
