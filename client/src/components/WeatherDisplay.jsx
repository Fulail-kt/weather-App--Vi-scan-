/* eslint-disable react/prop-types */
import { useState } from "react";

function WeatherDisplay({ data }) {
  console.log(data, "data");
  if (!data) {
    return <div>Loading weather data...</div>;
  }

  const [show7Days, setShow7days] = useState(false);

  function formatDateTime(dt_txt) {
    const date = new Date(dt_txt);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US");
  }

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear":
        return "wi wi-day-sunny";
      case "clouds":
        return "wi wi-day-cloudy";
      case "rain":
        return "wi wi-day-rain";
      case "snow":
        return "wi wi-day-snow";
      case "thunderstorm":
        return "wi wi-day-thunderstorm";
      case "mist":
        return "wi wi-day-fog";
      default:
        return "wi wi-day-cloudy";
    }
  };

  return (
    data && (
      <>
        <div className="rounded-md bg_traveler flex flex-col justify-center items-center p-6">
          <div className=" text-white font-bold mb-4 bg-opacity-50 rounded-md bg-black flex justify-around opacity-50 w-[90%] text-xl font-sans shadow-md py-2">
            <h2 className="text-center "> Traveler Weather</h2>
            <span>
              {data?.name} ({data?.sys?.country})
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-yellow-400 to-yellow-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <i className="wi wi-thermometer text-4xl text-white"></i>
              <p className="text-white">Temperature</p>
              <p className="text-2xl font-semibold text-white">
                {data.main.temp}°C
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-green-400 to-green-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <i className="wi wi-thermometer-exterior text-4xl text-white"></i>
              <p className="text-white">Feels Like</p>
              <p className="text-2xl font-semibold text-white">
                {data.main.feels_like}°C
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-indigo-400 to-indigo-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Condition</p>
              <p className="text-lg font-semibold capitalize text-white">
                {data.weather[0].description} <br />
                <i className={`${getWeatherIcon(data.weather[0].main)} `}></i>
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-red-400 to-red-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Wind Speed</p>
              <i
                className={`wi wi-wind-beaufort-${Math.round(
                  data.wind.speed
                )} text-white`}
              ></i>
              <p className="text-2xl font-semibold text-white">
                {data.wind.speed} m/s
              </p>
            </div>
            {data.airQuality && (
              <div className="weather-card p-4 m-2 bg-gradient-to-b from-purple-400 to-purple-600 border rounded-md flex flex-col items-center justify-center shadow-md">
                <p className="text-white">Air Quality</p>
                <i className="wi wi-smoke text-4xl text-white"></i>
                <p className="text-2xl font-semibold text-white">
                  {data.airQuality.list[0].main.aqi}
                </p>
              </div>
            )}
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-pink-400 to-pink-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Visibility</p>
              <p className="text-2xl font-semibold text-white">
                {data.visibility} m
              </p>
              <i className="wi wi-day-haze text-4xl text-white"></i>
            </div>
            {/* Additional Functionalities */}
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-blue-400 to-blue-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">UV Index</p>
              <i className="wi wi-day-sunny text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">High</p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-gray-400 to-gray-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Sunrise</p>
              <i className="wi wi-sunrise text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-gray-400 to-gray-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Sunset</p>
              <i className="wi wi-sunset text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">
                {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-yellow-400 to-yellow-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Humidity</p>
              <i className="wi wi-humidity text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">
                {data.main.humidity}%
              </p>
            </div>
            <div className="weather-card p-4 m-2 bg-gradient-to-b from-green-400 to-green-600 border rounded-md flex flex-col items-center justify-center shadow-md">
              <p className="text-white">Pressure</p>
              <i className="wi wi-barometer text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">
                {data.main.pressure} hPa
              </p>
            </div>

            <div
              onClick={() => setShow7days(true)}
              className="weather-card p-4 m-2 bg-gradient-to-b from-purple-400 to-purple-600 border rounded-md flex flex-col items-center justify-center shadow-md"
            >
              <p className="text-white">7-Day Forecast</p>
              <i className="wi wi-umbrella text-4xl text-white"></i>
              <p className="text-2xl font-semibold text-white">Show</p>
            </div>

            {show7Days && data && data?.forecast && (
              <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center  bg-opacity-70">
                <div className="rounded-md bg-gradient-to-t from-gray-800 to-gray-600 flex flex-col justify-center items-center p-6">
                  <h2 className="text-center text-xl py-2 w-[90%] text-white font-bold mb-4 bg-opacity-50 rounded-md bg-black">
                    7-Day Forecast
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                    {data.forecast.map((forecastItem, index) => (
                      <div
                        key={index}
                        className="weather-card p-4 m-2 bg-gradient-to-b from-purple-400 to-purple-600 border rounded-md flex flex-col items-center justify-center shadow-md"
                      >
                        <p className="text-white">
                          Day {index + 1} :{" "}
                          {formatDateTime(forecastItem.dt_txt)}
                        </p>
                        <i
                          className={`wi wi-day-${forecastItem.weather[0].main.toLowerCase()} text-2xl p-2 text-white`}
                        ></i>
                        <p className="text-2xl font-semibold text-white">
                          {forecastItem.main.temp}°C
                        </p>
                      </div>
                    ))}
                  </div>
                  <h2 className="text-center text-xl my-3 py-2 w-[90%] text-white font-bold mb-4 bg-opacity-50 rounded-md bg-black">
                    Previous 7-Day Forecast
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                    {data?.pastWeather?.map((forecastItem, index) => (
                      <div
                        key={index}
                        className="weather-card p-4 m-2 bg-gradient-to-b from-purple-400 to-purple-600 border rounded-md flex flex-col items-center justify-center shadow-md"
                      >
                        <p className="text-white">
                          Day {index + 1} : {formatDateTime(forecastItem?.date)}
                        </p>
                        <p className="text-2xl font-semibold text-white">
                          {forecastItem?.temperature}°C
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => setShow7days(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default WeatherDisplay;
