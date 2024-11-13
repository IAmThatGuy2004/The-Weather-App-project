import java.io.File;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class WeatherJDBC {
    
    private Connection con;

    /**
	 * Makes a connection to the database and returns connection to caller.
	 * 
	 * @return
	 * 		connection
	 * @throws SQLException
	 * 		if an error occurs
	 */
	public Connection connect() throws SQLException
	{
	    // TODO: Verify connection information is correct
		String uid = "testuser";
		String url = "jdbc:mysql://localhost/testuser"; 		
		String pw = "304testpw";
	    
		System.out.println("Connecting to database.");
		// Note: Must assign connection to instance variable as well as returning it back to the caller
		con = DriverManager.getConnection(url, uid, pw);
		return con;		                       
	}
	
	/**
	 * Closes connection to database.
	 */
	public void close()
	{
		System.out.println("Closing database connection.");
		try
		{
			if (con != null)
	            con.close();
		}
		catch (SQLException e)
		{
			System.out.println(e);
		}
	}
		
	/**
	 * Creates the database and initializes the data.
	 */
	public void init()
	{
	    String fileName = "order.ddl";
		
	    try
	    {
	        // Create statement
	        Statement stmt = con.createStatement();
	        
	        Scanner scanner = new Scanner(new File(fileName));
	        // Read commands separated by ;
	        scanner.useDelimiter(";");
	        while (scanner.hasNext())
	        {
	            String command = scanner.next();
	            if (command.trim().equals(""))
	                continue;
	            // System.out.println(command);        // Uncomment if want to see commands executed
	            stmt.execute(command);
	        }	  
	        scanner.close();
	    }
	    catch (Exception e)
	    {
	        System.out.println(e);
	    }        
	}

    public String listAllUsers() throws SQLException 
    {
        System.out.println("Listing all users.");

        StringBuilder output = new StringBuilder();

        Statement stmt = con.createStatement();
        ResultSet rst = stmt.executeQuery("SELECT UserId, Username FROM User");

        output.append("UserId, Username");

        while (rst.next()) {
            output.append("\n" + rst.getInt("UserId") + ", " + rst.getString("Username"));
        }
        
        return output.toString();
    }

    public String listUserLocations() throws SQLException
    {
        System.out.println("Listing all user's locations");

        StringBuilder output = new StringBuilder();

        Statement stmt = con.createStatement();
        ResultSet rst = stmt.executeQuery("SELECT UserId, Username, Location FROM User JOIN CurrentLocation ON User.UserId = CurrentLocation.UserId");

        output.append("UserId, Username, Current Location");

        while (rst.next()) {
            output.append("\n" + rst.getInt("UserId") + ", " + rst.getString("Username") + ", " + rst.getString("Location"));
        }
        
        return output.toString();
    }

    public String listUserFavourites() throws SQLException
    {
        System.out.println("Listing user's favourite locations");

        StringBuilder output = new StringBuilder();

        Statement stmt = con.createStatement();
        ResultSet rst = stmt.executeQuery("SELECT UserId, Username FROM User");

        String SQL = "SELECT FavouriteLocation FROM FavouriteLocation WHERE UserId = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        output.append("UserId, Username, Favourite Location(s)");

        while (rst.next()) {
            output.append("\n" + rst.getInt("UserId") + ", " + rst.getString("Username"));

            pstmt.setInt(1, rst.getInt("UserId"));
            ResultSet rst2 = pstmt.executeQuery();

            while (rst2.next()) {
                output.append(", " + rst2.getString("FavouriteLocation"));
            }
        }
        
        return output.toString();
    }

    public void addUser(int userId, String username, String currentLocation) throws SQLException
    {

        System.out.println("Adding user to database");

        // Create statements 
        String SQL = "INSERT INTO User (UserId, Username) VALUES (?,?)";
        String SQL2 = "INSERT INTO CurrentLocation (UserId, Location) VALUES (?,?)";
        PreparedStatement pstmt = con.prepareStatement(SQL);
        PreparedStatement pstmt2 = con.prepareStatement(SQL2);

        // input values into the statements
        pstmt.setInt(1, userId);
        pstmt.setString(2, username);
        pstmt2.setInt(1, userId);
        pstmt2.setString(2, currentLocation);

        // execute the queries
        int rowcount = pstmt.executeUpdate();
        int rowcount2 = pstmt2.executeUpdate();
        
    }

    public void deleteUser(int userId) throws SQLException
    {

        System.out.println("Deleting user from database");

        // Create statements 
        String SQL = "DELETE FROM User WHERE UserId = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(1, userId);

        // execute the queries
        int rowcount = pstmt.executeUpdate();

    }

    public void updateUser(int userId, String username) throws SQLException
    {

        System.out.println("Updating user name in database");

        // Create statements 
        String SQL = "UPDATE User SET username  = ? WHERE UserId = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(2, userId);
        pstmt.setString(1, username);

        // execute the queries
        int rowcount = pstmt.executeUpdate();
    }

    public void updateLocation(int userId, String currentLocation) throws SQLException
    {

        System.out.println("Updating user location in database");

        // Create statements 
        String SQL = "UPDATE CurrentLocation SET Location = ? WHERE UserId = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(2, userId);
        pstmt.setString(1, currentLocation);

        // execute the queries
        int rowcount = pstmt.executeUpdate();
    }

    public void addFavourite(int userId, String favourite) throws SQLException
    {

        System.out.println("Adding favourite location for user to database");

        // Create statements 
        String SQL = "INSERT INTO FavouriteLocation (UserId, FavouriteLocation) VALUES (?,?)";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(1, userId);
        pstmt.setString(2, favourite);

        // execute the queries
        int rowcount = pstmt.executeUpdate();
        
    }

    public void deleteFavourite(int userId, String location) throws SQLException
    {

        System.out.println("Deleting favourite from user");

        // Create statements 
        String SQL = "DELETE FROM FavouriteLocation WHERE UserId = ? AND FavouriteLocation = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(1, userId);
        pstmt.setString(2, location);

        // execute the queries
        int rowcount = pstmt.executeUpdate();

    }
}
