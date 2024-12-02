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
        ResultSet rs = dbMeta.getTables(null, null, "[User]", null);
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

    if (request.getMethod().equalsIgnoreCase("POST")) {

        // Retrieve username and password from the form
        String identifier = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        int age = Integer.parseInt(request.getParameter("age"));

        boolean isValidInput = false;

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the Users database
            connection = DriverManager.getConnection(url, uid, pw);

            // Query to validate user
            String query = "INSERT INTO [User] (Username, Email, Password, Age) VALUES (?,?,?,?)";
            preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, identifier);     // identifier is username
            preparedStatement.setString(2, email);     // identifier is email
            preparedStatement.setString(3, password);
            preparedStatement.setInt(4, age);

            int rowsAffected = preparedStatement.executeUpdate();

            // Check if user exists
            while (rowsAffected > 0) {
                isValidInput = true;
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

        if (isValidInput) {

            // Redirect to weather.html
            response.sendRedirect("login.jsp");
            return; // Stop further processing
        } else {
            showInvalidLoginMessage = true;
            // The form will be displayed again with the error message
        }
    } // End of POST processing
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- **Imported External CSS File** -->
  <link rel="stylesheet" href="register-style.css">
  <title>Registration Page</title>
</head>
<body>
  <div class="registration-container">
    <form class="registration-form" method="post" action="register.jsp">
      <h2>Create your account:</h2>

      <% if (showInvalidLoginMessage) { %>
        <p class="error-message">Invalid username or password! Please try again.</p>
      <% } %>
      
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      
      
      <div class="form-group">
        <label for="age">Age (must be over the age of 13):</label>
        <input
          type="number"
          id="age"
          name="age"
          min="13"
          max="120"
          placeholder="13+"
          required
        />
      </div>

      <div class="button-group">
        <div class="action-buttons">
          <button type="submit" class="registration-button">
            Register Now
          </button>
          <a href="login.jsp">
            <button type="button" class="login-button">
              Login
            </button>
        </a>
        </div>
      </div>
    </form>
  </div>
</body>
</html>