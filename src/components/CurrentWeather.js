import React from "react";
import "../App.css";
function CurrentWeather({CITY,weatherData,iconUrl,nightMode}){
    return(
        <div className={nightMode?"weather-card weather-card-night card rounded-box grid place-items-center":"weather-card card rounded-box grid place-items-center"}>
            <h2 className='weather-city part-title'>{CITY}</h2>
            <div className="flex w-full flex-col lg:flex-row gap-1">
              <div className={nightMode?"card temp temp-night grid flex-grow ":"card temp grid flex-grow "}> 
                <h4 style={{fontWeight:600}}>Now</h4>
                
                <div className='weather-icon' style={{margin:'0 auto'}}>
                  {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
                </div>
                <h4>{weatherData ? weatherData.weather[0].description : 'Loading...'}</h4>
                <h3 className={nightMode?'temperature temperature-night':'temperature'}>{weatherData ? `${weatherData.main.temp} °C` : 'Loading...'}</h3>
                <h4 className='feels-like'>Feels Like:<span> {weatherData ? `${weatherData.main.feels_like} °C` : 'Loading...'}</span></h4>
              </div>
              <div className={nightMode?"card details details-night grid  flex-grow place-items-center":"card details grid  flex-grow place-items-center"}>
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
    );
}

export default CurrentWeather;