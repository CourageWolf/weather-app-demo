import "./App.css";
import React, { useState } from "react";

// Store API url to get weather data
const api = {
  base: "https://api.open-meteo.com/v1/forecast",
};

// Decalare a map from weather codes to their interpretations
// TO DO: Extend this map to contain all weather codes
const weatherInterpretationCodes = new Map([
  [0, "Clear sky"],
  [1, "Mainly clear"],
  [2, "Partly cloudy"],
  [3, "Overcast"],
  [61, "Rain"],
  [71, "Snow"],
  [95, "Thunderstorm"],
]);

function App() {
  const [weather, setWeather] = useState({});

  // Handle API request in a callback
  const getWeather = () => {
    fetch(
      `${api.base}?latitude=34.05&longitude=-118.24&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  // Declare a utility function to get today's date
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.current_weather != "undefined"
          ? weather.current_weather.temperature < 50
            ? "app"
            : "app warm"
          : "app"
      }
    >
      <main>
        {/* TO DO: Add a dropdown menu or textbox to allow searching by city or by latitude and logitude */}
        <div className="location-box">
          <div className="location">Los Angeles, US</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box" onClick={getWeather}>
          <div className="temp">
            {typeof weather.current_weather != "undefined"
              ? `${weather.current_weather.temperature}???`
              : "Get Weather"}
          </div>
          <div className="weather">
            {typeof weather.current_weather != "undefined"
              ? weatherInterpretationCodes.get(
                  weather.current_weather.weathercode
                )
              : ""}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
