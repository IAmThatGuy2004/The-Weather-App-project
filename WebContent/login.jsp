<%@ page import="java.sql.*" %>
<%@ page import="java.util.Scanner" %>
<%@ page import="java.io.File" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>

<%
    boolean showInvalidLoginMessage = false;

    // Database connection details
    String dbName = "Users";
    String url = "jdbc:sqlserver://cosc310_sqlserver:1433;DatabaseName=" + dbName + ";TrustServerCertificate=True";
    String uid = "sa";
    String pw = "310#sa#pw";

    // Load driver class
    try {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
    } catch (ClassNotFoundException e) {
        throw new SQLException("ClassNotFoundException: " + e);
    }

    // Check if the database and tables exist
boolean dbInitialized = false;
try (Connection connCheck = DriverManager.getConnection(url, uid, pw)) {
    DatabaseMetaData dbMeta = connCheck.getMetaData();

    // Specify the schema and use the table name without square brackets
    ResultSet rs = dbMeta.getTables(null, "dbo", "User", null);
    if (rs.next()) {
        dbInitialized = true; // Table exists
    }
    rs.close();
} catch (SQLException e) {
    // Database might not exist; proceed to create it
    dbInitialized = false;
}

// Initialize database if not already done
if (!dbInitialized) {
    // Connect to master database to create Users database
    String masterUrl = "jdbc:sqlserver://cosc310_sqlserver:1433;DatabaseName=master;TrustServerCertificate=True";
    try (Connection connMaster = DriverManager.getConnection(masterUrl, uid, pw);
         Statement stmtMaster = connMaster.createStatement()) {

        // Create Users database if it doesn't exist
        String createDbSQL = "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'" + dbName + "') BEGIN CREATE DATABASE [" + dbName + "]; END";
        stmtMaster.execute(createDbSQL);

    } catch (SQLException e) {
        e.printStackTrace();
    }

    // Now connect to Users database and run DDL script
    try (Connection connUsers = DriverManager.getConnection(url, uid, pw);
         Statement stmtUsers = connUsers.createStatement()) {

        // Path to your DDL file
        String fileName = "/usr/local/tomcat/webapps/WeatherApp/ddl/SQLServer_weatherdb.ddl";

        // Read the DDL file content
        Scanner scanner = new Scanner(new File(fileName));
        scanner.useDelimiter("(?i)\\bGO\\b"); // Use regex to split on 'GO', case-insensitive

        while (scanner.hasNext()) {
            String command = scanner.next();
            command = command.trim();

            if (command.isEmpty()) {
                continue;
            }

            try {
                stmtUsers.execute(command);
            } catch (SQLException e) {
                // Ignore errors about objects already existing
                String message = e.getMessage();
                if (message.contains("already exists")) {
                    // Object already exists, ignore error
                } else {
                    // Output the error message for debugging
                    out.println("Error executing command:<br>");
                    out.println("<pre>" + command + "</pre><br>");
                    out.println("SQLException: " + e.getMessage() + "<br><br>");
                }
            }
        }
        scanner.close();

    } catch (Exception e) {
        e.printStackTrace();
        out.print("An error occurred during database initialization: " + e.getMessage());
    }
}

    // Check if the user is already logged in
    session = request.getSession();
    Boolean isLoggedIn = (Boolean) session.getAttribute("isLoggedIn");
    if (isLoggedIn != null && isLoggedIn) {
        response.sendRedirect("Dashboard/dashboard.jsp");
        return;
    }

    if (request.getMethod().equalsIgnoreCase("POST")) {

        // Retrieve username and password from the form
        String identifier = request.getParameter("username");
        String password = request.getParameter("password");

        boolean isValidUser = false;

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the Users database
            connection = DriverManager.getConnection(url, uid, pw);

            // Query to validate user
            String query = "SELECT * FROM [User] WHERE (Username = ? OR Email = ?) AND [Password] = ?";
            preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, identifier);     // identifier is username
            preparedStatement.setString(2, identifier);     // identifier is email
            preparedStatement.setString(3, password);

            resultSet = preparedStatement.executeQuery();

            // Check if user exists
            if (resultSet.next()) {
                isValidUser = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Optionally, you can set an error message here if a database error occurs
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (isValidUser) {
            // Create a session and set the username
            session = request.getSession();
            session.setAttribute("username", identifier);
            session.setAttribute("isLoggedIn", true);

            // Redirect to weather.html
            response.sendRedirect("Dashboard/dashboard.jsp");
            return; // Stop further processing
        } else {
            showInvalidLoginMessage = true;
            session.setAttribute("isLoggedIn", false);
            // The form will be displayed again with the error message
        }
    } // End of POST processing
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login Page</title>
  <!-- Imported External CSS File -->
  <link rel="stylesheet" href="login.css">
</head>
<body>
  <div class="login-container">
    <form class="login-form" method="post" action="login.jsp">
      <h2>Log into JA^2M Weather App</h2>

      <% if (showInvalidLoginMessage) { %>
        <p class="error-message">Invalid username or password! Please try again.</p>
      <% } %>

      <div class="form-group">
        <label for="username">Username or Email</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username/Email"
          required
          value="<%= (request.getParameter("username") != null) ? request.getParameter("username") : "" %>"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <div class="button-group">
        <div class="action-buttons">
          <button type="submit" class="login-button">
            Login
          </button>
          <button type="button" class="register-button" onclick="window.location.href='register.jsp'">
            Register
          </button>
        </div>
        <button type="button" class="forgot-password-button">
          Forgot Password?
        </button>
      </div>
    </form>
  </div>
</body>
</html>
