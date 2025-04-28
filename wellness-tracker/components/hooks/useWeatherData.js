import { useState, useEffect } from 'react';

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "bf0f9569cc35369dabefb0cd17f24f66";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError('Location access denied.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported.');
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      );
      if (!response.ok) throw new Error('Weather data not found');
      const data = await response.json();
      setWeatherData(data);
    } catch {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error };
};

export default useWeatherData;
