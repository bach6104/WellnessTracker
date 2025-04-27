import React from 'react';
import useWeatherData from '../hooks/useWeatherData'; // Ensure correct import path

export const UpcomingForecast = () => {
    const { weatherData, loading, error } = useWeatherData();

    if (loading) return <div className="text-center text-gray-500">Loading forecast...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    // Ensure weatherData.daily exists and is an object with expected data
    if (!weatherData || !weatherData.daily || typeof weatherData.daily !== 'object') {
        return <div className="text-center text-gray-500">Forecast data not available</div>;
    }

    const daily = Object.values(weatherData.daily).slice(1, 6); // Convert to array and slice to get the next 5 days

    return (
        <div className="p-6 bg-yellow-100 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">Upcoming Days</h2>
            <div className="space-y-3">
                {daily.map((day, index) => {
                    const date = new Date(day.dt * 1000); // Convert timestamp to JS Date
                    const options = { weekday: 'long' }; // Get full weekday name
                    const dayName = date.toLocaleDateString('en-US', options);

                    return (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                            <p className="text-lg font-semibold text-gray-800">{dayName}</p>
                            <p className="text-gray-600">Temp: {day.temp.day}°F</p>
                            <p className="text-gray-600">Condition: {day.weather[0].main}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};