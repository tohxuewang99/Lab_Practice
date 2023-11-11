from typing import List
from accountmanagement import User, user_collection

class IAdmin:
    def __init__(self, user_email):
        self.user_email = user_email

    def is_admin(self):
        # Check if the current user has the admin role.
        user = user_collection.find_one({"UserEmailAddress": self.user_email})
        if user:
            user_instance = User(
                user["Username"],
                user["UserPassword"],
                user["UserRole"],
                user["UserPhoneNumber"],
                user["UserEmailAddress"],
                user["AdminID"],
                user["UserID"],
                user["UserAddress"]
            )
            return user_instance.getUserRole() == "admin"
        return False

    def viewAllUserInfo(self) -> List[dict]:
        """
        View all user information from the 'users' collection.

        Returns:
            List[dict]: A list of dictionaries, each containing user information.
        """
        user_info = []  # Initialize an empty list to store user information.
        
        # Check if the current user is an admin.
        if not self.is_admin():
            return user_info  # Return an empty list if the user is not an admin.

        
        # Retrieve all user records from the 'users' collection.
        users = user_collection.find()

        # Iterate through the user records and extract relevant information.
        for user in users:
            user_instance = User(
                user["Username"],
                user["UserPassword"],
                user["UserRole"],
                user["UserPhoneNumber"],
                user["UserEmailAddress"],
                user["AdminID"],
                user["UserID"],
                user["UserAddress"]
            )
            # Append user information to the list.
            user_info.append({
                "Username": user_instance.getUserName(),
                "UserRole": user_instance.getUserRole(),
                "UserPhoneNumber": user_instance.getUserPhoneNumber(),
                "UserEmailAddress": user_instance.getUserEmailAddress(),
                "AdminID": user_instance.getAdminID(),
                "UserID": user_instance.getUserID(),
                "UserAddress": user_instance.getUserAddress()
            })

        return user_info
