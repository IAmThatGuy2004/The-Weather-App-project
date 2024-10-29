# Project Description: Web-based Weather Application
## The document below outlines the goals and features to be implemented. This document also includes assumptions, constraints and requirements associated with the project.  

The goal of the site in simple terms is to provide an application which can display and share weather based on a user-inputted location. 
The application has a user database and users have login credentials. 
The user will be able to view their dashboard and change the way their info is displayed within the application.

### User Details

**Login Details:**
- The user will be prompted with a login screen upon opening the application.
- If the user, does not already have an account they will have the option to create one.
- They will be prompted to input information such as email, name and password.
- Other information such as phone number will be optional.
- If the given account details are invalid for creation such as email, display an error message.
- If the given information for login is incorrect, display an error message to the user.
  

### Display

*Question for group 1:* How can our application be accesed by a user not logged in. Walled off, or location able to be viewed without customization or ability to share information.

*Question for group 2:* Will we take in user's location through any geolocation methods?

**Features:**

- The user will be greeted with a dashboard upon login, the dashboard will be set to favourite location if one is set in user's account. 
- The dashboard will display the current weather in said location. If no favourite location is entered, the user can input a city throughout the world. 
- The dashboard will then display that city's current forecast and conditions. An option will be visible (a star) which adds the location to a list of user favourited cities.
- The user has the option to expand the 5-day forecast to see more information for each day and their conditions
- The user will be able to change the current info displayed to the screen
- The dashboard can be edited to display information in various orders or remove some other forecasts 
- The user can switch from dashboard display to a list of saved, favourited locations
- In the favourites tab, the list can be managed allowing the user to delete and add any locations to the list.
  

**Contraints:**
- Stable network is required for real-time data updates.
- The application should work smoothly across various devices and browsers
- Their may be limits on the data provided by the third-party APIs

**Requirements:**
- The front-end will be developed using React.js, HTML and CSS.
- The back end will use Java to handle accounts.
- The database will be relational and SQL based to store user preferences and location history.
- Users should be able to set their preferred setting. Includes changing units between Metric and Imperial.
