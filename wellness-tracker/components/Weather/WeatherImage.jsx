import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useWeatherData from '../hooks/useWeatherData';

export const WeatherImage = () => {
    const { weatherData, loading, error } = useWeatherData();

    if (loading) return <div className="text-center text-gray-500">Loading weather image...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;


    if (!weatherData || !weatherData.current || !weatherData.current.weather) {
        return <div className="text-center text-gray-500">Weather data not available</div>;
    }

    // Lottie animations !!
    const weatherAnimations = {
        Clear: '/animations/clear.lottie',
        Clouds: '/animations/clouds.lottie',
        Rain: '/animations/rain.lottie',
        Snow: '/animations/snow.lottie',
        Thunderstorm: '/animations/thunder.lottie',
        Drizzle: '/animations/mist.lottie',
        Mist: '/animations/mist.lottie',
    };

    const weatherType = weatherData.current.weather[0].main;
    const animationSrc = weatherAnimations[weatherType] || '/animations/sunny.lottie';

    return (
        <div className="flex flex-col items-center p-4 bg-blue-100 rounded-xl shadow-md">
            <div className="w-40 h-40">
                <DotLottieReact
                    src={animationSrc}
                    autoplay
                    loop
                />
            </div>
        </div>
    );
};