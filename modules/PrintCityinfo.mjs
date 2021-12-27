import { SaveToStorage } from "./localStorage.mjs";

async function ReadAPI(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function ReadWikiAPI(wikiURL) {
    let response = await fetch(wikiURL);
    let data = await response.json();
    return data;
}

export async function readWeatherAync(stad) {
    //Fetches the correct API corresponding to the city you pressed in both Wikipedia and Weather
    let cityname = stad.stadname;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=8a2c10b1ad16525bbb3226ccdfbfe9cb&lang=se";
    let g = await ReadAPI(url);
    let wikiURL = "https://sv.wikipedia.org/w/rest.php/v1/search/page?q=" + cityname + "&limit=1";
    let w = await ReadWikiAPI(wikiURL);

    //Finds the section already in HTML and clears in to only get one city
    let section = document.getElementById("section");
    section.innerHTML = "";
    //Creates H1 element that writes out City name
    let stadH1 = document.createElement("h1");
    stadH1.innerText = stad.stadname;
    //Fetches from Wiki to print out a description of the city
    let cityDescription = document.createElement("h3");
    cityDescription.innerHTML = w.pages[0].description;
    //Fetches from Json to wite out population of city
    let stadP = document.createElement("p");
    stadP.innerText = "Invånarantal: " + stad.population;
    //Fetches img URL from API and puts it into imgtag to get an image of the city
    let cityImg = document.createElement("img");
    cityImg.src = w.pages[0].thumbnail.url;
    //Fetches the weather description from Weather API
    let weatherDescription = document.createElement("p");
    weatherDescription.innerHTML = "Idag är det " + g.weather[0].description;
    //Fetches Max temp from weatherAPI and converts it from String to number (43), then converts it from 
    //Kelvin to Celsius (45)
    //Then rounds the number to get rid of decimals (47)
    let stadmaxtemp = document.createElement("p");
    let maxTemp = parseInt(g.main.temp_max, 10);
    maxTemp = maxTemp - 273.15;
    maxTemp = Math.round(maxTemp);
    stadmaxtemp.innerText = "Med en högsta temperatur på " + maxTemp + " grader Celsius";
    //Same as above but with the lowest temprature
    let stadMinTemp = document.createElement("p");
    let minTemp = parseInt(g.main.temp_min, 10);
    minTemp = minTemp - 273.15;
    minTemp = Math.round(minTemp);
    stadMinTemp.innerText = " och en lägsta temperatur på " + minTemp + " grader Celsius";
    //Fetches the pressure from WeatherAPI (dont know if we need this?)
    let stadPressure = document.createElement("p");
    stadPressure.innerText = "Pressure: " + g.main.pressure;

    //Create Button for visited city
    let btnVisited = document.createElement("button");
    btnVisited.innerText = "Jag har besökt denna stad!";

    //Add eventlistener and give the new funtion acess to stad.ID, new function in LocalStorage
    let clickedbtn = false;
    btnVisited.addEventListener("click", function () {
        if (!clickedbtn) {
            clickedbtn = true;
            let pressedBtnText = document.createElement("p");
            pressedBtnText.innerText = "Fint! Staden är nu inlagd i dina besökta städer!";
            section.append(pressedBtnText);
            //In LocalStorage.mjs
            SaveToStorage(stad.id);
        }
    });

    //Appends everything in the order we want it to the section
    section.append(stadH1, cityDescription, stadP, cityImg, weatherDescription, stadmaxtemp, stadMinTemp, stadPressure, btnVisited);
};