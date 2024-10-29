const config = {
    API_KEY: 'ef4159fb485d8e83a077ed696c435bb2',
    API_URL: 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=',
    ICON_URL: 'https://openweathermap.org/img/wn/'
};

const elements = {
    cityInput: document.querySelector('.city-input'),
    citySearch: document.querySelector('.city-search'),
    mainSection: document.querySelector('.main'),
    errorElement: document.querySelector('.error-message'),
    temp: document.querySelector('.temp'),
    cityName: document.querySelector('.city-name'),
    humidity: document.querySelector('.humidity'),
    wind: document.querySelector('.wind'),
    weatherIcon: document.querySelector('.weather-icon')
};

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${config.API_URL}${config.API_KEY}&q=${city}`);

        if (!response.ok) {
            if (response.status === 404) throw new Error(`City "${city}" not found`);
            throw new Error(`Error fetching data`);
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        displayErrorMessage(error.message);
    }
}

function updateUI({ main: { temp, humidity }, name, wind: { speed }, weather }) {
    elements.temp.innerHTML = `${Math.round(temp)}°C`;
    elements.cityName.innerHTML = name;
    elements.humidity.innerHTML = `${humidity}% Humidity`;
    elements.wind.innerHTML = `${speed}km/h Wind`;

    elements.weatherIcon.src = `${config.ICON_URL}${weather[0].icon}@4x.png`;
    elements.errorElement.style.display = 'none';
    elements.mainSection.style.display = 'block';
}

function displayErrorMessage(message) {
    elements.errorElement.innerHTML = message;
    elements.errorElement.style.display = 'block';
    elements.mainSection.style.display = 'none';
}

function init() {
    elements.citySearch.addEventListener('click', () => fetchWeatherData(elements.cityInput.value));
}

init();