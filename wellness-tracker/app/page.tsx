"use client";

import React, { useEffect, useState } from 'react';
import { TodaySummary } from '@/components/Weather/TodaySummary';
import { WeatherImage } from '@/components/Weather/WeatherImage';
import { UpcomingForecast } from '@/components/Weather/UpcomingForecast';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import useWeatherData from '@/components/hooks/useWeatherData';
// import { fetchQuote } from '@/components/hooks/useQuote';

const Page = () => {
  const { weatherData, loading, error } = useWeatherData();
  const [quote, setQuote] = useState<string>('');
  const [locationError, setLocationError] = useState('');

  // Handle fetching random quote or daily quote
  const fetchQuote = async (type: 'random' | 'today') => {
    try {
      const response = await fetch('/api/zenquote');
      const data = await response.json();
      setQuote(`${data[0]?.q} — ${data[0]?.a}`);
    } catch (err) {
      console.error('Quote fetch error:', err);
      setQuote('Failed to fetch quote.');
    }
  };

  useEffect(() => {
    fetchQuote('random');
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full p-4 flex justify-between items-center border-b bg-white sticky top-0 z-50">
        <h1 className="text-xl font-bold">🌤️ Get Weather</h1>
        <nav className="flex-1 flex justify-center space-x-4">
          <a href="#" className="hover:underline">Home</a>
        </nav>
        <div>
          <a href="#" className="hover:underline">About</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-2 gap-4 p-6">
        <Card>
          <CardContent className="p-4">PIC</CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">PIC</CardContent>
        </Card>
      </section>

      {/* Main Content Section */}
      <main className="flex flex-1 p-6 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4 w-1/2">
          {locationError && <p className="text-red-500">{locationError}</p>}
          <Card>
            <CardContent>
              <WeatherImage />
              <TodaySummary />
              <UpcomingForecast />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="w-1/2">
          <Card className="h-full">
            <CardContent className="p-4 h-full">
              <h2 className="font-semibold mb-2">Quotes:</h2>
              <p className="mb-4">{quote || 'Loading...'}</p>
              <div className="flex gap-2">
                <Button onClick={() => fetchQuote('random')}>Random Quote</Button>
                <Button onClick={() => fetchQuote('today')}>Daily Quote</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* About Me Section */}
      <section className="p-6 border-t">
        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <p>This site was built to inspire people through the weather and quotes. Made with love using OpenWeather and ZenQuotes APIs.</p>
      </section>

      {/* Footer */}
      <footer className="p-4 border-t text-center text-sm">
        Credits: <a href="https://openweathermap.org/" target="_blank" className="underline">OpenWeatherAPI</a>, <a href="https://zenquotes.io/" target="_blank" className="underline">ZenQuotes API</a>
      </footer>
    </div>
  );
};

export default Page;