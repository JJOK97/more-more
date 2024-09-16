FROM openjdk:17-ea-11-jdk-slim
WORKDIR /app
COPY build/libs/ClubService-0.0.1-SNAPSHOT.jar /app/ClubService.jar
EXPOSE 8081
ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java", "-jar", "/app/ClubService.jar"]