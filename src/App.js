import './App.css';
import Header from './components/Header';
import Today from './components/Today';
import DailyForecast from './components/DailyForecast';
import CurrentWeather from './components/CurrentWeather';
import React, { useEffect, useState } from 'react';

function App() {
  const [nightMode, setNightMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const API_KEY = 'e42271f29595c6ba99fbbe289cb312b9';
  const [CITY,setCITY] = useState('London'); // Change to your preferred city
  const [inputCity,setInputCity] = useState(''); // Change to your preferred
  const [iconUrl,setIconUrl] = useState('')

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        if(Number(data.cod)!==404){
        setWeatherData(data);
        console.log(data);
        }
        else{
          setWeatherData(null);
        }
        
      })
      .catch(err => console.error(err));
    setIconUrl(weatherData? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`: '')
      
  }, [CITY, API_KEY]);

  // const iconUrl = weatherData? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`: '';
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
      } 
    };

    fetchDailyWeatherData();
  }, [CITY]);

  const handleChange = (event) => {
    setInputCity(event.target.value);
  };
  const handleSearchCity=(event) => {
    event.preventDefault();
    if (inputCity.trim()) {
      setCITY(inputCity.trim());
    }
  };
  let isWeatherThere=!(weatherData===null);
  
  return (
    <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
      <Header nightMode={nightMode} setNightMode={setNightMode} />
      <form className='city-input'>
        <i className='bx bxs-map' ></i>
        <input type="text" placeholder='Search here ...' value={inputCity} onChange={handleChange} />
        <button type='submit' onClick={handleSearchCity}><i className='bx bx-search-alt'></i></button>
      </form>
      {error && <p className="error-message">City not found. Please try again.</p>}
      {isWeatherThere ?(
        <div className="main-weather-container">
            <CurrentWeather CITY={CITY} weatherData={weatherData} iconUrl={iconUrl} nightMode={nightMode} />  
            <Today todayForecast={todayForecast} nightMode={nightMode}/>
            <DailyForecast dailyForecast={dailyForecast} nightMode={nightMode} />
        </div>):(
           <p>No data available for the specified city.</p>
        )
      }
    </div>
        );
}

export default App;
