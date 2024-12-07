<!-- dashboard.jsp -->
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>
<%
    session = request.getSession(false);
    String username = null;
    if (session != null) {
        username = (String) session.getAttribute("username");
    }
%>
<!DOCTYPE html> <!-- Declares the document type and version of HTML -->
<html lang="en"> <!--Serves as the root element of an HTML document and declares primary language as english -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!--Ensures page scales correctly depending on different designs -->
  <title>Dashboard</title>
  <link rel="stylesheet" href="dashboard.css"> <!-- Link to the external CSS file -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><!-- Link to an external icon library (Font Awesome for icons) -->
</head>
<body>

  <!-- Header Section -->

  <header class="header"> <!-- Typically containing navigational elements and branding-->
    <div class="header-left">
      <i class="fas fa-bars menu-icon" id="menu-icon"></i> <!-- Sidebar Toggle Icon used a lot with icons, setting id as menu-icon to attach event listeners to it-->
    </div>
    <h1>Welcome to your dashboard, <%= (username != null) ? username : "Guest" %>!</h1>
    <div class="header-right">
      <img src="Images/Profile picture.jpg" alt="Profile" class="profile-logo" id="profile-logo"> <!-- Profile Logo, note: Class is for styling, id is for event listeners -->
      <!-- Dropdown Menu -->
      <div class="dropdown-menu" id="dropdown-menu">
        <a href="#">Profile</a>
        <a href="#">Settings</a> <!-- Placeholder links as not decided what the profile icon should contain -->
        <a href="../logout.jsp">Logout</a>
      </div>
    </div>
  </header>

  <!-- Sidebar Section -->
  <aside class="sidebar" id="sidebar"> <!-- Defines the sidebar section and indicates that it is still part of the main page-->
    <nav class="sidebar-nav">                               
      <a href="../weather.html" class="sidebar-link">Home</a> <!--'../' Takes us to parent directory--><!--'<a>' tag is used for hyperlink, hence we will use the home button to navigate to the weather page-->
      <a href="#" class="sidebar-link" id="toggle-dark-mode">  
        <span id="dark-mode-text">Dark Mode</span> <!-- To color the text "Dark mode" -->  
        <i class="fas fa-moon" id="dark-mode-icon"></i> <!-- Icon tag for the dark mode button -->
      </a>
      <a href="#" class="sidebar-link">Reports</a>
      <a href="#" class="sidebar-link">Settings</a>
    </nav>
  </aside>

  <!-- Main Content Area -->
  <main class="main-content">
    <!-- Add your main dashboard content here -->
    <p>Favourite lists</p>
  </main>

  <!-- Link to the external JavaScript file -->
  <script src="dashboard.js"></script>
</body>
</html>
