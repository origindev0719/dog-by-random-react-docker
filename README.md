## Project Overview
This project is a React application that displays information about dog breeds. It allows users to select a breed from a list and view a random image of that breed. The project uses the React Query library for data fetching and management.

## Project Structure
The project is organized into several directories, each with a specific purpose:

- components: Contains React components used in the application.
- hooks: Custom React hooks used in the project.
- pages: Top-level page components.
- services: Functions for fetching data from external APIs.
- resources: Static assets, such as images.

## What I used for this project?

- **Front-End Framework**: React
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Testing**: Jest
- **Dependency Management**: NPM
- **API Calls**: Dog CEO's Dog API("https://dog.ceo/api/breeds/list/all")
- **Custom Hooks**: useSetSelectedBreed
- **Development Environment**: Node.js, Docker
- **Testing Environment**: Jest
- **Deployment**: Configuration for deployment

## Running the Project with Docker

- Install Docker: If you don't already have Docker installed, you can download it from the official Docker website.
- Clone the Repository: git clone <repository_url>
- Navigate to the Project Directory: cd <project_directory>
- Build the Docker Image:
    Run the following command to build a Docker image for your project: docker build -t react-dog-app .
- Run the Docker Container:
    Start a Docker container using the image you just built: docker run -p 3000:3000 react-dog-app
- Access the Application:
    Open your web browser and navigate to http://localhost:3000 to access the running React application.
