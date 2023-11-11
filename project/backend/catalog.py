from pymongo import MongoClient

class Catalog:
    def __init__(self, connection_url, database_name, collection_name):
        self.client = MongoClient(connection_url)
        self.db = self.client[database_name]
        self.catalog_collection = self.db[collection_name]
        self.ProductList = self.getProductList()
        
    def getProductList(self):
        return list(self.catalog_collection.find())
    
    def viewProductCatalog(self):
        return self.ProductList