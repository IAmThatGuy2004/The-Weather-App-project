# High-Level Summary

- The weather app will be a user-focused, **customizable platform** that offers **real-time weather data and a 5-day forecast** for any city worldwide. The application will enable users to **search for the weather of different cities by name**, allowing them to view each city’s current weather conditions and monitor upcoming weather patterns.
- Through an *in-app dashboard*, users will be able to **view their current geolocation weather and temperature** and access a personalized list of favorite cities. Users can **add cities to their favorites** by searching for them in the general search bar or through a custom "add city to favorites" button.
- Users will be able to **customize and select various display formats** such as *background color and theme, text fonts and size, style of displayed icons, moving information boxes, and potentially icon animation*, for the dashboard and city weather display page. With such customizability, users can share their creative dashboards with others by sharing their account (***up for debate on how to share accounts; options include searching by username or submitting customizability settings so others can replicate the dashboard -> (This will further be explored as the project development continues)***).
- The application integrates key software design patterns, such as Adapter, Singleton, and Facade, ensuring a smooth and adaptable interface with a public weather API, while Continuous Integration (CI) and automated testing promote reliability and performance.

# Requirements

### User Requirements

- **Account Management:** Users can create, delete, and edit account information.
- **Dashboard Customization:** Users can edit and customize their dashboards through display and theme changes, units and icon selections, receiving notifications, type of weather display, and more.
- **City Search and Selection:** Users can search for cities worldwide, check their weather info, and select them as favorites to add to a list. The favorite city list will also include a search bar for easier navigation.
- **Dashboard Sharing:** Users can share their dashboards with others.

### Functional Requirements

- **User Authentication:** The system must provide account management functionalities, including login, registration, and secure authentication through encryption of sensitive information during logins, account creation, and deletion.
- **Weather Data Retrieval:** The system must retrieve weather data from an external API and handle conditions such as location not found or data retrieval issues. Using the Adapter Pattern, the system will interact with the weather API, allowing future flexibility in switching providers.
- **Functioning Search Feature:** The system will have two well-functioning search bars to help users find desired cities. One main general search bar, easily accessible from the dashboard to browse and discover new cities, and a specialized search bar within the favorites list segment for easy searching of cities already added to the user's favorites list.
- **Weather Forecast:** Each city page will provide the current hour's temperature and weather, a 24-hour forecast in 1-hour intervals, and an average weather and temperature forecast for the following 5 days and  details of wind speed, UV index, visibility, and humidity for the current day. The dashboard and search views will show a short box with the current weather and temperature.
- **Identifying Users, Cities, and Dashboards:** Every user will have a unique username and incremental user ID. Each city will be identifiable by its name and unique ID, and each dashboard will be associated with its user, identifiable by display settings and the user's ID.

### Non-Functional Requirements

- **Performance:** Weather data retrieval will complete in under 2 seconds, with efficient data parsing and caching. The system architecture will support concurrency to handle multiple data requests without degradation.
- **Scalability:** API request handling must adapt to peak times without exceeding rate limits or affecting performance.
- **Usability and Accessibility:** The UI must be intuitive, with clear navigation, readable fonts, and accessible icons for weather conditions. Accessibility standards, such as WCAG, will be followed, including keyboard navigation, screen reader compatibility, and contrast settings.
- **Reliability:** The system must be consistently available, with fallbacks in case of weather API downtime. Error handling will provide feedback such as “Location not found” or “Weather data temporarily unavailable.”
- **Security and Data Privacy:** Sensitive data will be encrypted in transit and at rest, with secure password handling and token-based user authentication. Compliance with data privacy standards will ensure responsible management of user data.
- **Device Compatibility:** The application must be responsive and compatible with major browsers, enabling a seamless user experience.

### Design Patterns

- **Singleton Design:** The system will implement the Singleton Pattern to ensure a single instance of the API client handles all API requests efficiently. This design maintains centralized control over the API client, providing consistent behavior, resource efficiency, and enhanced security by managing authentication and configuration centrally.
- **Facade Pattern for Interface:** Using the Facade Pattern, the system will create a user-friendly weather application that offers various functionalities and information from complex subsystems. This approach creates a more intuitive and easily maintainable system.
- **Adapter Pattern:** With the Adapter Pattern, the weather app can integrate multiple APIs seamlessly by converting unique API data into a standardized format for ease of use and maintainability. This allows for an easy switch between APIs in case of issues or changes to the codebase in future updates.
- **CI/CD and Automated Testing:** The system will have automated tests covering core functionalities and use CI to streamline the deployment process.
