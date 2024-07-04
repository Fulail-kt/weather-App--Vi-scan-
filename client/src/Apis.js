import axios from "axios";
import Api from "./axios/Api";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiKey2 = import.meta.env.VITE_APP_API_KEY2;


export const getWeatherData = async (latitude, longitude, city) => {
  try {
    let url;
    if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
      return;
    }

    const response = await axios.get(url);
    const data = response.data;
    const airQualityResponse = await getAirQualityData(
      data.coord.lat,
      data.coord.lon
    );
    const forecast = await getForecastData(data.coord.lat, data.coord.lon);
    const pastWeather = await getHistoricalWeatherData(city)

    return {
      ...data,
      airQuality: airQualityResponse,
      forecast,
      pastWeather,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const getAirQualityData = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};

export const getForecastData = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=100`;
    const response = await axios.get(url);

    console.log(response.data, "response");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split("T")[0];

    const dailyForecast = response.data.list.filter((forecast) => {
      const forecastDate = forecast.dt_txt.split(" ")[0];
      const forecastHour = new Date(forecast.dt_txt).getHours();
      return (
        forecastDate >= tomorrowDateString && forecastHour === 12 
      );
    });

    console.log(dailyForecast, "dailyForecast");

    let future7Days = [];
    let currentDate = tomorrowDateString;
    for (let i = 0; i < 7; i++) {
      const dayForecast = dailyForecast.find((forecast) =>
        forecast.dt_txt.startsWith(currentDate)
      );
      if (dayForecast) {
        future7Days.push(dayForecast);
      }
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate.toISOString().split("T")[0];
    }

    console.log(future7Days, "future7Days");

    return future7Days;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};


export const getHistoricalWeatherData = async (cityName) => {
  
    const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      cityName
    )}/${encodeURIComponent(formattedStartDate)}/${encodeURIComponent(
      formattedEndDate
    )}?unitGroup=metric&key=${apiKey2}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data && data.days && data.days.length > 0) {
      const historicalData = data.days.map((day) => ({
        date: day.datetime,
        temperature: day.temp,
        precipitation: day.precip,
        humidity: day.humidity,
        windSpeed: day.windspeed,
      }));
      return { historicalData };
    } else {
      console.error(
        "Error fetching historical weather data:",
        data.error || "Unknown error"
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching historical weather data:", error);
    return null;
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await Api.get(`/favorites/${userId}`);
    
    if (response.data && response.data.success) {
      const favoriteCities = response.data.favorites;
      const favorites = await Promise.all(
        favoriteCities.map(async (favorite) => {
          const data = await getWeatherData(null, null, favorite.city);
          return { id: favorite.id, city: favorite.city, weather: data };
        })
      );
      return favorites;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    return [];
  }
};


export const addFavorite = async (userId, city) => {
  try {
    await Api.post("/favorite", { userId, city });
  } catch (error) {
    console.error("Error adding favorite city:", error);
  }
};
