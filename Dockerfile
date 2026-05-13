# Stage 1: Build stage using Maven and Corretto 17
FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM amazoncorretto:17-alpine-jdk
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar

# Run the application
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
