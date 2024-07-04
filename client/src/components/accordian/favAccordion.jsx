import { useState } from "react";

const AccordionItem = ({ city, weather }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="  bg-gray-800 text-white ">
      <button
        onClick={toggleAccordion}
        className="w-full text-left p-4 text-lg font-semibold  flex justify-between items-center"
      >
        <span>{city}</span>
        <svg
          className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-md text-white shadow-md">
            <p className="font-semibold">Temperature: {weather?.main.temp}°C</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-md text-white shadow-md">
            <p className="font-semibold">
              Feels Like: {weather?.main.feels_like}°C
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-md text-white shadow-md">
            <p className="font-semibold">
              Air Quality: {weather?.airQuality.list[0].main.aqi}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 rounded-md text-white shadow-md">
            <p className="font-semibold">Forecast:</p>
            <ul className="space-y-2">
              {weather?.forecast?.map((day, index) => (
                <li key={index}>
                  {day.dt_txt}: {day.main.temp}°C
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
