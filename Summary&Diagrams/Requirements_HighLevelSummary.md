
# High Level Summary

- The weather app will be a user-focused, **customizable platform** that offers **real-time weather data and a 5-day forecast** for any city worldwide. The application will enable users to **search for the weather of different cities by name**, allowing users to view the cities' current weather conditions, and monitor upcoming weather patterns.
- Through an *in app dashboard* users will be able to **view their current geolocation weather and temperature**, access a personalized list of favourite cities to view. Users will be able to **add cities of their liking into their list of favourite** by searching for them in the general search bar or through a custom add city to favourites button
- Users will be able to **customize and select various display formats** such as *backround colour and theme, text fonts and size, style of displayed icons , moving information box around and even potentialy icon animation*, of the dashboard and cities weather display page. With such customizibility, users will be able to share their creative dashboards with other users by sending their account (***up for debate how to share account, we can make it like a search for username, or submiting custimisibility settings so other users can replicate and view on their end...***)
- The application integrates key software design patterns—Adapter, Singleton, and Facade—ensuring a smooth and adaptable interface with a public weather API, while Continuous Integration (CI) and automated testing promote reliability and performance.


# Requirements

### USER Requirements

- **Account Management:** Users will be able to Create, Delete, and Edit account information
- **Dashboard Customization:** Users can edit and cutomize their respective dashboards trhough display and theme changes, units and icon selections, recieving notifications and type of, and more...
- **City search and selection:** Users will be able to search for different worldwide cities and check their weather info as well as select them as their favourite to add them to a list they can later check, The favourite city list should also contain a search bar for more ease of use.
- **Dashboard Sharing:**: User can share their dashboards with other users 

### FUNCTIONAL Requirements

- **User Authentication:** The system must provide account management functionalities, including login, registration, and secure user authentication through encryption of sensitive information during log-ins, account creation and deletion.
- **Weather Data Retrieval:** The system must retrieve weather data from an external API and handle various conditions such as location not found or data retrieval issues. Through the use of the Adapter design Pattern, the system will be able to interact with the weather API, allowing future flexibility in switching API providers.
- **Functioning search feature:** The system will have 2 well functioning search bar that help users to find wanted cities. One main general search bar that iss easily accessed fro dashboard to browse and discover new cities, while a more specialised search bar resides in the favourite list segment , allowing for easy searching of cities within an already exisitng lit of favourite cities selected by user.
- **Weather forecast:** Within every city page the system will provide the temperature and weather of the current hour, the temp & Weather of the next 24 hours in interval of 1 hours. and the expected average weather and temperature of the following 5 days of said city.***(We can include detailed info of wind speed, UV index,Visibility and humidiy of the current day)***. While on the dashboard and search the system will only have a short box to showcase the current weather and temperature of the viewable city.
- **Identifying users and cities & dashboards:** Every user will be identifiable by their username and unique incremental userId, Every city will be recognizable by city name and unique ID. Every Dashboard will be dependent on their user , the dashboard will be identifiable by their display settings, User's ID.


### NON-FUNCTIONAL Requirements

- **Performance:** Weather data retrieval should complete in under 2 seconds, using efficient data parsing and caching where possible. System architecture should support concurrency to handle multiple data requests without performance degradation.

- **Scalability:** API request handling should adapt to peak times without exceeding rate limits or affecting performance.


- **Usability and Accessibility:** The UI should be intuitive, with clear navigation, readable fonts, and accessible icons representing weather conditions. Accessibility standards such as WCAG will be followed, including keyboard navigation, screen reader compatibility, and contrast settings.

- **Reliability:** The system must be constantly available and running, with fallbacks in case the weather API is down. Error handling will be in place to provide meaningful feedback if issues arise, such as “Location not found” or “Weather data temporarily unavailable.”

- **Security and Data Privacy:** Sensitive data will be encrypted in transit and at rest, with secure password handling and token-based user authentication. Compliance with data privacy conventions will ensure user data is managed responsibly.

- **Device Compatibility:** The application should be responsive and compatible with major browsers ***(and maybe mobile devices)***. Mobile optimization will support compact layout adaptations, enabling seamless user experience across various screen sizes.



### Design Patterns:
- **Singleton design:** The system will implement the Singleton Pattern to ensure that a single instance of the API client is created for handling all API requests efficiently. This design will maintain centralized control over the API client, allowing for consistent behavior and state management. It provides a global access point to the API data, ensuring optimal efficiency in resource usage and enhanced security by managing authentication and configuration in a single location.
- **Facade pattern for interface:** Using the facade pattern the system will produce an easy use weather application that offers many different funnctionalities and information by the many different complex subsystems that will be used to develop all the different component of the application system. Creating a more intuitive system with easier maintianibility.



CI/CD and Automated Testing: The system should have automated tests covering core functionalities and implement CI to streamline the deployment process.