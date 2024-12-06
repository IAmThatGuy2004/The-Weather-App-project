<%@ page import="javax.servlet.http.*" %>
<%@ page import="javax.servlet.*" %>

<%
    // Invalidate the session if it exists
    session = request.getSession(false);
    if (session != null) {
        session.invalidate();
    }

    // Redirect to the login page
    response.sendRedirect("./login.jsp");
%>