# **Weather App Project - Milestone 6 Dashboard Summary**

## **Tasks Completed (by Owner)**
- **Jimi**: 
  - Registration page testing
- **Mandira**: 
  - Log-in page testing and connection to back-end 
- **Ali**: 
  -  Chanegs to wetaher.html file to gain info from API
- **Aliasgar**:
  - Dashboard page and connecting features
  
## **Progress Relative to Requirements**
- The project is **approximately 80% complete**, with a few objectives for this milestone not fully met. 

- **Completed Tasks**:
  - Add weather information using API to complete weather layout
  - completion of layout of dashbaord page and connectino to other features
  - Dark mode features added in daashboard
  - backend connection to the log in and registration window using JSP
  - Testing to ensure retrievals for format, weather and dates are correct
  - Ensure containers and packages are set up correctky using Dockerization
    

- **Pending Tasks**:
  - adding favourite lists to the dashboard page
  - implement share dashboard with other users
  - Ensure docker-compose file is configured to work on all platforms
  - ensure correct addition of user to database using register.jsp page

### **Next Milestone Plan - Registration Finalization and Application Integration**

**Objective:**
The focus for this milestone will be to fully integrate the user registration. Additionally, we will complete the dashboard by adding favourite lists, links to weather information and full integration of all features.

#### **Connecting Registration, Login, and Dashboard:**

- **User Authentication Process:**
  - The registration and login pages will be linked to a session-based system that keeps the user logged in throughout their session. This will be achieved using a session cookie or JWT token for maintaining login state across pages.
  - Upon successful login, users will be directed to their personalized dashboard page, where they can view their profile and other user-specific data.
  - If the user logs out, they will be redirected back to the city search page, and the session will be invalidated, ensuring the user is no longer considered logged in.

#### **Dashboard Web Page:**
- The dashboard page will be created to display the user's personal information (e.g., username, email, etc.). This will be fetched from the database after the user logs in.
- The page must be **fully functional**, with a responsive layout that adapts to different screen sizes.
- The dashboard will also display a list of the **user's favorite cities**, retrieved from the database based on the logged-in user’s ID. Each city in the list will be clickable, allowing the user to view the weather details for that city.

#### **Dashboard Features:**
- **Logout Button:** 
  - A button will be added to the dashboard, allowing users to log out. Clicking this button will destroy the session and return the user to the city search page.
- **Menu Bar for Layout Customization:**
  - The dashboard will feature a menu bar with options to change the layout or appearance of the page (e.g., switching between a light/dark theme, changing font size, or rearranging sections of the dashboard).
- **Active User Validation:**
  - During the user session, the login status will be validated on each page, ensuring that if the user is logged out or the session has expired, they will be redirected to the login page. This will prevent unauthorized access to the dashboard.
  
#### **City Window and Add to Favorites:**
- In the city weather window, a new button will be added to allow users to **add a city to their favorites**.
  - When the button is clicked, the system will:
    1. Retrieve the name of the city currently displayed in the weather window.
    2. Send an **INSERT query** to the backend database to associate this city with the logged-in user, adding it to their list of favorites.
    3. The database will store the user’s ID and the city’s name in a table that links users to their favorite cities.
  - This functionality will be implemented in the backend to ensure that only logged-in users can add cities to their list of favorites.

#### **Implementation Details:**
- **Backend Integration:**
  - Upon user login, a session will be established on the backend to verify the user’s identity. This session will be carried across all pages, including the dashboard, ensuring that the user is authenticated before accessing personal data or making changes to their favorite cities list.
  - When the user adds a city to their favorites, the backend will handle the request by inserting the city into the database under the correct user ID, ensuring that the user's favorites are securely updated.

By the end of this milestone, the user registration, login, dashboard, and city favorites functionality will be seamlessly integrated, providing a smooth user experience.

## **Process Reflection**
- The team is using **Kanban** for task management via the GitHub project board. 
- **Positives**:
  - Tasks are flowing smoothly, and each member is responsible for their workload.
  - No **merging conflicts** have been encountered.
- **Challenges**:
  - **Communication issues** due to members being busy with various responsibilities outside the project.
  - The project pace has not met expectations, as not all objectives were completed.

## **Testing and Quality Assurance**
- **Current Status**:
  - All completed tests have passed.
  - No new tests have been created.

- **Next Steps for Testing**:
  - Ensure that registration of users works as expected innext implementatioin.
  - Perform regression tests 

## **Release Candidate**
- **Status**:
  - Will present in class. Current flow is from login -> dashboard -> weather but may be changed in the future.

---

### List of branches:

- WEB_DEV-FrontEnd
- connect-Dashboard-to-Weather
- registration-testing-and-backend
- DB-change(MSSQL)
- test-for-weather
- Dashboard
- Dashboard-NightMode

[file containing link to view prototype on Figma](prototype-link.md)  
[file containing wanted development flow](Development-flow.md)  
[folder containing progress of front end, so far only main page](Web-content)  



