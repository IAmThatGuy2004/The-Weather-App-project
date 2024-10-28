# Description of the Weather Forecast app usecase model

Use case **1** : _Create Account_
Primary actor: User
Description: The user can create a new account on the Weather Forecast app by providing necessary information such as username, password, email, and other optional details.
Pre-condition: Website is accesible and user has a stable internet connection
Post-condition: A new account has been created

Main scenario:
The user navigates to the Weather forecast page and clicks on "Register new account". He the inputs the information, filling out all the required fields like user name, password and the optional fields like email address phone number. He Submits all the information provided and our system validates the input data to see if his login details are unique. Upon successful validation an account is created and stored within the database.

Extensions: The email is already registered(Existing account) or an incorrect password was typed, displaying an error message. The user is prompted to enter a different email address or select 'forget password' to recover their password.The user may not have filled out the required information, causing an error message prompting the user to fill in those input boxes. The user might have entered a weak password, causing the system to ask the user to enter a stronger one.
