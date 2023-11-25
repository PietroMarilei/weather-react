import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=28.6358&longitude=77.2245&current=temperature_2m,precipitation,weather_code&forecast_days=1";
  return (
    <>
      <div className="my--container border w-screen">
        <h1 className=" text-2xl font-bold p-3 text-center">Weather App</h1>
        <div className="top">
          <div className="location">
            <p className="border-2 border-purple-500">Rome</p>
          </div>
          <div className="temp">
            <h1>24 °C</h1>
          </div>
          <div className="description">
            <p>Sunny?</p>
          </div>
        </div>
        {/* --- lower section*/}
        <div className="bottom">
          <div className="humidity">
            <p>20%</p>
          </div>
          <div className="wind"></div>
        </div>
      </div>
    </>
  );
}

export default App
