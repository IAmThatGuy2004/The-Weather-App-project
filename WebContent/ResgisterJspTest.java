package WebContent;

import org.junit.*;
import java.sql.*;

public class ResgisterJspTest {
    // Database connection details
    private static final String DB_URL = "jdbc:sqlserver://cosc310_sqlserver:1433;DatabaseName=Users;TrustServerCertificate=True";
    private static final String USERNAME = "sa";
    private static final String PASSWORD = "310#sa#pw";

    private Connection connection;

    @Before
    public void setUp() throws SQLException {
        try {
            // Establish a connection to the database
            connection = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
            System.out.println("Database connection established.");

            // Clean up any existing test user before the test
            deleteTestUser();
        } catch (SQLException e) {
            System.err.println("Failed to establish database connection.");
            e.printStackTrace();
            throw e; // Re-throw the exception to fail the test
        }
    }

    @After
    public void tearDown() throws SQLException {
        // Clean up the test user after the test
        if (connection != null) {
            deleteTestUser();

            // Close the connection
            connection.close();
            connection = null;
        }
    }

    private void deleteTestUser() throws SQLException {
        if (connection == null) {
            // Connection was not established; nothing to clean up
            return;
        }
        String deleteQuery = "DELETE FROM [User] WHERE Username = ? OR Email = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(deleteQuery)) {
            preparedStatement.setString(1, "testUser");
            preparedStatement.setString(2, "testUser@example.com");
            preparedStatement.executeUpdate();
        }
    }

    @Test
    public void testUserInsertion() throws SQLException {
        // Prepare test user data
        String testUsername = "testUser";
        String testEmail = "testUser@example.com";
        String testPassword = "password123";
        int testAge = 25;

        // Insert the user
        String insertQuery = "INSERT INTO [User] (Username, Email, Password, Age) VALUES (?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
            preparedStatement.setString(1, testUsername);
            preparedStatement.setString(2, testEmail);
            preparedStatement.setString(3, testPassword);
            preparedStatement.setInt(4, testAge);

            int rowsAffected = preparedStatement.executeUpdate();
            Assert.assertEquals("Expected 1 row to be affected.", 1, rowsAffected);
        }

        // Verify the user exists
        String selectQuery = "SELECT * FROM [User] WHERE Username = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(selectQuery)) {
            preparedStatement.setString(1, testUsername);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                Assert.assertTrue("Expected the user to exist.", resultSet.next());
                Assert.assertEquals("Username should match.", testUsername, resultSet.getString("Username"));
                Assert.assertEquals("Email should match.", testEmail, resultSet.getString("Email"));
                Assert.assertEquals("Password should match.", testPassword, resultSet.getString("Password"));
                Assert.assertEquals("Age should match.", testAge, resultSet.getInt("Age"));
            }
        }
    }
}
