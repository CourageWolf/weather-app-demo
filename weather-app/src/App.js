import "./App.css";
import React, { useState } from "react";

const api = {
  base: "https://api.open-meteo.com/v1/forecast",
};

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
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${api.base}?latitude=34.05&longitude=-118.24&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

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
          ? weather.current_weather.temperature > 70
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        <div className="location-box">
          <div className="location">Los Angeles, US</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {typeof weather.current_weather != "undefined"
              ? weather.current_weather.temperature
              : 0}
            ℉
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
