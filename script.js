"use strict";

class Weather {
  constructor(data) {
    this.temperature = data.current.temp_f;
    this.description = data.current.condition.text;
    this.icon = data.current.condition.icon;
    this.city = data.location.name;
  }

  display() {
    document.getElementById("weather").innerHTML = `
        <h2>${this.city}</h2>
        <img src="https:${this.icon}" alt="weather icon"/>
        <p>Temperature: ${this.temperature}</p>
        <p>Description: ${this.description}</p>
        `;
  }
}

async function getWeatherData(location) {
  const apiKey = "f7e69da819a94135bb722325240702";
  const url = "http://api.weatherapi.com/v1/current.json?key=";

  try {
    const response = await fetch(url + `${apiKey}&q=${location}`);
    const data = await response.json();
    return new Weather(data);
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById("locationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const location = document.getElementById("locationInput").value.trim();
    if (location) {
      const weather = await getWeatherData(location);
      if (weather) {
        weather.display();
      } else {
        document.getElementById("weather").innerHTML =
          "<p>Weather info is not available for this location.</p>";
      }
    }
  });
