
const API_KEY = 'f596e2462569eba4c9f3bc1d8310b710';

export function initWeather() {
    const btn = document.getElementById('getLocationBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            btn.textContent = "Locating...";
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchWeatherData(lat, lon);
                    },
                    (error) => {
                        console.warn("Access denied, using default location.");
                        
                        fetchWeatherData(-13.4189, -76.1323); 
                    }
                );
            } else {
                fetchWeatherData(-13.4189, -76.1323);
            }
        });
    }
}
async function fetchWeatherData(lat, lon) {
    const container = document.getElementById('weatherContainer');
    container.innerHTML = `<p class="weatherStatusText">Loading weather data...</p>`;

    try {
        //if the API key is invalid or there's a network error, the response will not be ok
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const currentData = await currentRes.json();
        //if the response is not ok, it means the API key is invalid or there's a network error
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const forecastData = await forecastRes.json();

        //filtered forecast to get only the data for the next 3 days at 12:00 PM (noon)
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
        //draw the weather data on the page
        renderWeather(currentData, dailyForecasts);

    } catch (error) {
        console.error("Error fetching weather:", error);
        container.innerHTML = `<p class="weatherErrorText">Error loading weather connection.</p>`;
    }
}

function renderWeather(current, forecasts) {
    const container = document.getElementById('weatherContainer');
    
    //current weather icon URL
    const currentIcon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    //build the HTML for current weather and forecast cards
    let html = `
        <div class="currentWeatherBox">
            <h3 class="weatherCity">${current.name}</h3>
            <div class="weatherMainRow">
                <img src="${currentIcon}" alt="${current.weather[0].description}" class="currentWeatherIcon">
                <span class="currentTemp">${Math.round(current.main.temp)}°C</span>
            </div>
            <p class="weatherDesc">${current.weather[0].description}</p>
        </div>
        
        <div class="forecastTrack">
    `;
    //add a forecast card for each of the next 3 days
    forecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        html += `
            <div class="forecastCard">
                <span class="forecastDay">${dayName}</span>
                <img src="${icon}" alt="${day.weather[0].description}" class="forecastIcon">
                <span class="forecastTemp">${Math.round(day.main.temp)}°C</span>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}