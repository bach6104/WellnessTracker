import React from 'react';
import useWeatherData from '../hooks/useWeatherData'; // Ensure correct import path

export const WeatherImage = () => {
    const { weatherData, loading, error } = useWeatherData();

    if (loading) return <div className="text-center text-gray-500">Loading weather image...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    // Add a check to ensure weatherData and current weather are available
    if (!weatherData || !weatherData.current || !weatherData.current.weather) {
        return <div className="text-center text-gray-500">Weather data not available</div>;
    }

    const weatherImages = {
        Clear: '/day_clear.png',
        Clouds: '/cloudy.png',
        Rain: '/rain.png',
        Snow: '/snow.png',
        Thunderstorm: '/thunder.png',
        Drizzle: '/images/drizzle.png',
        Mist: '/mist.png',
    };

    const weatherType = weatherData.current.weather[0].main;
    const imageSrc = weatherImages[weatherType] || '/day_clear.png';

    return (
        <div className="flex flex-col items-center p-4 bg-blue-100 rounded-xl shadow-md">
            <img src={imageSrc} alt={weatherType} className="w-32 h-32 object-contain" />
            <p className="mt-2 text-lg font-semibold text-blue-700">{weatherType}</p>
        </div>
    );
};