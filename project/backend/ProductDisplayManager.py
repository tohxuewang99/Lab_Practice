from flask import Blueprint, request, jsonify, session
from product import Product 
from catalog import Catalog
from pymongo import MongoClient
from user import User

catalog_bp = Blueprint('catalogs', __name__)

class ProductDisplayManager:
    def __init__(self, connection_url, database_name, collection_name):
        # initialise catalog instance
        self.catalog = Catalog(connection_url, database_name, collection_name)
        
    def getProductDetails(self,ProductID):
        product_instance = Product(ProductID, None, None, None, None, None)
        product_info = product_instance.getProductByID(ProductID)
        if product_info:
            return product_info
        
        else:
            return None
        
        
    def editProductDetail(self,ProductID, newDetails, userEmailAddress):
        # product_instance = Product(ProductID, newDetails.get("ProductName"), newDetails.get("ProductDescription"), newDetails.get("ProductImage"), newDetails.get("ProductPrice") )
        user = user.getUserDeails(userEmailAddress) 
        if user and user.get("UserRole") == "Admin":
            product_instance = Product.getProductByID(ProductID)
            
            if product_instance:
                product_instance.ProductName = newDetails.get("ProdcutName", product_instance.ProductName)
                product_instance.ProductQuantity = newDetails.get("ProductQuantity", product_instance.ProductQuantity)
                product_instance.ProductDescription = newDetails.get("ProductDescription", product_instance.ProductDescription)
                product_instance.ProductPrice = newDetails.get("ProductPrice", product_instance.ProductPrice)
                
                #update the product details into the database
                product_instance.updateProductDetails()
                
                return "Product Details updated."
            
            else:
                return "Product not found."
            
        else:
            return "Access denided. This is only available for admin."
                
                
    def deleteProduct(self, ProductID, UserRole):
        
        # check if the user is admin
        if UserRole != 'Admin':
            return "Access denied."
        
        # Check if product exist
        product_info = self.getProductDetails(ProductID)
        if product_info:
            # if product exist, it would delete the product 
            self.catalog_collection.delete_one({"ProductID": ProductID})
            return "Product deleted."
        
        return "Product not found."
    
    def addProduct(self, ProductID, ProductName, ProductQuantity, ProductDetail, ProductPrice, UserRole):
        if UserRole != 'Admin':
            return "Access denied."
        
        # check if prodcut already exist
        if self.getProductDetails(ProductID):
            return "Product already exists with the smae ProductID"
        
        new_product = {
            "ProductID": ProductID,
            "ProductName" : ProductName,
            "ProductQuantity" : ProductQuantity,
            "ProductDetail" : ProductDetail,
            
            "ProductPrice" : ProductPrice
        }
        
        self.catalog_collection.insert_one(new_product)
        return "Product have been added."
    def getCatalogList(self):
        catalog_list = self.catalog.getProductList()
        return catalog_list
    

@catalog_bp.route("/home", methods=["GET"])
def display_catalog():
    try:
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")
        db = client["test_database"]
        catalogs_collection = db["catalogs"]

        # Retrieve all items from the "catalogs" collection
        catalog_list = list(catalogs_collection.find())

        # Convert the MongoDB documents to a list of dictionaries
        catalog_items = []
        for item in catalog_list:
            catalog_items.append({
                "productID": item.get("productID"),
                "productName": item.get("productName"),
                "productPrice": item.get("productPrice"),
                "productDescription": item.get("productDescription"),
                
            })

        return jsonify(catalog=catalog_items)

    except Exception as e:
        return jsonify(error="Error fetching catalog"), 500
    
@catalog_bp.route("/productList", methods=["GET"])
def admin_display_catalog():
    try:
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")
        db = client["test_database"]
        catalogs_collection = db["catalogs"]

        # Retrieve all items from the "catalogs" collection
        catalog_list = list(catalogs_collection.find())

        # Convert the MongoDB documents to a list of dictionaries
        catalog_items = []
        for item in catalog_list:
            catalog_items.append({
                "productID": item.get("productID"),
                "productName": item.get("productName"),
                "productPrice": item.get("productPrice"),
                "productDescription": item.get("productDescription"),
                
            })

        return jsonify(catalog=catalog_items)

    except Exception as e:
        return jsonify(error="Error fetching catalog"), 500
    

@catalog_bp.route("/add-to-cart", methods=["POST"])
def add_to_cart():
    if request.method == "POST":
        data = request.get_json()
        productID = data.get("productID")
        productQuantity = data.get("productQuantity")
        productName = data.get("productName")
        productPrice = data.get("productPrice")
        
        
        
        
        # userEmailAddress = session.get("UserEmailAddress")
        # userEmailAddress = "bye@gmail.com"
        
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")  # Replace with your MongoDB connection URL
        db = client["test_database"]
        shopping_carts = db["shoppingCarts"]

        existing_product = shopping_carts.find_one({"productID": productID})
        
        if existing_product:
            existing_quantity = existing_product["productQuantity"]
            new_quantity = existing_quantity + productQuantity
            new_price = existing_product["productPrice"] 
            # + (productPrice * productQuantity)  # Calculate the new price
            shopping_carts.update_one({"productID": productID}, {"$set": {"productQuantity": new_quantity, "productPrice": new_price}})
            
        else:
            product = {
                "productID": productID,
                "productQuantity": productQuantity,
                "productName" : productName,
                "productPrice" : productPrice,
                 # You can include productImage if needed
                # "userEmailAddress" : userEmailAddress
            }
            shopping_carts.insert_one(product)
            
        return jsonify(message="Product added to the cart successfully")


