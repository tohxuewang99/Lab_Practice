from user import User, user_collection


# currentUserEmailAddress is the email address of the current user who is assigning the admin role
# targetUserEmailAddress is the email address of the user who is getting the admin role
def AddAdminRoleToUser(currentUserEmailAddress, targetUserEmailAddress):
    current_user = user_collection.find_one({"UserEmailAddress": currentUserEmailAddress})

    if current_user:
        # create a User instance for the current user who is going to be assigning 

        current_user_instance = User(
            current_user["Username"],
            current_user["UserPassword"],
            current_user["UserRole"],
            current_user["UserPhoneNumber"],
            current_user["UserEmailAddress"],
            current_user["AdminID"],
            current_user["UserID"],
            current_user["UserAddress"]
        )

        # check if the current user is an admin
        if current_user_instance.getUserRole() != "Admin":
            print("Access denided. You are not an admin")
            return

        target_user = user_collection.find_one({"UserEmailAddress": targetUserEmailAddress})

        if target_user:

            # Create a User instance for target user that the role would be added to
            target_user_instance = User(
                target_user["Username"],
                target_user["UserPassword"],
                target_user["UserRole"],
                target_user["UserPhoneNumber"],
                target_user["UserEmailAddress"],
                target_user["AdminID"],
                target_user["UserID"],
                target_user["UserAddress"]
            )

            if target_user_instance.setRoleToAdmin():
                # set user to admin role & remove buyer role
                print("User is now an admin")

            else:
                # User already have the admin role 
                print("User is already an admin")

        else:
            # The target User that admin role is going to add to does not exist
            print("The user with email {} does not exist".format(targetUserEmailAddress))

    else:
        # Current user that is trying to assign the admin role does not exist
        print("Current user with email {} does not exist".format(currentUserEmailAddress))


# currentUserEmailAddress is the email address of the current user who is assigning the admin role
# targetUserEmailAddress is the email address of the user who is getting the admin role
def RemoveAdminRoleFromUser(currentUserEmailAddress, targetUserEmailAddress):
    current_user = user_collection.find_one({"UserEmailAddress": currentUserEmailAddress})

    if current_user:

        # Create a User instance for the current user that is assignign the admin role
        current_user_instance = User(
            current_user["Username"],
            current_user["UserPassword"],
            current_user["UserRole"],
            current_user["UserPhoneNumber"],
            current_user["UserEmailAddress"],
            current_user["AdminID"],
            current_user["UserID"],
            current_user["UserAddress"]
        )

        # check if the current user is an admin
        if current_user_instance.getUserRole() != "Admin":
            print("Access denied. Current user is not an admin")
            return

        target_user = user_collection.find_one({"UserEmailAddress": targetUserEmailAddress})

        if target_user:

            # Create a user instance for the user that is going to be assigned the admin role
            target_user_instance = User(
                target_user["Username"],
                target_user["UserPassword"],
                target_user["UserRole"],
                target_user["UserPhoneNumber"],
                target_user["UserEmailAddress"],
                target_user["AdminID"],
                target_user["UserID"],
                target_user["UserAddress"]
            )

            if target_user_instance.removeAdminRole():
                # Admin role have been removed and buyer role has been added
                print("User is no longer an admin.")

            else:
                # User is already a buyer
                print("User is already a buyer.")

        else:
            # User that is going to be removed of admin role does not exist
            print("The user with email {} does not exist.".format(targetUserEmailAddress))

    else:
        # The current user does not exist
        print("Current user with email {} does not exist".format(currentUserEmailAddress))


# currentUserEmailAddress is the email address of the current user who is assigning the admin role
# targetUserEmailAddress is the email address of the user who is getting the admin role
def removeBuyerRoleFromUser(currentUserEmailAddress, targetUserEmailAddress):
    current_user = user_collection.find_one({"UserEmailAddress": currentUserEmailAddress})

    if current_user:

        # create a User instance for the user who is removing buyer role
        current_user_instance = User(
            current_user["Username"],
            current_user["UserPassword"],
            current_user["UserRole"],
            current_user["UserPhoneNumber"],
            current_user["UserEmailAddress"],
            current_user["AdminID"],
            current_user["UserID"],
            current_user["UserAddress"]
        )

        # check if the current user is an admin
        if current_user_instance.getUserRole() != "Admin":
            print("Access denided. You are not an admin.")
            return

        target_user = user_collection.find_one({"UserEmailAddress": targetUserEmailAddress})

        if target_user:

            # Create a User instance for the user who is getting buyer role removed
            target_user_instance = User(
                target_user["Username"],
                target_user["UserPassword"],
                target_user["UserRole"],
                target_user["UserPhoneNumber"],
                target_user["UserEmailAddress"],
                target_user["AdminID"],
                target_user["UserID"],
                target_user["UserAddress"]
            )

            # Remove buyer role from the user
            target_user_instance.removeBuyerRole()
            print("User has been disabled.")

        else:
            print("The user with email {} does not exist".format(targetUserEmailAddress))

    else:
        print("Current user with email {} does not exist.".format(currentUserEmailAddress))


def LoginUser(InputtedUserEmailAddress, InputtedUserPassword):
    user = user_collection.find_one({"UserEmailAddress": InputtedUserEmailAddress})

    if user:

        # create a User instance
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

        # check if inputted password is correct
        if user_instance.checkLogin(InputtedUserEmailAddress, InputtedUserPassword):
            if user_instance.getUserRole() == None:
                print("Your account have been disabled.")

            else:
                Username = user_instance.getUserName

                # Login user with different UI based on the role
                if user_instance.getUserRole() == "Admin":

                    print("Hello Admin " + Username)
                    # Display Admin UI

                elif user_instance.getUserRole() == "Buyer":
                    print("Hello " + Username)

        else:
            # if email and/or password 
            print("Invalid email or password.")

    else:
        # if email and/or password does not exist
        print("Invalid email or password.")


def getUserDetails(userEmailAddress):
    user = user_collection.find_one({"UserEmailAddress": userEmailAddress})

    if user:

        # create a User instance
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

        if user_instance.getUserRole() == None:
            print("Account have been disabled")
            return None

        else:

            # Get user details
            user_details = {
                "Username": user_instance.getUserName(),
                "UserRole": user_instance.getUserRole(),
                "UserPhoneNumber": user_instance.getUserPhoneNumber(),
                "UserEmailAddress": user_instance.getUserEmailAddress(),
                "AdminID": user_instance.getAdminID(),
                "UserID": user_instance.getUserID(),
                "UserAddress": user_instance.getUserAddress()
            }

            return user_details

    else:
        print("User with email {} does not exist".format(userEmailAddress))
        return None


def ResetPassword(userEmailAddress, userNewPassword):
    user = user_collection.find_one({"UserEmailAddress": userEmailAddress})

    if user:

        # create a User instance
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

        # Set new password
        user_instance.setUserPassword(userNewPassword)

        user_collection.update_one(
            {"UserEmailAddress": userEmailAddress},
            {"$set": {"UserPassword": userNewPassword}}
        )

        print("Password reset successful.")

    else:
        print("User with email {} does not exist".format(userEmailAddress))


def editUserDetails(UserEmailAddress, updated_user_data):
    user = user_collection.find_one({"UserEmailAddress": UserEmailAddress})

    if user:

        # create a User instance
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

        # update the user's detail with the new data
        for key, value in updated_user_data.items():
            if hasattr(user_instance, key):
                setattr(user_instance, key, value)

        # update the user's details in the database
        updated_data = {
            "Username": user_instance.getUserName(),
            "UserPassword": user_instance.getUserPassword(),
            "UserRole": user_instance.getUserRole(),
            "UserPhoneNumber": user_instance.getUserPhoneNumber(),
            "AdminID": user_instance.getAdminID(),
            "UserID": user_instance.getUserID(),
            "UserAddress": user_instance.getUserAddress()
        }

        user_collection.update_one(
            {"UserEmailAddress": UserEmailAddress},
            {"$set": updated_data}
        )

        print("User details updated successfully.")

    else:
        print("User with the email {} does not exist".format(UserEmailAddress))


def CheckAccountExist(userEmailAddress):
    user = user_collection.find_one({"UserEmailAddress": userEmailAddress})

    if user:
        # if user account exist
        return True

    else:
        # if user does not exist 
        return False
