import React from "react";

function DailyForecast({dailyForecast}){
    return(
        <div style={{ width: '100%', marginTop: '1rem' }}>
        <h1 style={{textAlign:'left',marginLeft:'1rem',fontWeight:'bold'}} className="part-title">Daily Forecast</h1>
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
    );
}

export default DailyForecast;