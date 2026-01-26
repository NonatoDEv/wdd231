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

        // Verificamos si la API nos dio permiso (status 200)
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

    // Usamos Optional Chaining (?.) para evitar errores de "undefined"
    const temp = data.main?.temp?.toFixed(0) ?? "N/A";
    const desc = data.weather?.[0]?.description ?? "No data";
    const hum = data.main?.humidity ?? "N/A";

    container.innerHTML = `
        <div class="current-weather-info">
            <p><strong>${temp}°C</strong> - ${desc}</p>
            <p>Humidity: ${hum}%</p>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.querySelector('#forecast-content');
    if (!container) return;

    
    const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

    container.innerHTML = forecastList.map(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        return `
            <div class="forecast-item">
                <p>${date}: <strong>${day.main.temp.toFixed(0)}°C</strong></p>
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
