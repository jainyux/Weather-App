const apikey = "54ba13077a9edc2fdb7176eb181e8bd8";

const weatherdatael = document.getElementById("weather-data");
const cityinputel = document.getElementById("city-input");

const formel = document.querySelector("form");

formel.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityvalue = cityinputel.value;
    getWeatherData(cityvalue);
    
});


async function getWeatherData(cityvalue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`)
    if(!response.ok){
throw new Error("Network response was not ok")
    }

    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed} m/s`,

]

weatherdatael.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    

weatherdatael.querySelector(".temperature").textContent = `${temperature}°C`;
weatherdatael.querySelector(".description").textContent = `${description}`;
weatherdatael.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherdatael.querySelector(".icon").innerHTML = "";
    

weatherdatael.querySelector(".temperature").textContent = "";
weatherdatael.querySelector(".description").textContent = "An error happened, please try again later";
weatherdatael.querySelector(".details").innerHTML = "";
    }
}