import React, { useState } from 'react';
import useWeatherData from '../hooks/useWeatherData';

export const UpcomingForecast = () => {
    const { weatherData, loading, error } = useWeatherData();
    const [isOpen, setIsOpen] = useState(false); // DROPDOWN menu

    if (loading) return <div className="text-center text-gray-500">Loading forecast...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    if (!weatherData || !weatherData.daily || typeof weatherData.daily !== 'object') {
        return <div className="text-center text-gray-500">Forecast data not available</div>;
    }

    const daily = Object.values(weatherData.daily).slice(1, 8);

    return (
        <div className="p-6 bg-yellow-100 rounded-xl shadow-md space-y-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-yellow-300 text-yellow-800 font-bold rounded-lg hover:bg-yellow-400 transition"
            >
                <span className='cursor-pointer'>Upcoming Days</span>
                <svg
                    className={`w-5 h-5 transform transition-transform cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="space-y-3">
                    {daily.map((day, index) => {
                        const date = new Date(day.dt * 1000);
                        const options = { weekday: 'long' };
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
            )}
        </div>
    );
};