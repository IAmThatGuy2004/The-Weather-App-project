# Description of the Weather Forecast app usecase model

Use case **1** : _Create Account_
Primary actor: User
Description: The user can create a new account on the Weather Forecast app by providing necessary information such as username, password, email, and other optional details.
Pre-condition: Website is accesible and user has a stable internet connection
Post-condition: A new account has been created

Main scenario:
The user navigates to the Weather forecast page and clicks on "Register new account". He the inputs the information, filling out all the required fields like user name, password and the optional fields like email address phone number. He Submits all the information provided and our system validates the input data to see if his login details are unique. Upon successful validation an account is created and stored within the database.

Extensions: The email is already registered(Existing account) or an incorrect password was typed, displaying an error message. The user is prompted to enter a different email address or select 'forget password' to recover their password.The user may not have filled out the required information, causing an error message prompting the user to fill in those input boxes. The user might have entered a weak password, causing the system to ask the user to enter a stronger one.


Use case **2** : _Log In_
Primary actor: User
Description: The user can log into the Weather forecast page by providing their registered credentials (username/email and password). Successful authentication grants the user access to their personalized dashboard, where they can view and manage weather information, favorite locations, and shared dashboards.
Pre-condition: The user has an existing account.
Post-condition: The user is successfully authenticated and logged into the app and redirected to their personalzied dashboard.

Main scenario:
The User naviagates to the  login page, inputs their registered credentials into the respective input fields. Clicks 
the login button.The system verifies that the entered credentials match an existing account in the database.
The user is redirected to their personalized dashboard, where they can access weather forecasts, manage favorite locations, and utilize other personalized features.


Extensions: If the User has entered an invalid username/password the system would display an error message stating: "Invalid Username/password"
The user is then prompted to re-enter their credentials or use the "Forgot Password" to recover their account.
The user could also have missind conditions(Not enetred password) which also displays an error message 


Use case **3** : _Log out_
Primary actor: User
Description: The user can securely log out of the Weather Forecast app, terminating their active session. 
Pre-condition: The user is currently logged into the Weather Forecast app.
Post-condition: The user's session is terminated and is redirected to the home/log-In page

Main scenario:
The User selects the "Logout" option. The system prompts the user to confirm their intention to Logout
to prevent accidental logouts. Then the system ends the session and clears out the data stored on the client-side(Cookies/Local Storage entries)
The user is then redirected to the login/home page.

Extensions: If the Users session has expired due to inactivity, the User will automatically be logged out.

Use case **4** : _Dashboard_
Primary actor: User
Description: The user can access their personalized dashboard within the Weather Forecast app to view current weather information, a 5-day forecast, and their saved favorite locations.
Users can interact with the dashboard to navigate to other functionalities such as editing their dashboard, sharing it with others, or configuring display options.
Pre-condition: The user is successfully logged into the Weather Forecast app and the dashboard page is accesible.
Post-condition: The user views the most recent weather data and forecasts on their dashboard,any updates or changes made through the dashboard interactions are reflected in real-time.
Main scenario: The User selects the "Dashboard" option from the app's main menu and is redirected to it.
The dashboard will display the current weather for the users default/favourited location.
The User would also be able to view the 5 day-forecast for the selected location. The User can quickly acccess their favourtie locations 
which show all the data mentioned above. They can also share their dashboard with other people.

Extensions: No favourtie locations are saved, prompting the user to add one.


