# Medico

A Pharmacy Management System.

This project consists of a Spring Boot backend providing APIs related to medicines, and a React frontend for the user interface, which can also be built as an Electron desktop application.

## Technologies Used

### Backend
- **Java 17**
- **Spring Boot** (3.0.5)
- **Spring Security** (OAuth2, JWT)
- **Spring Data MongoDB**
- **Maven**

### Frontend
- **React** (18.0.0)
- **Chakra UI**
- **Redux**
- **Electron** (for desktop app build)
- **Firebase**

## Project Structure

- **Backend:** The root directory contains the Spring Boot backend (`pom.xml`, `src/`).
- **Frontend:** The `frontend/` directory contains the React/Electron application.

## Prerequisites

- **Java 17** (or higher)
- **Maven** (optional, wrapper is included)
- **Node.js** (v14 or higher)
- **MongoDB** (A MongoDB URI is configured in the properties, but you may need your own local/cloud instance for full access)

## Getting Started

### Backend Setup

1. Open a terminal in the root directory.
2. Run the application using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
   *Note: Make sure your MongoDB instance is running or you have access to the configured MongoDB URI.*

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Running as a Desktop App (Electron)

To run the frontend as an Electron application:

1. In the `frontend` directory, run:
   ```bash
   npm run dev
   ```
   This command starts the React server and waits for it before launching the Electron app.
