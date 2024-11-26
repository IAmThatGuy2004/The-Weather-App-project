<%@ page import="java.sql.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>
<%
    // Retrieve username and password from the form
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    boolean isValidUser = false;

    // Database connection details
    String jdbcUrl = "jdbc:mysql://localhost:3306/weatherdb";
    String dbUser = "root";
    String dbPassword = "password";

    Connection connection = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;

    try {
        // Load JDBC driver
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Connect to the database
        connection = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);

        // Query to validate user
        String query = "SELECT * FROM users WHERE username = ? AND password = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, username);
        preparedStatement.setString(2, password);

        resultSet = preparedStatement.executeQuery();

        // Check if user exists
        if (resultSet.next()) {
            isValidUser = true;
        }
    } catch (Exception e) {
        e.printStackTrace();
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
        HttpSession session = request.getSession();
        session.setAttribute("username", username);

        // Redirect to main.html
        response.sendRedirect("main.html");
    } else {
        // Show error message and redirect back to login.html
        out.println("<script>alert('Invalid username or password!'); window.location.href='login.html';</script>");
    }
%>
