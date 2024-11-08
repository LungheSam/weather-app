import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';

function App() {
  const [nightMode, setNightMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const API_KEY = 'e42271f29595c6ba99fbbe289cb312b9';
  const CITY = 'London'; // Change to your preferred city

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {setWeatherData(data);console.log(data)})
      .catch(err => console.error(err));
  }, [CITY, API_KEY]);

  const iconUrl = weatherData? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`: '';
  const [todayForecast, setTodayForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayWeatherData = async () => {
      try {
        setLoading(true);
        
        // Get latitude and longitude for the city
        const geocodeResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY}`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length === 0) {
          throw new Error('City not found');
        }

        const { lat, lon } = geocodeData[0];

        // Get 5-day weather forecast and filter for today
        const forecastResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        const threeHoursData=forecastData.list.slice(0,8);
        setTodayForecast(threeHoursData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayWeatherData();
  }, [CITY]);


  const [dailyForecast, setDailyForecast] = useState([]);
  useEffect(() => {
    const fetchDailyWeatherData = async () => {
      try {
        setLoading(true);

        // Get latitude and longitude for the city
        const geocodeResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY}`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length === 0) {
          throw new Error('City not found');
        }

        const { lat, lon } = geocodeData[0];

        // Get 5-day weather forecast and filter for daily data
        const forecastResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        // Filter for a single entry per day around "12:00:00" for daily summary
        const dailyData = forecastData.list.filter(entry => entry.dt_txt.includes("12:00:00"));

        setDailyForecast(dailyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyWeatherData();
  }, [CITY]);

  return (
    <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
      <Header nightMode={nightMode} setNightMode={setNightMode} />
      <div className="main-weather-container">
          <div className="weather-card card rounded-box grid place-items-center">
            <h2 className='weather-city'>{CITY}</h2>
            <div className="flex w-full flex-col lg:flex-row gap-1">
              <div className="card temp grid flex-grow "> 
                <h4>Now</h4>
                <h4>{weatherData ? weatherData.weather[0].description : 'Loading...'}</h4>
                <div className='weather-icon' style={{margin:'0 auto'}}>
                  {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
                </div>
                <h3 className='temperature'>{weatherData ? `${weatherData.main.temp} °C` : 'Loading...'}</h3>
                <h4 className='feels-like'>Feels Like:<span> {weatherData ? `${weatherData.main.feels_like} °C` : 'Loading...'}</span></h4>
              </div>
              <div className="card details grid  flex-grow place-items-center">
                <div className='small-card humidity-container'>
                  <h4><i className='bx bxs-droplet'></i> Humidity </h4>
                  <h3 style={{marginLeft:"0.2rem"}}> {weatherData? `${weatherData.main.humidity}%` : 'Loading...'}</h3>
                </div>
                <div className='small-card wind-container'>
                  <h4><i className='bx bx-wind' ></i> Wind </h4>
                  <h3 style={{marginLeft:"0.2rem"}}> {weatherData? `${weatherData.wind.speed} km/h` : 'Loading...'}</h3>
                </div>
                <div className='small-card pressure-container'>
                  <h4><i className='bx bxs-tachometer' ></i> Pressure </h4>
                  <h3 style={{marginLeft:"0.2rem"}}> {weatherData? `${weatherData.main.pressure} hPa` : 'Loading...'}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="weather-card card 3-hours-daily-forecast"> 
                <h1>Today</h1>
                <div className='today-forecast'>
                  {todayForecast.map((weather, index) => {
                    const temp = weather.main.temp;
                    const iconCode = weather.weather[0].icon;
                    const hour = new Date(weather.dt * 1000).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true
                    });

                    return (
                      <div key={index} className='today-forecast-card'>
                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{temp}°C</p>
                        <img
                          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ width: '50px', height: '50px' }}
                        />
                        <p style={{ fontSize: '0.9rem' }}>{hour}</p>
                      </div>
                    );
                  })}
                </div>
          </div>
          <div style={{ width: '100%', marginTop: '1rem' }}>
            <h1>Daily Forecast</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                  <th style={{ textAlign: 'center', padding: '10px' }}>Weather</th>
                  <th style={{ textAlign: 'right', padding: '10px' }}>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {dailyForecast.map((weather, index) => {
                  const date = new Date(weather.dt * 1000);
                  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                  const temp = weather.main.temp;
                  const iconCode = weather.weather[0].icon;

                  return (
                    <tr key={index} style={{ border: 'none' }} className='forecast-row'>
                      <td style={{ padding: '10px',textAlign:'left' }}>{day}</td>
                      <td style={{ textAlign: 'center' }}>
                        <img
                          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ width: '40px', height: '40px', margin:'0 auto' }}
                        />
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px' }}>{temp}°C</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
      </div>
    </div>
        );
}

export default App;
