FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests
EXPOSE 8083
CMD ["java", "-jar", "target/SatelliteTracking-0.0.1-SNAPSHOT.jar"]