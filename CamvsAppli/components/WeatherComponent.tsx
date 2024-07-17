import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherComponentProps {
  lat: number;
  lon: number;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = 'a2a7b7f262c2dffe0892574fde40594c';

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: WeatherData = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  const getWeatherIcon = (iconCode: string): string => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!weatherData) return null;

  return (
    <div className='container d-flex '>
      <h6 className="m-2 my-auto text-uppercase">{weatherData.name} </h6>
      {/* ou  à */}
      <div className="row">
        <div className="d-flex justify-content-between align-middle">
        <img 
          src={getWeatherIcon(weatherData.weather[0].icon)} 
          alt={weatherData.weather[0].description}
          style={{ width: '80px', height: 'auto'   }}
          className="m-2"
        />
        
        <p className="m-2 my-auto">Température: {weatherData.main.temp}°C</p>
        {/* <p>Conditions: {weatherData.weather[0].description}</p> */}
        <p className="m-2 my-auto">Humidité: {weatherData.main.humidity}%</p>
        
        <p className="m-2 my-auto">Vent: {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
