from flask import Flask, request, jsonify, session
from flask_cors import CORS
from user import user_bp 
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user

from ProductDisplayManager import catalog_bp
from shoppingCart import ShoppingCart_bp
from product import product_bp

app = Flask(__name__)
# enables CORS for entire app
CORS(app)

# @app.route("/", methods = ["GET"])
# def index():
#     return 'Hello world'

# Session configuration
app.config["SESSION_TYPE"] = "filesystem"  # You can use other session types as needed
app.config["SECRET_KEY"] = "your_secret_key"  # Replace with your own secret key
# secret key for session management. Should be secured
#app.secret_key = "secret_key"

login_manager = LoginManager()
login_manager.init_app(app)


# register for user blueprint
app.register_blueprint(user_bp)

#register for catalog blueprint
app.register_blueprint(catalog_bp)

# register for shopping cart blueprint
app.register_blueprint(ShoppingCart_bp)

# register for product blueprint
app.register_blueprint(product_bp)


if __name__ == "__main__":
    app.run(debug= True)


# from flask import Flask, request, jsonify, session
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for the entire app

# users = [
#     {"id": 1, "email": "user@example.com", "password": "password"}
# ]

# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     # Check if the user already exists
#     user_exists = next((user for user in users if user["email"] == email), None)

#     if user_exists:
#         return jsonify({"error": "Email already exists"}), 409

#     # Hash the password (you would need to use an appropriate hashing library)
#     # For simplicity, let's assume a plain string here
#     hashed_password = password

#     # Generate a new user
#     new_user = {"id": len(users) + 1, "email": email, "password": hashed_password}

#     # Add the new user to your hardcoded user data
#     users.append(new_user)

#     # Set the user_id in the session
#     session["user_id"] = new_user["id"]

#     return jsonify({"id": new_user["id"], "email": new_user["email"]})

# @app.route("/login", methods=["POST"])
# def login_user():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     # Find the user by email
#     user = next((user for user in users if user["email"] == email), None)

#     if user is None:
#         return jsonify({"error": "Unauthorized Access"}), 401

#     if user["password"] != password:
#         return jsonify({"error": "Unauthorized"}), 401

#     # Set the user_id in the session
#     session["user_id"] = user["id"]

#     return jsonify({"id": user["id"], "email": user["email"]})


# if __name__ == "__main__":
#     app.run(debug=True)
