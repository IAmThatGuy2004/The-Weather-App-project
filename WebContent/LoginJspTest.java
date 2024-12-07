package WebContent;

import org.junit.*;
import org.apache.http.client.methods.*;
import org.apache.http.impl.client.*;
import org.apache.http.util.EntityUtils;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;

import java.util.List;
import java.util.ArrayList;

public class LoginJspTest {

    private static CloseableHttpClient httpClient;
    private static String baseUrl;

    @BeforeClass
    public static void setUp() {
        httpClient = HttpClients.createDefault();
        baseUrl = "http://localhost:/WeatherApp";
    }

    @AfterClass
    public static void tearDown() throws Exception {
        httpClient.close();
    }

    @Test
    public void testValidLogin() throws Exception {
        HttpPost post = new HttpPost(baseUrl + "/login.jsp");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("username", "John Doe"));
        params.add(new BasicNameValuePair("password", "password123"));

        post.setEntity(new UrlEncodedFormEntity(params));

        try (CloseableHttpResponse response = httpClient.execute(post)) {
            int statusCode = response.getStatusLine().getStatusCode();
            Assert.assertEquals(302, statusCode); // Expecting a redirect

            String location = response.getFirstHeader("Location").getValue();
            Assert.assertTrue(location.endsWith("dashboard.html"));
        }
    }

    @Test
    public void testInvalidLogin() throws Exception {
        HttpPost post = new HttpPost(baseUrl + "/login.jsp");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("username", "invalidUser"));
        params.add(new BasicNameValuePair("password", "wrongPassword"));

        post.setEntity(new UrlEncodedFormEntity(params));

        try (CloseableHttpResponse response = httpClient.execute(post)) {
            int statusCode = response.getStatusLine().getStatusCode();
            Assert.assertEquals(200, statusCode); // Should stay on the same page

            String responseBody = EntityUtils.toString(response.getEntity());
            Assert.assertTrue(responseBody.contains("Invalid username or password"));
        }
    }
}
