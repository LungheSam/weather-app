import React from "react";
import "../App.css";
function Today({todayForecast,nightMode}) {

    return(
        <div className={nightMode?"weather-card weather-card-night card 3-hours-daily-forecast":"weather-card card 3-hours-daily-forecast"}> 
                <h1 style={{textAlign:'left'}} className="part-title">Today</h1>
                <div className='today-forecast'>
                  {todayForecast.map((weather, index) => {
                    const temp = weather.main.temp;
                    const iconCode = weather.weather[0].icon;
                    const hour = new Date(weather.dt * 1000).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true
                    });

                    return (
                      <div key={index} className={nightMode?'today-forecast-card today-forecast-card-night':'today-forecast-card'}>
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
    );

}
export default Today;