FROM tomcat:9-jdk11

EXPOSE 8080

COPY ./Web-content   /usr/local/tomcat/webapps/WeatherApp/

CMD ["catalina.sh", "run"]

