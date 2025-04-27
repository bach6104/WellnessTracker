"use client";

import React, { useEffect, useState } from 'react';
import { TodaySummary } from '@/components/Weather/TodaySummary';
import { WeatherImage } from '@/components/Weather/WeatherImage';
import { UpcomingForecast } from '@/components/Weather/UpcomingForecast';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import useWeatherData from '@/components/hooks/useWeatherData';

const Page = () => {
  const [quote, setQuote] = useState<string>('');
  const [locationError, setLocationError] = useState('');

  const fetchQuote = async (type: 'today') => {
    try {
      const response = await fetch('/api/zenquote');
      const data = await response.json();
      setQuote(`${data[0]?.q} — ${data[0]?.a}`);
    } catch (err) {
      console.error('Quote fetch error:', err);
      setQuote('Failed to fetch quote.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full p-4 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">🌤️ WeatherMinds</h1>
        </div>
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <a href="#hero" className="hover:underline">Home</a>
        </nav>
        <div>
          <a href="#about" className="hover:underline">About Us</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-200 to-cyan-200 p-12 mb-6">
        <h1 className="text-4xl font-bold mb-4">WeatherMinds</h1>
        <p className="text-lg max-w-2xl">Discover your daily weather and a touch of motivation. WeatherMinds brings you real-time forecasts alongside uplifting quotes to keep your spirit bright and your day inspired.</p>
      </section>

      {/* Main Content Section */}
      <main className="flex flex-1 p-6 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4 w-1/2">
          {locationError && <p className="text-red-500">{locationError}</p>}
          <Card>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="flex w-full max-w-2xl gap-6">
                <div className="w-1/2">
                  <WeatherImage />
                </div>
                <div className="w-1/2">
                  <TodaySummary />
                </div>
              </div>
              <div className="w-full max-w-2xl">
                <UpcomingForecast />
              </div>
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
                <Button className="cursor-pointer" onClick={() => fetchQuote('today')}>Daily Quote</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* About Us Section */}
      <section id="about" className="p-6 border-t flex flex-col gap-12">
        <h2 className="text-3xl font-semibold text-center mb-8">About Us</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Card className="w-full md:w-1/2">
            <CardContent className="flex flex-col items-center p-6">
              <img src="/images/bach.jpeg" alt="Profile 1" className="w-32 h-32 rounded-full object-cover mb-4" />
              <p className="text-center">Hi! My name is Bach, I am a Junior majoring in Computer Science at Michigan State University. I love travelling and creating new meaningful application. Hope you all enjoy our product!</p>
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/2">
            <CardContent className="flex flex-col items-center p-6">
              <img src="/images/Headshot.png" alt="Profile 2" className="w-32 h-32 rounded-full object-cover mb-4" />
              <p className="text-center">Hey! My name's Luke, and I am currently a senior at Michigan State University. I am very interested in front-end web development, and I love to create sleek user interfaces. I hope you enjoy our site!</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 border-t text-center text-sm">
        Credits: <a href="https://openweathermap.org/" target="_blank" className="underline">OpenWeatherAPI</a>, <a href="https://zenquotes.io/" target="_blank" className="underline">ZenQuotes API</a>
      </footer>
    </div>
  );
};

export default Page;
