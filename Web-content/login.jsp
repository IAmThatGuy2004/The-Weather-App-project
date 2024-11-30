<%@ page import="java.sql.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>

<%
    boolean showInvalidLoginMessage = false;

    if (request.getMethod().equalsIgnoreCase("POST")) {

        // Retrieve username and password from the form
        String identifier = request.getParameter("username");
        String password = request.getParameter("password");

        boolean isValidUser = false;

        // Database connection details
        String uid = "testuser";
        String url = "jdbc:mysql://localhost/testuser";
        String pw = "310testpw";

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the database
            connection = DriverManager.getConnection(url, uid, pw);

            // Query to validate user
            String query = "SELECT * FROM User WHERE (Username = ? OR Email = ?) AND Password = ?";
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

            // Redirect to main.html
            response.sendRedirect("main.html");
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
          <button type="button" class="register-button">
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
