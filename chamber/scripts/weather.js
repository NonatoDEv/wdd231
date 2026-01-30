const API_KEY = 'f596e2462569eba4c9f3bc1d8310b710';
const LAT = '-13.4167';
const LON = '-76.1333';

export async function initWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);
        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error(`API status: ${currentRes.status}`);
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.warn("Failsafe activated: API key pending or network error.", error);
        handleWeatherError();
    }
}

function displayCurrentWeather(data) {
    const container = document.querySelector('#weather-data');
    if (!container) return;

    const temp = data.main?.temp?.toFixed(0) ?? "N/A";
    const desc = data.weather?.[0]?.description ?? "No data";
    const high = data.main?.temp_max?.toFixed(0) ?? "N/A";
    const low = data.main?.temp_min?.toFixed(0) ?? "N/A";
    const humidity = data.main?.humidity ?? "N/A";

    const iconCode = data.weather?.[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";

    const formatTime = (unix) => {
        if (!unix) return "N/A";
        let date = new Date(unix * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const sunrise = formatTime(data.sys?.sunrise);
    const sunset = formatTime(data.sys?.sunset);
    
    container.innerHTML = `
        <div class="weather-card">
            <div class="weather-content">
                <img src="${iconUrl}" alt="${desc}" class="weather-icon">
                <div class="weather-stats">
                    <p class="main-temp"><strong>${temp}°C</strong></p>
                    <p class="description">${desc}</p>
                    <p>High: ${high}°</p>
                    <p>Low: ${low}°</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                </div>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.querySelector('#forecast-content');
    if (!container) return;

    const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

    container.innerHTML = forecastList.map(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const temp = day.main.temp.toFixed(0);

        return `
            <div class="forecast-item">
                <span class="forecast-day">${date}</span>
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="forecast-mini-icon">
                <span class="forecast-temp"><strong>${temp}°C</strong></span>
            </div>
        `;
    }).join('');
}

function handleWeatherError() {
    const mockCurrent = { main: { temp: 25, humidity: 70 }, weather: [{ description: "API Key pending activation" }] };
    const mockForecast = { list: [
        { dt: Date.now()/1000 + 86400, main: { temp: 24 } },
        { dt: Date.now()/1000 + 172800, main: { temp: 26 } },
        { dt: Date.now()/1000 + 259200, main: { temp: 23 } }
    ]};
    displayCurrentWeather(mockCurrent);
    displayForecast(mockForecast);
}

