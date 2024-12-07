
# Final Review of Team JA^2M Project: Weather App

***LINK TO YOUTUBE VIDEO PRESENTATION:*** https://youtu.be/_TUGzFgXBxM?si=cIYxh_UA4U9FLaDo

## General Development

### Project Overview  
The team developed a **Weather App** with the following key features:

- **Weather Page**:
  - Displays comprehensive weather data, including:
    1. Current weather with temperature, description, and location.
    2. 24-hour forecast with hourly temperature, weather icons, wind speed, and direction.
    3. 5-day forecast with daily min/max temperatures and average weather description (with icons).
    4. Highlights for the current day:
       - **AQI** (Air Quality Index), pollutant levels, and descriptions.
       - **Sunrise/Sunset Times**.
       - *Humidity*, *pressure*, *visibility*, and *"feels like" temperature*.  
    5. A button to return to the current/default location's weather.  
    6. A "Favorite Cities" button to save frequently viewed locations (partially implemented).  
    7. An icon button for accessing the dashboard or login page.

- **Login and Registration**:
  - **Login Page**:
    1. Username and password input with data validation.
    2. Buttons to log in, register, or recover lost passwords.
    3. Automatic redirection to the dashboard if already logged in.
  - **Registration Page**:
    4. Input fields for username, email, password, confirmation, and age.
    5. Data validation ensures proper format and checks for duplicate accounts.

- **Dashboard**:
  - A clean and user-friendly interface featuring:
    1. Header welcoming the user.
    2. Functional menu sidebar.
    3. Buttons for dark/light mode toggling, logging out, and returning to the weather page.

---
### Feature Status

- **Fully Implemented**:
  1. **Functional Weather Page**:
     - Displays detailed weather data for the current day, including:
       - Current temperature, weather description, and location.
       - Hourly temperature and weather icons for the next 24 hours.
       - Wind speed and direction updated hourly.
     - Provides 5-day forecasts with daily minimum/maximum temperatures and average weather icons.
     - Highlights for the current day, such as:
       - *Air Quality Index (AQI)* with pollutant levels and descriptions.
       - *Sunrise and sunset times*.
       - *Humidity, pressure, visibility,* and *"feels like" temperature.*
     - Dynamic search bar updates weather data based on user-selected cities.
     - Buttons to return to the current/default location weather and access the dashboard.

  2. **Login and Registration Systems**:
     - **Login Page**:
       - Validates username and password for existing accounts.
       - Redirects users to the dashboard upon successful login.
       - Features buttons to register or recover.
       - Includes clean and intuitive UI.
     - **Registration Page**:
       - Collects user details (username, email, password, password confirmation, age) and validates entries.
       - Ensures duplicate accounts are not created.
       - Features an easy-to-use design with seamless navigation between login and registration.

  3. **Interactive Dashboard**:
     - Welcomes users with a personalized header.
     - Features a functional sidebar menu with navigation buttons to:
       - Toggle between dark and light modes.
       - Log out.
       - Return to the weather page.
     - Provides a user-friendly and visually appealing interface.

- **Partially Implemented**:
  1. **Favoriting Cities**:
     - A "Favorite" button exists on the weather page.
     - Current functionality allows users to select cities for favoriting, but:
       - Selected favorites are not stored in the database.
       - Retrieval of favorited cities for display on the dashboard is incomplete.
     - Future plans include integrating database functionality to fully implement this feature.
   2. **lost passwords button**

- **Missing**:
  1. **Sharing Dashboard**:
     - This feature was not implemented due to:
       - Unclear requirements regarding its purpose, expected functionality, and approach.
       - Dependencies on the completion of the favoriting cities for potential integration.
     - No progress was made on this feature, and its inclusion is deferred for future consideration if clarified.

---

## System Architecture and Design

### Architecture
- **Type**: *Modular Monolithic* 
  - The application is a single cohesive system, divided into logical modules/classes, each with specific roles and functions. This ensures reusability and separation of concerns while maintaining simplicity in deployment and intrpritibility.

- **Technologies Used**:
  - **Front-End**: Vanilla *CSS* and *HTML* for styling and UI.  
  - **Logic**: Vanilla *JavaScript* for API calls, data formatting, and dynamic HTML updates.  
  - **Back-End**: *Java (JDBC/JSP)* for database communication and querying.  
  - **Testing**: 
    - *Node.js Vitest* for automated batch testing of `.test.js` files.
    - *JUnit* for testing Java JDBC functions.

### Design Patterns
1. **Facade Pattern**:  
   - Simplify interactions between modules (e.g., a single class managing API calls and delegating to the right functions) which then sends the valid data to be used accordingly
2. **Single Responsibility Principle (SRP)**:
   - Each class/module is dedicated to a single task (e.g., API handling, data formatting, UI updates).  
3. **Model-View-Controller (MVC)**:
   - On the weather app side, we have the 3 components with 1 module manages/handles the data calling and retrival, another one manages the dynamic display of the information, while we have a route module that will control the flow of the infor mation accordingly.

---

## Reusability
- **Reusable Components**:
  - Modules and functions were designed for reuse in other projects with minimal modifications.
  - Example: API handlers, data formatting utilities, and UI modules can be easily adapted.  
- **Current Utilization**:
  - Reusability principles improved code maintainability and structure but weren’t heavily leveraged during this project.

---

## Backlog
- **Remaining Tasks**:
  1. Complete the *favoriting cities* feature:
     - querying element favorited to databse to calling it and dsiaplying it on dahsboard
  2. Implement the *sharing dashboard* feature:
     - Currently deprioritized due to unclear requirements & depedency on othe rincomplete features.

- **Future Plans**:
  - The team plans to complete the favoriting feature post-project but may not pursue the sharing feature.

---

## Testing
- **Strategies**:
  - **JavaScript**: Unit testing for data formatting functions using *Node.js Vitest*.  
  - **Java**: Unit testing for JDBC functions using *JUnit*.

- **Automation**:
  - JavaScript testing is semi-automated via Vitest, though CI integration is missing *(CI was attempted but failed)*.
  - Java tests require manual execution.

- **Improvements**:
  - In Future projects we hope to prioritize *Continuous testing* by researching how to implement CI first and making it a main priority before starting project to make it easier to maintain and check testing for future projects.

---

## Branching Workflow
- **Strategy**:
 - At first *feature branching*, for every different feature or component of the system we had a "main branch for that specific feature or component" then made new branches from that new main to develop sub features or new implementations for it 

 - later on when the project was almost done we transfered to *release branching* where we would have a main branch where all new features branch off will merge back to to create current release update 

- once project was complete only then was everything retuned to true main 

- **Code Reviews**:
- The *review process'* were good, at first we weren't as strict as it was more general and simple tasks being implemented and completed but as progress was made , there was an empahasis on always having 2 reviewers, and as project developed *pr* request and reviews became better, more structured and constructive 

- The *pr system* allowed for better sharing of developemnt process and keeping up to date with system and different coding part in an pro active manner such that all the team understood other memebers work at all times 

---

## Deployment and Dockerization
- **Current Status**:
  - The project is currently only deployable on local machines via live server or other approaches of sort what is required to fully deployable it would be to find a hosting server such as digital ocean or amazon hosting , once docker file and front end are put there it will work accrodingly.

- **Dockerization**:
  - The software is fully Docker-ready and partially Dockerized, ranging between *multi-service and full-application Dockerization*. The *MSSQL* logic, along with the *database and its underlying functionalities*, are containerized to facilitate server-database communication. As long as the Docker container is running, all updates, deletions, and insertions made via the web page are persisted within the container. However, upon restarting the container, the database resets, and all previous data is cleared, starting with a fresh state.

- **Future Deployment**:
  - Hosting on **DigitalOcean** or **AWS** is required for full deployment.

---

## Project Management
- **Methodology**: **Kanban** via GitHub.  
- **Workflow**:
  - Issues were categorized and prioritized numericaly. 
    -  Issues were managed via order list from most fundamental or important to dependent tasks or least importance
  - Each team member managed their assigned tasks.

- **Challenges**:
  - Challenges persist in the *inter-team communication* departement. To address this, 
- **Improvements**:
  - Changes in methodology should prioritize increased **pair programming** and **more frequent group meetings** to ensure all team members are aligned and tracking progress effectively. 
  - Additionally, implementing more **focused deadlines** can improve performance and help ensure all features are completed on time.


---

## Effort Estimation
- The project took significantly more time than expected due to steep learning curves:
  1. **CSS/HTML**: Required for UI development.
  2. **API Logic and Communication**: Learning to handle APIs effectively.  
  3. **Docker**: Researching and implementing Dockerized environments.  
  4. **Apache Tomcat**: Configuring and using web servlets with Java.

- These Difficulties mostly rose up due to the lack of experience and former interaction with these concpet and tools previous to this project.

---

## Unique Achievements
- **Major Highlights**:
  - Our biggest highlight was finally getting Docker up and running—it was an enigma for the longest time, so achieving this felt incredible.
  - We're also particularly proud of our UI. As new CSS and HTML coders, we put in a lot of effort and skill to refine it into its current form, which feels like a significant accomplishment.
- **Learning Moments**:
  - Gained expertise in Docker, web API handling, and cross-platform development, and all around web and application development expereince even if minimal

---

## Role of AI
- **Usage**:
  - =AI played a significant role in our success, assisting in various aspects of development. It supported Docker commands and troubleshooting, helped with code formatting, bug detection, and bug fixes, and even generated some code where needed *(if code was redundant, or trouble personaly configuring)* as well as logic support. 
  - AI was also instrumental in constructive pull request (PR) formatting, helping us better understand the structure and presentation of PRs. 
  - Additionally, it aided in documentation formatting and review. 
  

- **Impact**:
  - Overall, AI proved to be an invaluable tool, accelerating the development process remarkably when approached with well-crafted, detailed queries. Its efficiency and usefulness continue to fascinate us.

---


