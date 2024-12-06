package WebContent;

import java.sql.*;

public class ViewDatabaseContents {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;DatabaseName=Users;TrustServerCertificate=True;";
        String username = "sa";
        String password = "310#sa#pw";

        try (Connection con = DriverManager.getConnection(url, username, password);
             Statement stmt = con.createStatement()) {
            String query = "SELECT * FROM [User]";
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                System.out.println("UserId: " + rs.getInt("UserId") + 
                                   ", Username: " + rs.getString("Username") +
                                   ", Email: " + rs.getString("Email"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
