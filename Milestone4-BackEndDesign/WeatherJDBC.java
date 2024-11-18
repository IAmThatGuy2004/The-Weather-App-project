import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class WeatherJDBC {
    
    private Connection con;

    /**
     * Lists all users after each method has been run to see the change
     * 
     * @param args
     *      none
     * @throws SQLException
     *      with database exception
     */
    public static void main(String[] args) throws SQLException {
        
        // create an object that will be used to print results of each method and initialize
        WeatherJDBC q = new WeatherJDBC();
        q.connect();
        q.init();

        System.out.println("List Users Method");
        System.out.println(q.listAllUsers());
        
        System.out.println("List Locations Method");
        System.out.println(q.listUserLocations());

        System.out.println("List Favourites Method");
        System.out.println(q.listUserFavourites());

        System.out.println("Add Users Method");
        System.out.println(q.addUser(5, "Fred Smith",  "passkey456", "fredsmith@gmail.com", 27, "Edmonton" ));

        System.out.println("Delete Users Method");
        System.out.println(q.deleteUser(5));

        System.out.println("Update Location Method");
        System.out.println(q.updateLocation(1, "Cancun"));

        System.out.println("Delete Favourite Method");
        System.out.println(q.deleteFavourite(5, "Perth"));

        System.out.println("Update Username Method");
        System.out.println(q.updateUser(2, "Micheal Wazowski"));

        System.out.println("Add Favourite Users Method");
        System.out.println(q.addFavourite(3, "Accra")); 
        
        q.close();

    }

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
		String pw = "310testpw";
	    
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
	    String fileName = "Milestone4-BackEndDesign/ddl/weather.ddl";
        System.out.println(new File(fileName).getAbsolutePath());
		
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
        ResultSet rst = stmt.executeQuery("SELECT User.UserId, Username, Location FROM User JOIN CurrentLocation ON User.UserId = CurrentLocation.UserId");

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

        String SQL = "SELECT FavouriteLocation FROM FavouriteLocation WHERE UserId = ? ORDER BY FavouriteLocation ASC";
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

    public String addUser(int userId, String username, String password, String email, int age, String currentLocation) throws SQLException
    {

        System.out.println("Adding user to database");

        // Create statements 
        String SQL = "INSERT INTO User (UserId, Username, Password, Email, Age) VALUES (?,?,?,?,?)";
        String SQL2 = "INSERT INTO CurrentLocation (UserId, Location) VALUES (?,?)";
        PreparedStatement pstmt = con.prepareStatement(SQL);
        PreparedStatement pstmt2 = con.prepareStatement(SQL2);

        // input values into the statements
        pstmt.setInt(1, userId);
        pstmt.setString(2, username);
        pstmt.setString(3, password);
        pstmt.setString(4, email);
        pstmt.setInt(5, age);
        pstmt2.setInt(1, userId);
        pstmt2.setString(2, currentLocation);

        // execute the queries
        int rowcount = pstmt.executeUpdate();
        int rowcount2 = pstmt2.executeUpdate();

        return listAllUsers();
        
    }

    public String deleteUser(int userId) throws SQLException
    {

        System.out.println("Deleting user from database");

        // Create statements 
        String SQL = "DELETE FROM User WHERE UserId = ?";
        PreparedStatement pstmt = con.prepareStatement(SQL);

        // input values into the statements
        pstmt.setInt(1, userId);

        // execute the queries
        int rowcount = pstmt.executeUpdate();

        return listAllUsers();
    }

    public String updateUser(int userId, String username) throws SQLException
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

        return listAllUsers();
    }

    public String updateLocation(int userId, String currentLocation) throws SQLException
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

        return listUserLocations();
    }

    public String addFavourite(int userId, String favourite) throws SQLException
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
        
        return listUserFavourites();
    }

    public String deleteFavourite(int userId, String location) throws SQLException
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

        return listUserFavourites();
    }
}
