const apikey = "18d510a44dmsh7e8960491bf88e1p18ead4jsnbf0b22fff27f"; 
const apiHost = "weatherapi-com.p.rapidapi.com";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".icon");

const conditionMap = {
  1000: "sun.png",
  1003: "partlycloudy.png",
  1006: "cloudy.png",
  1009: "cloudy.png",
  1030: "mist.png",
  1063: "rain.png",
  1066: "snow.png",
  1087: "thunderstorm.png",
  1135: "fog.png",
  1180: "rain.png",
  1192: "heavyrain.png",
  1225: "heavysnow.png",
  1276: "thunderstorm.png"
};

async function checkWeather(city) {
  try {
    const url = `https://${apiHost}/current.json?q=${city}`;
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": apiHost,
      },
    });

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector(".city").textContent = data.location.name;
    document.querySelector(".temp").textContent = `${data.current.temp_c}°C`;
    document.querySelector(".humidity").textContent = `${data.current.humidity}%`;
    document.querySelector(".wind").textContent = `${data.current.wind_kph} km/h`;

    const code = data.current.condition.code;
    weathericon.src = `images/${conditionMap[code] || "default.png"}`;

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  } catch {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

function handleSearch() {
  const city = searchbox.value.trim();
  if (!city) return;
  checkWeather(city);
}

searchbtn.addEventListener("click", handleSearch);
searchbox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
