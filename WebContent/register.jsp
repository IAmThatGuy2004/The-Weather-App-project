<%@ page import="java.sql.*" %>
<%@ page import="java.util.Scanner" %>
<%@ page import="java.io.File" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>

<%
    boolean showInvalidMessage = false;
    String errorMessage = "";

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

    // Database initialization code (same as before)...

    if (request.getMethod().equalsIgnoreCase("POST")) {

        // Retrieve form data
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirm_password");
        String email = request.getParameter("email");
        String ageParam = request.getParameter("age");

        boolean isValidInput = true;
        int age = 0;

        // Validate age
        try {
            age = Integer.parseInt(ageParam);
            if (age < 13) {
                showInvalidMessage = true;
                errorMessage = "You must be at least 13 years old to register.";
                isValidInput = false;
            }
        } catch (NumberFormatException e) {
            showInvalidMessage = true;
            errorMessage = "Please enter a valid age.";
            isValidInput = false;
        }

        // Validate passwords match
        if (!password.equals(confirmPassword)) {
            showInvalidMessage = true;
            errorMessage = "Passwords do not match.";
            isValidInput = false;
        }

        // Validate email format
        String emailPattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!email.matches(emailPattern)) {
            showInvalidMessage = true;
            errorMessage = "Please enter a valid email address.";
            isValidInput = false;
        }

        if (isValidInput) {

            Connection connection = null;
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                // Connect to the Users database
                connection = DriverManager.getConnection(url, uid, pw);

                // Check if username or email already exists
                String checkUserQuery = "SELECT COUNT(*) FROM [User] WHERE Username = ? OR Email = ?";
                try (PreparedStatement checkStmt = connection.prepareStatement(checkUserQuery)) {
                    checkStmt.setString(1, username);
                    checkStmt.setString(2, email);
                    resultSet = checkStmt.executeQuery();
                    if (resultSet.next()) {
                        int count = resultSet.getInt(1);
                        if (count > 0) {
                            showInvalidMessage = true;
                            errorMessage = "Username or email already exists.";
                            isValidInput = false;
                        }
                    }
                }

                if (isValidInput) {
                    // Insert new user
                    String insertQuery = "INSERT INTO [User] (Username, Email, Password, Age) VALUES (?,?,?,?)";
                    preparedStatement = connection.prepareStatement(insertQuery);

                    preparedStatement.setString(1, username);
                    preparedStatement.setString(2, email);
                    preparedStatement.setString(3, password); // Note: Passwords should be hashed in production
                    preparedStatement.setInt(4, age);

                    int rowsAffected = preparedStatement.executeUpdate();

                    if (rowsAffected > 0) {
                        // Registration successful, redirect to login page
                        response.sendRedirect("login.jsp?registration=success");
                        return;
                    } else {
                        showInvalidMessage = true;
                        errorMessage = "Registration failed. Please try again.";
                    }
                }

            } catch (SQLException e) {
                e.printStackTrace();
                showInvalidMessage = true;
                errorMessage = "An error occurred during registration.";
            } finally {
                try {
                    if (resultSet != null) resultSet.close();
                    if (preparedStatement != null) preparedStatement.close();
                    if (connection != null) connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    } // End of POST processing
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Page</title>
  <!-- Imported External CSS File -->
  <link rel="stylesheet" href="register-style.css">
</head>
<body>
  <div class="registration-container">
    <form class="registration-form" method="post" action="register.jsp">
      <h2>Create your account:</h2>

      <% if (showInvalidMessage) { %>
        <p class="error-message"><%= errorMessage %></p>
      <% } %>

      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          value="<%= (request.getParameter("username") != null) ? request.getParameter("username") : "" %>"
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
          value="<%= (request.getParameter("email") != null) ? request.getParameter("email") : "" %>"
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
        <label for="confirm_password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Password"
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
          value="<%= (request.getParameter("age") != null) ? request.getParameter("age") : "" %>"
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
