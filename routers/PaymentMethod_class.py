class PaymentMethod:
    def __init__(self,chanel_name, chanel_id):
        self.__chanel_name = chanel_name
        self.__chanel_id = chanel_id
    
    @property
    def chanel_name(self):
        return self.__chanel_name
    
    @property
    def chanel_id(self):
        return self.__chanel_id