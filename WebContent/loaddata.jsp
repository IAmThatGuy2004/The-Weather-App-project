<%@ page import="java.sql.*" %>
<%@ page import="java.util.Scanner" %>
<%@ page import="java.io.File" %>
<%@ include file="jdbc.jsp" %>

<html>
<head>
    <title>Loading Data</title>
</head>
<body>

<%
out.print("<h1>Connecting to database.</h1><br><br>");

try {
    // Load driver class
    Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
} catch (java.lang.ClassNotFoundException e) {
    throw new SQLException("ClassNotFoundException: " + e);
}

String fileName = "/usr/local/tomcat/webapps/WeatherApp/ddl/SQLServer_weatherdb.ddl";

try (Connection con = DriverManager.getConnection(urlForLoadData, uid, pw);
     Statement stmt = con.createStatement()) {

    // Read the DDL file content
    Scanner scanner = new Scanner(new File(fileName));
    scanner.useDelimiter("(?i)\\bGO\\b"); // Use regex to split on 'GO', case-insensitive

    while (scanner.hasNext()) {
        String command = scanner.next();
        command = command.trim();

        if (command.isEmpty()) {
            continue;
        }

        try {
            stmt.execute(command);
        } catch (SQLException e) {
          {	// Keep running on exception.  This is mostly for DROP TABLE if table does not exist.
            if (!e.toString().contains("Database 'orders' already exists"))    // Ignore error when database already exists
                out.println(e+"<br>");
        }
        }
    }
    scanner.close();

    out.print("<br><br><h1>Database loaded successfully.</h1>");
} catch (Exception e) {
    out.print("An error occurred: " + e.getMessage());
}
%>
</body>
</html>
