import { useState } from 'react';
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Latur",
        feelsLike: 32.63,
        humidity: 14,
        temp: 35.13,
        temp_max: 35.13,
        temp_min: 35.13,
        weather: "Clear sky",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return(
        <div className="weather-app">
            <div className="weather-container">
                <div className="app-header">
                    <h1>Weather Forecast</h1>
                    <p>Get real-time weather updates for any location</p>
                </div>
                <SearchBox updateInfo={updateInfo} />
                <InfoBox info={weatherInfo}/>
                <div className="app-footer">
                    <p>Weather App by Anzar</p>
                </div>
            </div>
        </div>
    );
}