<!-- dashboard.jsp -->
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%
    session = request.getSession(false);
    String username = null;
    int userId =0 ;
    if (session != null) {
        username = (String) session.getAttribute("username");
        Object userIdObj = session.getAttribute("UserId");
        
        if (userIdObj instanceof Integer) {
            userId = (Integer) userIdObj;
        } else if (userIdObj instanceof String) {
            try {
                userId = Integer.parseInt((String) userIdObj);
            } catch (NumberFormatException e) {
                e.printStackTrace();
                out.println("<p>Error: Invalid UserId format.</p>");
            }
          }
    }
%>

<%
    List<String> favouriteLocations = new ArrayList<>();
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    
    try {
        // Load the SQL Server JDBC driver
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        
        // Establish the connection
        String dbURL = "jdbc:sqlserver://cosc310_sqlserver:1433;databaseName=Users;TrustServerCertificate=True";
        String dbUser = "sa"; // Replace with your DB username
        String dbPassword = "310#sa#pw"; // Replace with your DB password

        conn = DriverManager.getConnection(dbURL, dbUser, dbPassword);


        
        // Prepare the SQL query
        String sql = "SELECT FavouriteLocation FROM FavouriteLocation WHERE UserId = ?";
        pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, userId);
        
        // Execute the query
        rs = pstmt.executeQuery();
        
        // Iterate through the result set and add locations to the list
        while (rs.next()) {
            String location = rs.getString("FavouriteLocation");
            favouriteLocations.add(location);
        }
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
        out.println("<p>Error: Unable to load JDBC Driver.</p>");
    } catch (SQLException e) {
        e.printStackTrace();
        out.println("<p>Error: Database access error.</p>");
    } finally {
        // Close resources in reverse order of their opening
        if (rs != null) try { rs.close(); } catch (SQLException ignore) {}
        if (pstmt != null) try { pstmt.close(); } catch (SQLException ignore) {}
        if (conn != null) try { conn.close(); } catch (SQLException ignore) {}
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
        <a href="logout.jsp">Logout</a>
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
    <h2>Your Favourite Locations</h2>
        <ul id="favourite-lists">
            <% 
                if (favouriteLocations.isEmpty()) { 
            %>
                <li>No favourite locations found.</li>
            <% 
                } else { 
                    for(String location : favouriteLocations) { 
            %>
                <li><%= location %></li>
            <% 
                    } 
                } 
            %>
        </ul>
  </main>

  <!-- Link to the external JavaScript file -->
  <script src="dashboard.js"></script>
</body>
</html>
