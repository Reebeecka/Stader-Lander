import { SaveToStorage } from "./localStorage.mjs";

async function ReadAPI(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function readWeatherAync(stad) {
    let cityname = stad.stadname;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=8a2c10b1ad16525bbb3226ccdfbfe9cb";
    let g = await ReadAPI(url);
    console.log(g.main.temp_min);
    console.log(g.main.temp_max);
    console.log(g.main.pressure);
    console.log(g.main.humidity);
    //Finds the section already in HTML and clears in to only get one city
    let section = document.getElementById("section");
    section.innerHTML = "";
    //Creates H1 and P element to wirte out the Cityname and popluation
    let stadH1 = document.createElement("h1");
    stadH1.innerText = stad.stadname;
    let stadP = document.createElement("label");
    stadP.innerText = "Population::" + stad.population;
    let stadmaxtemp = document.createElement("label");
    stadmaxtemp.innerText = "Maximum_Tepmarature::" + g.main.temp_max;
    let stadMainTemp = document.createElement("label");
    stadMainTemp.innerText = "Maimum_Tepmarature::" + g.main.temp_min;
    let stadPressure = document.createElement("label");
    stadPressure.innerText = "Pressure::" + g.main.pressure;
    //Create Button for visited city
    let btnVisited = document.createElement("button");
    btnVisited.innerText = "Jag har besökt denna stad!";

    section.append(stadmaxtemp, stadMainTemp, stadPressure, stadH1, stadP, btnVisited,);

    //Add eventlistener and give the new funtion acess to stad.ID, new function in LocalStorage
    btnVisited.addEventListener("click", function () {
        let pressedBtnText = document.createElement("p");
        pressedBtnText.innerText = "Fint! Staden är nu inlagd i dina besökta städer!";
        section.append(pressedBtnText);
        //In LocalStorage.mjs
        SaveToStorage(stad.id);
    });
};