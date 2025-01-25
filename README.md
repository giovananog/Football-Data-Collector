# **Football Data Collector**

THM Football Data Collector is a robust system designed to collect, analyze, and display football data with ease and efficiency. Leveraging modern web technologies, it offers a seamless interface and powerful backend services for football enthusiasts, analysts, and developers.

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js Icon" width="40px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Icon" width="40px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript Icon" width="40px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python Icon" width="40px"/>
</p>

## **Table of Contents**
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [User Interface](#user-interface)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Relational Model](#relational-model)
8. [Contributors](#contributors)

<br>

## **Overview**

The **Football Data Collector** is a powerful system designed to collect, manage, and present football match data from multiple sources. The project focuses on gathering detailed match statistics, player data, and team performance, offering an extensive API and an intuitive front-end for analyzing and visualizing football-related data.

Key features include:
- **Data Collection**: The system scrapes and compiles football data from various platforms, such as Transfermarkt.
- **Match and Player Analysis**: Offers detailed views of individual matches, including scores, substitutions, player performance, and statistics.
- **Comprehensive Data Access**: Provides extensive API endpoints to fetch data on matches, players, teams, referees, and managers.
- **Visualization**: An easy-to-use interface that allows users to view match data, filter results, and track top players and teams.

<p>For a brief overview of the project, you can view <a href='https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/Processo%20Seletivo%20THM%20Estatistica%20DEV%202024.pdf'>this document.<a/><p/>

<br>

## **Technologies Used**
- **Node.js**: Backend development.
- **ReactJS**: Frontend interface.
- **Express.js**: HTTP server for handling API requests.
- **Axios**: To manage HTTP requests.
- **MUI-Material**: To get frontend react components.
- **PostgreSQL**: For data storage.
- **Python**: For information gathering.
- **Beautiful Soup**: For data scraping.

<br>

## **User Interface**
Below are some key screens of the application:

### **Home Page**
<div style="display: flex; justify-content: center; align-items: center; text-align: center; width: '90%'">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-home%20(3).png" width="100%">
</div>

### **Data and Summary on Home Page**
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-home.png" width="48%">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-dados.png" width="48%">
</div>

### **Matches and Seasons Page**
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-temporadas.png" width="48%">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-partidas.png" width="48%">
</div>

### **Single Match and Player Pages**
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-partida%20(3).png" width="48%">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/frontend/thm-fdc/public/images/tela-jogador.png" width="48%">
</div>

<br>

## **Usage**
The system allows users to:
- Search for football matches and statistics.
- Filter results based on teams, players, dates, and more.
- Analyze data using dynamic visualizations and insights.

### **Getting Started**
To run the project locally:
1. Clone the repository.
2. Navigate to the backend and frontend directories.
3. Install dependencies using `npm install`.
4. Start the backend server with `node app.js`.
5. Start the frontend with `npm start`.
6. Open the application in your browser at `http://localhost:3000`.

<br>

## **Project Structure**

### **Backend**
- **`api/`**: Handles the Node.js server and API endpoints.
  - **Routes**: Defines REST API endpoints.
  - **Controllers**: Processes data requests.
  - **Services**: Contains business logic for data collection.
- **`data-base/`**: Handles the Data Base connection and functions.
- **`scraping/`**: All Transfermarket scraping logic for information gathering.

### **Frontend**
- **`src/`**: Contains the React application code.
  - **Components**: Reusable UI elements.
  - **Pages**: Core pages like the home, search, and details views.
  - **Styles**: CSS for consistent design.

<br>

## **API Endpoints**
### Base URL
`http://localhost:5000/`

### Key Endpoints

- **GET** `/matches`
  - **Description**: Retrieve a list of football matches.
  - **Parameters**:
    - `date`: Filter matches by date.
    - `team`: Filter matches by team name.

- **GET** `/matches/:id`
  - **Description**: Retrieve details of a specific match by ID.
  - **Parameters**:
    - `id`: The ID of the match.

- **GET** `/matches/date/:date`
  - **Description**: Retrieve matches on a specific date.
  - **Parameters**:
    - `date`: The date for which to retrieve matches.

- **GET** `/matches/:id/players`
  - **Description**: Retrieve a list of players in a specific match by ID.
  - **Parameters**:
    - `id`: The ID of the match.

- **GET** `/matches/:id/stats`
  - **Description**: Retrieve statistics for a specific match.
  - **Parameters**:
    - `id`: The ID of the match.

- **GET** `/matches/:matchId/stats/:teamId`
  - **Description**: Retrieve statistics for a specific team in a specific match.
  - **Parameters**:
    - `matchId`: The ID of the match.
    - `teamId`: The ID of the team.

- **GET** `/matches/:matchId/substitutions`
  - **Description**: Retrieve substitutions made during a specific match.
  - **Parameters**:
    - `matchId`: The ID of the match.

- **GET** `/matches/:matchId/cards`
  - **Description**: Retrieve cards issued during a specific match.
  - **Parameters**:
    - `matchId`: The ID of the match.

- **GET** `/matches/:matchId/goals`
  - **Description**: Retrieve goals scored during a specific match.
  - **Parameters**:
    - `matchId`: The ID of the match.

- **GET** `/players`
  - **Description**: Retrieve a list of all players.
  
- **GET** `/players/:id`
  - **Description**: Retrieve player details by player ID.
  - **Parameters**:
    - `id`: The ID of the player.

- **GET** `/players/:playerId/:matchday/:score`
  - **Description**: Retrieve statistics of a player in a specific matchday and score.
  - **Parameters**:
    - `playerId`: The ID of the player.
    - `matchday`: The matchday.
    - `score`: The score.

- **GET** `/players/:playerId/:score`
  - **Description**: Retrieve statistics of a player with a specific score.
  - **Parameters**:
    - `playerId`: The ID of the player.
    - `score`: The score.

- **GET** `/teams`
  - **Description**: Retrieve a list of all teams.

- **GET** `/teams/:id`
  - **Description**: Retrieve team details by team ID.
  - **Parameters**:
    - `id`: The ID of the team.

- **GET** `/teams/:id/players`
  - **Description**: Retrieve a list of players for a specific team by team ID.
  - **Parameters**:
    - `id`: The ID of the team.

- **GET** `/top-goalscorers/:year`
  - **Description**: Retrieve the top goalscorers for a specific year.
  - **Parameters**:
    - `year`: The year to retrieve top goalscorers.

- **GET** `/table/:year`
  - **Description**: Retrieve league standings for a specific year.
  - **Parameters**:
    - `year`: The year to retrieve league standings.

- **GET** `/player-of-the-year/:year`
  - **Description**: Retrieve the player of the year for a specific year.
  - **Parameters**:
    - `year`: The year to retrieve player of the year.


### Example response - **GET** `/matches`

- **Description**: Retrieve a list of football matches.
- **Parameters**:
  - `date`: Filter matches by date (optional).
  - `team`: Filter matches by team name (optional).
- **Example Request**:
  ```http
  GET /matches?date=2025-01-23
  ```
- **Example Response**:
  ```json
  [
    {
      "id": 3546464,
      "score": "1:0",
      "matchday": 1,
      "season": "2020",
      "first_team_id": 614,
      "second_team_id": 1023,
      "fst_coach_id": 50290,
      "scnd_coach_id": 23009,
      "stadium_id": 614,
      "stadium_attendance": null,
      "referee_id": 3762
    }
  ]
  ```
<br>

## **Relational Model**

The relational model for the THM Football Data Collector project consists of 19 tables, which represent the different entities and their relationships within the system. Below is the visual representation of the database schema.

<p align="center">
  <img src="https://github.com/giovananog/Football-Data-Collector/blob/main/backend/data-base/relational-model.png" width="90%" alt="Relational Model Diagram">
</p>

<br>

## **Contributors**

<table align='center'>
  <tr>
    <td align="center">
      <a href="https://github.com/giovananog">
        <img src="https://avatars.githubusercontent.com/u/114829638?v=4" width="150px;"/><br>
        <sub><b>Giovana Nogueira</b></sub>
      </a>
    </td>
  </tr>
</table>

