# Description of the Weather Forecast app usecase model

Use case **1** : _Create Account_

- Primary actor: User,Database
- Description: The user can create a new account on the Weather Forecast app by providing necessary information such as username, password, email, and other optional details.
- Pre-condition: Website is accesible and user has a stable internet connection
- Post-condition: A new account has been created

- Main scenario: The user navigates to the Weather forecast page and clicks on "Register new account". He the inputs the information, filling out all the required fields like user name, password and the optional fields like email address phone number. He Submits all the information provided and our system validates the input data to see if his login details are unique. Upon successful validation an account is created and stored within the database.
- Extensions: The email is already registered(Existing account) or the password format typed was incorrect, displaying an error message. The user is prompted to enter a different email address or select 'forget password' to recover their password.The user may not have filled out the required information, causing an error message prompting the user to fill in those input boxes. The user might have entered a weak password, causing the system to ask the user to enter a stronger one.

Use case **2** : _Log In_

- Primary actor: User,Database
- Description: The user can log into the Weather forecast page by providing their registered credentials (username/email and password). Successful authentication grants the user access to their personalized dashboard, where they can view and manage weather information, favorite locations, and shared dashboards.
- Pre-condition: The user has an existing account.
- Post-condition: The user is successfully authenticated and logged into the app and redirected to their personalzied dashboard.
- Main scenario: The User navigates to the login page, inputs their registered credentials into the respective input fields. Clicks the login button. The system then verfies that the entered credentials match an existing account in the database. The User is redirected to their personalized dashboard, where they can access weather forecasts, manage favourite locations and utilize other features.
- Extensions: If the User has entered an invalid username/password the system would display an error message stating: "Invalid Username/password" The user is then prompted to re-enter their credentials or use the "Forgot Password" to recover their account.

Use case **3** : _Log out_

- Primary actor: User,
- Description: The user can securely log out of the Weather Forecast app, terminating their active session.
- Pre-condition: The user is currently logged into the Weather Forecast app.
- Post-condition: The user's session is terminated and is redirected to the home/log-In page
- Main scenario:The User selects the "Logout" option. The system prompts the user to confirm their intention to Logout to prevent accidental logouts. Then the system ends the session and clears out the data stored on the client-side(Cookies/Local Storage entries) The user is then redirected to the login/home page.
- Extensions: If the Users session has expired due to inactivity, the User will automatically be logged out.

Use case **4** : _Update profile_

- Primary actor: User
- Description: The User can update their profile information within the Weather forecast app. This would include personal details like Username,email, Profile picture, preferences for weather data and notification settings.
- Pre-condition: The user is currently logged into the Weather Forecast app and the profile update page is accessible.
- Post-condition: The Users profile information is successfully updated in the system and the updated preferences are applied.
- Main scenario:The User navigates to the profile section of the Weather forecast app, typically accessible via a user icon or menu. The user selects the option to update their profile, which opens an interface containing various editable fields. The user updates personal details as he wishes, confirms the changes made by selecting the "Update Profile" button. The system validates the input and updates the Users profile in the database.
- Extensions: The User enters data that fails validation checks,

Use case **5.1** : _Edit Dashboard_

- Primary actor: User
- Description:The user can edit his dashboard and customize his dashboard with his own prefernce
- Pre-condition: The user is successfully logged into the Weather Forecast app and the dashboard page is accesible.
- Post-condition: Users Dashboard is updated with the new changes he made.
- Main scenario: The user selects the "edit dashboard" icon while on the dashboard. This allows the user to Edit items like add new metrics to be tracked and move these metrics around in a format suitable for him
- Extensions: No locations/metrics are saved, prompting the user to add some to the dashboard before editing it.

Use case **5.2** : _Share Dashboard_

- Primary actor: User,Shared User
- Description:The user can share his dashboard with other users using the Weather forecast app.
- Pre-condition: The User has a friend.
- Post-condition: The Users dashboard is viewable by his friend.
- Main scenario: The User clicks the "Share" icon located on the dashboard. This opens a subwindow which shows a list of the Users friends who are also using the app. The User can select the "share" button/icon next to friends name of who he wants to share his dashboard to.
- Extensions: The User has no friends. System prompts the User to add friends.

Use case **5.3** : _Favourite locations_

- Primary actor: User
- Description: The User can manage his favourite cities list.
- Pre-condition: The User is logged into the Weather forecast application.
- Post-condition: The User can view the changes made to their favourite cities list.
- Main scenario: The User clicks the "Manage dashboard" button and then proceeds to click on the "Manage favourites list". This will allow the User to manage his current favourite list by deleting or arranging them as needed.
- Extensions: The has no favourtie locations hence cannot manage them.

Use case **6/7** : _Search by city & Display Weather info_

- Primary actor: User, Public weather API,Database
- Description:The User can search for current weather information or a 5-day forecast by searching the city name. The User can add that city to their favourites if they wish.
- Pre-condition: The user is successfully logged in
- Post-condition: The current weather/5-day forecast for the searched city are displayed to the user.
- Main scenario: The user navigates to the search bar, typically located on the dashboard and enters the name of the city they wish to search.After entering the city name, the user submits the search query by clicking search or hitting the 'Enter' key.The system checks that the input is not empty and verifies if the city actually exists. The system sends a request to the public API for the current weather and 5-day forecastof the specified city. The processed data is displayed to the user in a format that shows both current weather and a 5-day forecast.
- Extensions:The city is not found due to the city not existing or an incorrect spelling.

Use case **8** : _Change display format_

- Primary actor: User
- Description:The User can customize how weather data is displayed within the Weather forecast app. The includes choosing degrees/Fahrenheit as the unit of measurement. Selecting themes like light/dark mode. Selecting the different data that is to be presented like temperature wind speed, amount of precipitation etc. - Pre-condition:The user is logged in and is on a page where display settings can be accessed.
- Post-condition: The Users display preferences are updated and saved in their profile. The weather data throughout the app is presented according to the new display settings
- Main scenario: The User accesses the display settings by navigating to the settings menu within the app. Then selects the option to change the display format, this opens an interface containing various customization settings. The User then makes the adjustments he wants to based on his preference. The User saves the updated display settings by clicking the "Save", "Apply" buttons. The system saves the preferences to the profile and updates the apps interface to reflect the changes.
- Extensions: The User selects and unsupported or incompatible display format option. The system highlights the invaalid selection and displays an error message.
