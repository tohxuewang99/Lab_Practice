from pymongo import MongoClient
from flask import Blueprint, request, jsonify, session

product_bp = Blueprint('product', __name__)

client = MongoClient(
    "mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")  # Replace with your MongoDB connection URL
db = client["test_database"]
catalog_collection = db["catalogs"]

class Product:
    def __init__(self, ProductID, ProductName, ProductQuantity, ProductDescription, ProductPrice):
        self.ProductID = ProductID
        self.ProductName = ProductName
        self.ProductQuantity = ProductQuantity
        self.ProductDescription = ProductDescription
        
        self.ProductPrice = ProductPrice

    # Getter methods
    def getProductID(self):
        return self.ProductID

    def getProductName(self):
        return self.ProductName

    def getProductQuantity(self):
        return self.ProductQuantity

    def getProductDescription(self):
        return self.ProductDescription

    

    def getProductPrice(self):
        return self.ProductPrice

    def getProductByID(self, ProductID):
        # MongoDB connection setup (you might want to do this globally)
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")  # Replace with your MongoDB connection URL
        db = client["test_database"]
        catalog_collection = db["catalogs"]

        product = catalog_collection.find_one({"ProductID": ProductID})

        if product:
            productInfo = {
                "ProductID": product["ProductID"],
                "ProductName": product["ProductName"],
                "ProductQuantity": product["ProductQuantity"],
                "ProductDescription": product["ProductDescription"],
                "ProductPrice": product["ProductPrice"]
            }

            return productInfo
        else:
            return None

    def updateProductDetails(self):
        # MongoDB connection setup (you might want to do this globally)
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")  # Replace with your MongoDB connection URL
        db = client["test_database"]
        catalog_collection = db["catalogs"]
        
        #create dictionary with the updated product details
        updated_details = {
            "ProductName" : self.ProductName,
            "ProductQuantity" : self.ProductQuantity,
            "ProductDescription": self.ProductDescription,
            "ProductPrice": self.ProductPrice
            
        }
        
        catalog_collection.update_one({"ProductID": self.ProductID}, {"$set": updated_details})
        
    

@product_bp.route("/addProduct", methods=["POST"])
def add_product():
    data = request.get_json()
    productQuantity = data.get("productQuantity")
    productName = data.get("productName")
    productPrice = data.get("productPrice")
    productDetail = data.get("productDetail")
    
    existing_product = catalog_collection.find_one({"productName": productName})
    catalog_collection.create_index('productName')
    
    if existing_product:
        return jsonify({"error": "Product already exists"}), 409
    
    new_product = {
        "ProductQuantity": productQuantity,
        "ProductName": productName,
        "ProductPrice": productPrice,
        "ProductDetail": productDetail
        
    }
    
    # To insert the new product into MongoDB collection
    successAddNewProduct = catalog_collection.insert_one(new_product)
    
    session["id"] = str(successAddNewProduct.inserted_id)
    
    return jsonify({"id": str(successAddNewProduct.inserted_id), "ProductQuantity": productQuantity, "ProductName": productName, "ProductPrice": productPrice, "ProductDetail": productDetail})
