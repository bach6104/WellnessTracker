import React from 'react';
import useWeatherData from '../hooks/useWeatherData';

export const TodaySummary = () => {
    const { weatherData, loading, error } = useWeatherData();

    if (loading) return <div className="text-center text-gray-500">Loading today's weather...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    // If weather data is not available
    if (!weatherData || !weatherData.current) {
        return <div className="text-center text-gray-500">Weather data not available</div>;
    }

    const current = weatherData.current;

    return (
        <div className="p-6 bg-green-100 rounded-xl shadow-md space-y-2">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Today's Weather</h2>
            <p className="text-lg"><span className="font-semibold">Temperature:</span> {current.temp}°F</p>
            <p className="text-lg"><span className="font-semibold">Humidity:</span> {current.humidity}%</p>
            <p className="text-lg capitalize"><span className="font-semibold">Condition:</span> {current.weather[0].description}</p>
        </div>
    );
};