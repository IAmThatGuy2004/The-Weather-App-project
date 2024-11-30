FROM tomcat:11-jdk21

COPY ./Web-content/WEB-INF/lib/mysql-connector-java-8.0.27.jar   /usr/local/tomcat/lib/mysql-connector-java-8.0.27.jar

# Copy your project files into the Docker image
COPY . /usr/local/tomcat/webapps/the-project-ja-2m/

EXPOSE 8080

CMD ["catalina.sh", "run"]

