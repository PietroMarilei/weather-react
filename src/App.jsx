import { useState, useEffect } from "react";
import axios from "axios";
import cloudy from "./assets/img/cloudy.jpg";
import freezing from "./assets/img/freezing.jpg";
import storm from "./assets/img/storm.jpg";
import sunny from "./assets/img/sunny.jpg";
import rainy from "./assets/img/rainy.jpg";
import "./App.css";

function App() {
  const [locName, setLocName] = useState("");
  const [data, setData] = useState({
    current: {
      temperature_2m: "-",
      relative_humidity_2m: 0,
      precipitation: 0.0,
      weather_code: 0,
      wind_speed_10m: 0,
    },
  });
  const [currentLocation, setCurLoc] = useState();
  const [latitude, setLatitude] = useState(28.6358);
  const [longitude, setLongitude] = useState(77.2245);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&forecast_days=1`;

  const searchLocation = () => {
    console.log("searching... ->", locName);
    axios
      .get(`https://geocode.maps.co/search?q=${locName}`, {
        params: {},
      })
      .then(function (response) {
        setCurLoc(() => response.data[0].display_name);
        console.log(currentLocation);
        setLatitude(() => response.data[0].lat);
        console.log(latitude);
        setLongitude(() => response.data[0].lon);
        console.log(longitude);

        //fires Weather search
        axios
          .get(url, {
            params: {},
          })
          .then(function (response) {
            setData(() => response.data);
            console.log(data);
            setImgBg(() => imgSetter(response.data.current.weather_code));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function wcConverter(code) {
    switch (code) {
      case 0:
        return "☀️"; // Clear Sky
      case 1:
      case 2:
      case 3:
        return "🌤️"; // Mainly clear
      case 45:
      case 48:
        return "🌫️"; // Foggy
      case 51:
      case 53:
      case 55:
        return "🌧️"; // Drizzle
      case 56:
      case 57:
        return "🌨️"; // Freezing Drizzle
      case 61:
      case 63:
      case 65:
        return "🌧️"; // Rain: Slight
      case 66:
      case 67:
        return "❄️"; // Freezing Rain
      case 71:
      case 73:
      case 75:
        return "❄️"; // Snow fall
      case 77:
        return "❄️"; // Snow grains
      case 80:
      case 81:
      case 82:
        return "🌦️"; // Rain showers
      case 85:
      case 86:
        return "🌨️"; // Snow showers slight and heavy
      case 95:
        return "⛈️"; // Thunderstorm
      case 96:
      case 99:
        return "⛈️"; // Thunderstorm with hail
      default:
        return code;
    }
  }
  const [imgBg, setImgBg] = useState(cloudy);

  function imgSetter(code) {
    if (code === 0) {
      return sunny;
    } else if (code >= 1 && code <= 3) {
      return cloudy;
    } else if (code === 45 || code === 48) {
      return cloudy;
    } else if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65)) {
      return rainy;
    } else if ((code >= 56 && code <= 57) || (code >= 66 && code <= 67)) {
      return freezing;
    } else if (code >= 71 && code <= 75) {
      return freezing;
    } else if (code === 77) {
      return rainy;
    } else if ((code >= 80 && code <= 82) || (code >= 85 && code <= 86)) {
      return rainy;
    } else if (code === 95 || (code >= 96 && code <= 99)) {
      return storm;
    } else {
      return "./assets/img/cloudy.jpg";
    }
  }
  //  enter funct
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation(event.target.value);
    }
  };
  return (
    <>
      <div className="my--container border w-screen flex flex-col justify-between ">
        <div className="imgWrapper">
          <img id="BgImgs" src={imgBg} alt="a" />
        </div>
        <div className="top">
          <h1 className=" text-2xl font-bold p-3 text-center text-gray-700">
            Weather App
          </h1>
        </div>

        <div className="center flex flex-col justify-center items-center m-2">
          <div className="text-2xl font-bold">
            <input
              id="input"
              type="text"
              placeholder="Type a Location"
              className="rounded-md bg-slate-600/80 border-2 p-2 text-center max-w-xs"
              value={locName}
              onChange={(event) => setLocName(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button onClick={searchLocation} className="my_button  ">
            Search <span></span>
          </button>
          <div className="stats bg-slate-600/80 p-3 w-100 rounded-md">
            <p className="text-2xl font-bold capitalize">{locName}</p>
            <p className="text-m ">{currentLocation}</p>
            <hr className="my-2" />
            <p className="text-4xl font-bold">
              {data.current.temperature_2m} °C
            </p>
            <p className="text-4xl py-2">
              {wcConverter(data.current.weather_code)}
            </p>
            <p>Wind Speed: {data.current.wind_speed_10m}</p>
            <p>Humidity: {data.current.relative_humidity_2m}</p>
          </div>
        </div>
        {/* --- lower section*/}
        <div className="bottom">
          <div className="text-xl font-bold"></div>
        </div>
      </div>
    </>
  );
}

export default App;
