from pymongo import MongoClient
from flask import Blueprint, request, jsonify, session

ShoppingCart_bp = Blueprint('shoppingCart', __name__)

class ShoppingCart:
    # def __init__(self, userEmailAddrss, cartList = None, paymentStatus = False):
    def __init__(self, userEmailAddrss, cartList = None):
        
        self.userEmailAddress = userEmailAddrss
        self.cartList = cartList if cartList is not None else []
        # self.paymentStatus = paymentStatus
        
        self.client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")
        self.db = self.client["test_database"]
        self.cart_collection = self.db["shoppingCarts"]
        
    # def getUserEmailAddress(self):
    #     return self.userEmailAddress
    
    # def setUserEmailAddress(self, cartID):
    #     self.cartID = cartID
        
    def getCartlist(self):
        return self.cartList
    
    def setCartList(self, cartList):
        self.cartList = cartList
        
    # def getPaymentStatus(self):
    #     return self.paymentStatus
    
    # def setPaymentStatus(self, paymentStatus):
    #     self.paymentStatus = paymentStatus
        
    def loadCartFromDatabase(self):
        cart_data = self.cart_collection.find_one({"userEmailAddress": self.userEmailAddress})
        if cart_data:
            self.cartList = cart_data.get("cartList", [])
            self.paymentStatus = cart_data.get("paymentStatus", False)
            
    def saveCartToDatabase(self):
        cart_data = {
            "userEmailAddress": self.userEmailAddress,
            "cartList" : self.cartList,
            "paymentStatus" : self.paymentStatus
        }
        
        self.cart_collection.update_one(
            {"userEmailAddress": self.userEmailAddress},
            {"$set": cart_data},
            upsert= True
        )
        
    def closeConnection(self):
        self.client.close()
        

# @ShoppingCart_bp.route("/cart/<user_email>", methods=["GET"])
# @ShoppingCart_bp.route("/cart", methods = ["GET"])
# def get_shopping_cart(user_email):
#     try:
#         # Load the shopping cart from the database for the given user email
#         user_email = "hello@gmail.com"
#         shopping_cart = ShoppingCart(user_email)  # Assuming you use the user email to identify the cart
#         shopping_cart.loadCartFromDatabase()
#         cart_contents = shopping_cart.getCartlist()

#         return jsonify(cart=cart_contents)
#     except Exception as e:
#         return jsonify(error="Error fetching shopping cart"), 500

@ShoppingCart_bp.route("/cart", methods=["GET"])
def get_shopping_cart():
    try:
        client = MongoClient("mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")
        db = client["test_database"]
        shopping_carts = db["shoppingCarts"]

        # Retrieve all items from the "shoppingCarts" collection
        cart_list = list(shopping_carts.find({}))
        
        cart_items = []
        
        for item in cart_list:
            cart_items.append({
                "cartID": item.get("productID"),
                "productName": item.get("productName"),
                "productQuantity" : item.get("productQuantity"),
                "productPrice": item.get("productPrice"),
                "productImage": item.get("productImage")
            })


        return jsonify(cart=cart_items)
    except Exception as e:
        return jsonify(error="Error fetching shopping cart"), 500



# __id, productID, productQuantity, productName, prodcutPrice, productImage,userEmailAddress

