<<<<<<< Updated upstream
import { SaveToStorage } from "./localStorage.mjs";
=======
import { SaveToStorage, staderBesökt } from "./localStorage.mjs";
>>>>>>> Stashed changes

export function printStad(id) {
  //Get Stad's data from JSON.
  fetch("json/stad.json")
    .then((response) => response.json())
    .then((stads) => stads.filter((stad) => stad.countryid == id))
    .then((data) =>
      data.sort(function (a, b) {
        return a.stadname.localeCompare(b.stadname);
      })
    )
    .then((data) => data.forEach((stad) => printStad(stad)));

<<<<<<< Updated upstream
  function printStad(stad) {
    let stader = document.getElementById("stader");
    // Creates one LI element for each city
    let li = document.createElement("li");
=======
export async function getStartObjById(Id) {
  let h = "";
  let response = await fetch("json/stad.json");
  let data = await response.json();
  data.forEach((stad => {
    if (stad.id == Id) {
      h = stad;
    }

  }))
  return h;
}

export async function ReadAPI(url) {

  let response = await fetch(url);
  let data = await response.json();
  return data;
}
>>>>>>> Stashed changes

    // LI inner text is the cityname in the API
    li.innerText = stad.stadname;

    //appended li to ul
    stader.append(li);

<<<<<<< Updated upstream
    // Adds eventlistenes to the cities
    li.addEventListener("click", function () {
=======
//adding export function for reading weather from api
export async function readWeatherAync(stad) {
  let cityname = stad.stadname;

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=8a2c10b1ad16525bbb3226ccdfbfe9cb";
  let g = await ReadAPI(url);
  console.log(g.main.temp_min);
  console.log(g.main.temp_max);
  console.log(g.main.pressure);
  console.log(g.main.humidity);
>>>>>>> Stashed changes

  //Finds the section already in HTML and clears in to only get one city
  let section = document.getElementById("section");
  section.innerHTML = "";

<<<<<<< Updated upstream
      //Creates H1 and P element to wirte out the Cityname and popluation
      let stadH1 = document.createElement("h1");
      stadH1.innerText = stad.stadname;

      let stadP = document.createElement("p");
      stadP.innerText = stad.population;
=======
  //Creates H1 and P element to wirte out the Cityname and popluation
  let stadH1 = document.createElement("h1");
  stadH1.innerText = stad.stadname;



  let stadP = document.createElement("label");
  stadP.innerText = "Population::" + stad.population;

  let stadmaxtemp = document.createElement("label");
  stadmaxtemp.innerText = "Maximum_Tepmarature::" + g.main.temp_max;
>>>>>>> Stashed changes

  let stadMainTemp = document.createElement("label");
  stadMainTemp.innerText = "Maimum_Tepmarature::" + g.main.temp_min;

  let stadPressure = document.createElement("label");
  stadPressure.innerText = "Pressure::" + g.main.pressure;

  //Create Button for visited city
  let btnVisited = document.createElement("button");
  btnVisited.innerText = "Jag har besökt denna stad!";

  //Add eventlistener and give the new funtion acess to stad.ID, new function in LocalStorage
  btnVisited.addEventListener("click", function () {
    let pressedBtnText = document.createElement("p");
    pressedBtnText.innerText = "Fint! Staden är nu inlagd i dina besökta städer!";
    section.append(pressedBtnText);
    SaveToStorage(stad.id);
  });

  section.append(stadmaxtemp, stadMainTemp, stadPressure, stadH1, stadP, btnVisited,);

<<<<<<< Updated upstream
      section.append(stadH1, stadP, btnVisited);
    })
  }
}
=======
}
export async function printVisitedCities() {
  //read all saved cities
  let visitedCities = staderBesökt();

  let stader = document.getElementById("stader");
  stader.innerHTML = "";
  let clear = document.getElementById("clear");
  clear.innerHTML = "";

  for (let i = 0; i < visitedCities.length; i++) {
    const element = visitedCities[i];

    let stadObj = await getStartObjById(element);

    printStadlocal(stadObj);
  }

  section.innerHTML = "";

}

export function printStad(id) {
  //Get Stad's data from JSON.
  fetch("json/stad.json")
    .then((response) => response.json())
    .then((stads) => stads.filter((stad) => stad.countryid == id))
    .then((data) =>
      data.sort(function (a, b) {
        return a.stadname.localeCompare(b.stadname);
      })
    )
    .then((data) => data.forEach((stad) => printStadlocal(stad)));

}


export function printStadlocal(stad) {

  let stader = document.getElementById("stader");
  // Creates one LI element for each cit
  let li = document.createElement("li");

  // LI inner text is the cityname in the API
  li.innerText = stad.stadname;

  //appended li to ul
  stader.append(li);

  // Adds eventlistenes to the cities
  li.addEventListener("click", function () {

    readWeatherAync(stad);

  })
}

export async function population(){

  let visitedId = JSON.parse(localStorage.getItem('ID')) || [];
  
  let totPop = 0;
  for (let i = 0; i < visitedId.length; i++) {
   
    const element = visitedId[i];

    let popCity = await getStartObjById(element);

    totPop= totPop + popCity.population;

  }

  let allPopulation = document.createElement("p");
  allPopulation.innerHTML=totPop;

  let section = document.getElementById("section");
  section.append(allPopulation);
}
>>>>>>> Stashed changes
