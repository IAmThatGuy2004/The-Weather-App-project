import static org.junit.Assert.assertEquals;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;


public class TestDB {
    private static WeatherJDBC q;

    private static Connection con;

    /**
	 * Requests a connection to the database.
	 * 
	 * @throws Exception
	 * 		if an error occurs
	 */
	@BeforeClass
	public static void init() throws Exception 
	{		
		q = new WeatherJDBC();
		try
		{
			con = q.connect();		
			
			// Load data and initialize the database
			q.init();
		}
		catch (Exception e)
		{
			System.out.println("Failed to initialize connection and database. Verify WeatherJDBC.connect() method has your user id and password.");
			throw e;
		}
	}

    /**
	 * Closes connection.
	 * 
	 * @throws Exception
	 * 		if an error occurs
	 */
	@AfterClass
	public static void end() throws Exception 
	{
		q.close();        
	}

    /**
     * Tests listing all customers.
     */
    @Test
    public void testListAllUsers() throws SQLException
    {   
        // Re-initialize database
        q.init();

        System.out.println("\nTest List All Users\n");

        String result = q.listAllUsers();

        String expected = "UserId, Username" + 
                        "\n1, John Doe" +
                        "\n2, Mike Wazowski" +
                        "\n3, Sarah Lynn" +
                        "\n4, Jodie Landon";

        System.out.println(result);
        assertEquals(expected, result);


    }

    /**
     * Tests listing all user current locations
     */
    @Test
    public void testListUserLocations() throws SQLException
    {
        
        // Re-initialize database
        q.init();

        System.out.println("\nTest List User Locations");

        String result = q.listUserLocations();

        String expected = "UserId, Username, Current Location" + 
                        "\n1, John Doe, Vancouver" +
                        "\n2, Mike Wazowski, Melbourne" +
                        "\n3, Sarah Lynn, Montreal" +
                        "\n4, Jodie Landon, Florida";

        System.out.println(result);
        assertEquals(expected, result);
        
    }

    /**
     * Test listing favourite locations for all users
     * @throws SQLException
     */
    @Test
    public void testListUserFavourites() throws SQLException 
    {

        // Re-initialize database
        q.init();

        System.out.println("\nTest List User's Favourite Locations");

        String result = q.listUserFavourites();

        String expected = "UserId, Username, Favourite Location(s)"+
                        "\n1, John Doe, Miami, San Francisco" +
                        "\n2, Mike Wazowski, Boston, New York" +
                        "\n3, Sarah Lynn, Denver, Seattle" +
                        "\n4, Jodie Landon, Las Vegas, San Diego";

        System.out.println(result);
        assertEquals(expected, result);
    }

    /**
     * Test adding user to database
     * @throws SQLException
     */
    @Test
    public void testAddUser() throws SQLException
    {

        // Re-initialize database
        q.init();

        // Ensure table does not have added values from previous test
        Statement stmt = con.createStatement();
        stmt.executeUpdate("DELETE FROM User WHERE userId = 5 OR userId = 6");

        System.out.println("\nTest add user");

        q.addUser(5, "Fred Smith",  "passkey456", "fredsmith@gmail.com", 27, "Edmonton" );
        q.addUser(6, "Rachel Evans", "rachelDog1", "rachel.evans@gmail.com", 34, "Victoria");

        // Verify result
        String expected = "UserId, Username" + 
                        "\n1, John Doe" +
                        "\n2, Mike Wazowski" +
                        "\n3, Sarah Lynn" +
                        "\n4, Jodie Landon" +
                        "\n5, Fred Smith" +
                        "\n6, Rachel Evans";
        
        // Verify user is added
        String result = q.listAllUsers();
        System.out.println(result);
        assertEquals(expected, result);
    }

    /**
     * Test deleting user from database
     * @throws SQLException
     */
    @Test
    public void testDeleteUser() throws SQLException 
    {

        // re-initilize database
        q.init();

        System.out.println("\nTest delete user");

        q.deleteUser(3);

        // Verify result
        String expected = "UserId, Username" + 
                        "\n1, John Doe" +
                        "\n2, Mike Wazowski" +
                        "\n4, Jodie Landon";

        // verify user is deleted
        String result = q.listAllUsers();
        System.out.println(result);
        assertEquals(expected, result);
    }

    /**
     * Test updated usernames
     * @throws SQLException
     */
    @Test
    public void testUpdateUsername() throws SQLException
    {

        // Re-initialize database
        q.init();

        System.out.println("\nTest update user");

        // Ensure table does not have added values from previous test
        Statement stmt = con.createStatement();
        stmt.executeUpdate("DELETE FROM User WHERE userId = 5 OR userId = 6");

        q.addUser(5, "Fred Smith",  "passkey456", "fredsmith@gmail.com", 27, "Edmonton" );
        q.updateUser(5, "Freddy Smithers");

        // Verify result
        String expected = "UserId, Username" + 
        "\n1, John Doe" +
        "\n2, Mike Wazowski" +
        "\n3, Sarah Lynn" +
        "\n4, Jodie Landon" +
        "\n5, Freddy Smithers";

        // Verify updated
        String result = q.listAllUsers();
        assertEquals(expected, result);

    }

    /**
     * Test updating current location
     * @throws SQLException
     */
    @Test
    public void testUpdateLocation() throws SQLException
    {

        // Re-initialize database
        q.init();

        System.out.println("\nTest update location");

        // Ensure table does not have added values from previous test
        Statement stmt = con.createStatement();
        stmt.executeUpdate("DELETE FROM User WHERE userId = 5 OR userId = 6");

        // Add user then update current location
        q.addUser(5, "Fred Smith",  "passkey456", "fredsmith@gmail.com", 27, "Edmonton" );
        q.updateLocation(5, "Calgary");

        // Verify result
        String expected = "UserId, Username, Current Location" + 
                        "\n1, John Doe, Vancouver" +
                        "\n2, Mike Wazowski, Melbourne" +
                        "\n3, Sarah Lynn, Montreal" +
                        "\n4, Jodie Landon, Florida" +
                        "\n5, Fred Smith, Calgary";
        
        // Verify updated location
        String result = q.listUserLocations();
        assertEquals(expected, result);
    }

    /**
     * Test adding a favourite location
     * @throws SQLException
     */
    @Test
    public void testAddFavourite() throws SQLException
    {

        // Re-initialize database
        q.init();

        System.out.println("\nTest add favourite location");

        // Ensure table does not have added values from previous test
        Statement stmt = con.createStatement();
        stmt.executeUpdate("DELETE FROM User WHERE userId = 5 OR userId = 6");

        // Add favourite location
        q.addUser(5, "Fred Smith",  "passkey456", "fredsmith@gmail.com", 27, "Edmonton" );
        q.addFavourite(5, "Sydney");
        q.addFavourite(5, "Perth");

        // Verify result
        String expected = "UserId, Username, Favourite Location(s)"+
                        "\n1, John Doe, Miami, San Francisco" +
                        "\n2, Mike Wazowski, Boston, New York" +
                        "\n3, Sarah Lynn, Denver, Seattle" +
                        "\n4, Jodie Landon, Las Vegas, San Diego" +
                        "\n5, Fred Smith, Perth, Sydney";

        // Verify added favourites
        String result = q.listUserFavourites();
        assertEquals(expected, result);
    }

    /**
     * Test deleting a favourite location
     * @throws SQLException
     */
    @Test
    public void testDeleteFavourite() throws SQLException
    {

        // Re-initialize database
        q.init();

        System.out.println("\nTest delete favourite location");

        // Ensure table does not have added values from previous test
        Statement stmt = con.createStatement();
        stmt.executeUpdate("DELETE FROM User WHERE userId = 5 OR userId = 6");

        
        // Delete user's favourite location
        q.deleteFavourite(3, "Denver");

        // Verify expected
        String expected = "UserId, Username, Favourite Location(s)"+
                        "\n1, John Doe, Miami, San Francisco" +
                        "\n2, Mike Wazowski, Boston, New York" +
                        "\n3, Sarah Lynn, Seattle" +
                        "\n4, Jodie Landon, Las Vegas, San Diego";

        // Verify favourite is deleted
        String result = q.listUserFavourites();
        assertEquals(expected, result);

    }


}