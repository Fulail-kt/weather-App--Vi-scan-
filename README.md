# Weather Application

This project is a React-based weather dashboard with user authentication and favorites management.

## Features

- Display current weather, air quality, forecast, and historical data for a location.
- Search weather data by city name or use geolocation for current location.
- User authentication with JWT for secure access.
- Manage favorite cities to quickly access weather information.

## Technologies Used

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express.js, Prisma (ORM for MySQL)
- **APIs**: OpenWeatherMap, Visual Crossing Weather

## Setup

### Prerequisites

- Node.js (version >= 12.0.0)
- MySQL database (with Prisma configured)

### Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/Fulail-kt/weatherApp-Viscan.git
   cd weatherApp-Viscan
```

2. **Install dependencies:**

   ```bash
    npm install
   ```

3. **Set environment variables:**

   Create a `.env` file in the root directory and add the following:

   - **Frontend:**

     ```
     ACCESS_TOKEN_SECRET=<your-secret-key>
     VITE_APP_API_KEY=<openweathermap-api-key>
     VITE_APP_API_KEY2=<visual-crossing-api-key>
     ```

   - **Backend:**
     ```
     DATABASE_URL="mysql://username:password@localhost:5432/database"
     ```

4. **Run migrations (for Prisma):**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the server:**

   - **Frontend:**

     ```bash
     npm run dev
     ```

     Access the frontend application at `http://localhost:5173`.

   - **Backend:**

     ```bash
     npm start
     ```

     Access the backend application at `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to [API Documentation](https://docs.google.com/document/d/1ijSNNa9aCojo4z_8rXp8UktVYrpe0GG4qMq76C7fXDs/edit?usp=sharing).
