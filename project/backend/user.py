from flask import Blueprint, request, jsonify, session
from pip._vendor import requests
from pymongo import MongoClient
from datetime import datetime, timedelta

user_bp = Blueprint('user', __name__)

# MongoDB connection setup
client = MongoClient(
    "mongodb+srv://user:3103Project@cluster0.uj1mmle.mongodb.net/")  # Replace with your MongoDB connection URL
db = client["test_database"]
user_collection = db["users"]


class User:
    def __init__(self, username, password, phone_number, email, UserAddress, UserID, adminId=None):
        self.Username = username
        self.UserPassword = password
        self.UserRole = "buyer"
        self.UserPhoneNumber = phone_number
        self.UserEmailAddress = email
        # not in database. To find out where to retrieve the info. To edit 
        # self.User2FA = TwoFA
        self.AdminID = adminId
        self.UserID = UserID
        self.UserAddress = UserAddress

    def getUserName(self):
        return self.Username

    def setUserName(self, Username):
        self.Username = Username

    def getUserPassword(self):
        return self.UserPassword

    def setUserPassword(self, UserPassword):
        self.UserPassword = UserPassword

    def getUserRole(self):
        return self.UserRole

    def removeBuyerRole(self):
        if self.UserRole == "Buyer":
            self.UserRole = None
            return True

        else:
            return False

    def setRoleToAdmin(self):
        if self.UserRole != "admin":
            self.UserRole = "admin"
            return True

        else:
            # User is already admin
            return False

    def removeAdminRole(self):
        if self.UserRole == "admin":
            self.UserRole = "buyer"
            return True

        else:
            # User is already a buyer
            return False

    def getUserPhoneNumber(self):
        return self.UserPhoneNumber

    def setUserPhoneNumber(self, UserPhoneNumber):
        self.UserPhoneNumber = UserPhoneNumber

    def getUserEmailAddress(self):
        return self.UserEmailAddress

    def setUserEmailAddress(self, UserEmailAddress):
        self.UserEmailAddress = UserEmailAddress

    def getAdminID(self):
        return self.AdminID

    def setAdminID(self, AdminID):
        self.AdminID = AdminID

    def getUserID(self):
        return self.UserID

    def setUserID(self, UserID):
        self.UserID = UserID

    def getUserAddress(self):
        return self.UserAddress

    def setUserAddress(self, UserAddress):
        self.UserAddress = UserAddress

    def checkLogin(self, inputtedUsername, inputtedPassword):
        return self.Username == inputtedUsername and self.UserPassword == inputtedPassword


@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    Username = data.get("Username")
    UserPassword = data.get("UserPassword")
    UserRole = "Buyer"
    UserPhoneNumber = data.get("UserPhoneNumber")
    UserEmail = data.get("UserEmailAddress")
    UserAddress = data.get("UserAddress")

    # check if user already existed with their email
    existing_user = user_collection.find_one({"UserEmailAddress": UserEmail})
    user_collection.create_index('UserEmailAddress', unique=True)

    if existing_user:
        return jsonify({"error": "Email already exists"}), 409

    # To hash the important information
    new_user = {
        "Username": Username,
        "UserPassword": UserPassword,
        "UserRole": UserRole,
        "UserPhoneNumber": UserPhoneNumber,
        "UserEmailAddress": UserEmail,
        "UserAddress": UserAddress
    }

    # To insert the new user into MongoDB collection
    successSignUp = user_collection.insert_one(new_user)

    # set user_id in the session
    session["user_id"] = str(successSignUp.inserted_id)

    return jsonify({"id": str(successSignUp.inserted_id), "Username": Username, "UserEmailAddress": UserEmail})


# Define a global dictionary to store failed login attempts
failed_login_attempts = {}
RECAPTCHA_SECRET_KEY = '6Le-Y-8oAAAAAByU8CiZyomBkhuMW8CtUHbPgOHm'


@user_bp.route("/", methods=["POST"])
def login_user():
    data = request.get_json()
    UserEmailAddress = data.get("UserEmailAddress")
    UserPassword = data.get("UserPassword")

    # Check if the user has exceeded the maximum failed login attempts
    if UserEmailAddress in failed_login_attempts:
        if failed_login_attempts[UserEmailAddress]['attempts'] >= 5:
            # Check if the lockout time has passed (10 minutes)
            lockout_time = failed_login_attempts[UserEmailAddress]['lockout_time']
            if datetime.now() < lockout_time:
                remaining_time = lockout_time - datetime.now()
                return jsonify(
                    {"error": f"Account is locked. Please try again in {remaining_time.seconds // 60} minutes."}), 403
            else:
                # Reset the failed login attempts counter
                del failed_login_attempts[UserEmailAddress]

    # Find user by email (you should replace this with your database query)
    user = user_collection.find_one({"UserEmailAddress": UserEmailAddress})

    if user is None:
        return jsonify({"error": "Your account is either disabled or you have entered a wrong email address"}), 404

    if user["UserPassword"] != UserPassword:
        # Increase the failed login attempts count
        if UserEmailAddress in failed_login_attempts:
            failed_login_attempts[UserEmailAddress]['attempts'] += 1
        else:
            failed_login_attempts[UserEmailAddress] = {
                'attempts': 1,
                'lockout_time': datetime.now() + timedelta(minutes=10)
            }
        return jsonify({"error": "You have entered either a wrong email address or password"}), 401

    # Successful login, reset the failed login attempts counter
    if UserEmailAddress in failed_login_attempts:
        del failed_login_attempts[UserEmailAddress]

    # Set the user_id in the session (make sure your session configuration is properly set up)
    session["user_id"] = str(user["_id"])
    # session["user_email"] = user["userEmailAddress"]
    
    return jsonify({"id": str(user["_id"]), "UserEmailAddress": user["UserEmailAddress"], "UserRole": user["UserRole"]})

if __name__ == '__main__':
    app.run(debug=True)
