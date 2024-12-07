package WebContent;


import org.junit.*;
import java.io.*;
import static org.junit.Assert.assertTrue;
import java.net.HttpURLConnection;
import java.net.URL;

public class RegisterJspTest {

    private static final String BASE_URL = "http://localhost:/WeatherApp/register.jsp";

 
    @Test
    public void testInvalidAge() throws IOException {
        String postData = "username=testuser&password=password123&confirm_password=password123&email=testuser@example.com&age=12";
        String response = sendPostRequest(BASE_URL, postData);

        // Assert the response contains the error message
        assertTrue("Expected age validation error.", response.contains("You must be at least 13 years old to register."));
    }

    @Test
    public void testMismatchedPasswords() throws IOException {
        String postData = "username=testuser&password=password123&confirm_password=differentpassword&email=testuser@example.com&age=25";
        String response = sendPostRequest(BASE_URL, postData);

        // Assert the response contains the error message
        assertTrue("Expected password mismatch error.", response.contains("Passwords do not match."));
    }

    @Test
    public void testInvalidEmail() throws IOException {
        String postData = "username=testuser&password=password123&confirm_password=password123&email=invalid-email&age=25";
        String response = sendPostRequest(BASE_URL, postData);

        // Assert the response contains the error message
        assertTrue("Expected email validation error.", response.contains("Please enter a valid email address."));
    }

    @Test
    public void testDuplicateUser() throws IOException {
        // First registration
        String postData1 = "username=duplicateuser&password=password123&confirm_password=password123&email=duplicateuser@example.com&age=25";
        sendPostRequest(BASE_URL, postData1);

        // Attempt duplicate registration
        String postData2 = "username=duplicateuser&password=password123&confirm_password=password123&email=duplicateuser@example.com&age=25";
        String response = sendPostRequest(BASE_URL, postData2);

        // Assert the response contains the error message
        assertTrue("Expected duplicate user validation error.", response.contains("Username or email already exists."));
    }

    private String sendPostRequest(String url, String postData) throws IOException {
        // Set up connection
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setDoOutput(true);

        // Write POST data
        try (OutputStream os = con.getOutputStream()) {
            os.write(postData.getBytes());
            os.flush();
        }

        // Read response
        int responseCode = con.getResponseCode();
        InputStream is = (responseCode == 200) ? con.getInputStream() : con.getErrorStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(is));
        StringBuilder response = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
}
