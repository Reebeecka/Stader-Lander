import { citiesVisited } from "./localStorage.mjs";
import { readWeatherAync } from "./PrintCityinfo.mjs";


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

async function getStartObjById(Id) {
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

//Maybe in NEW MJS file called (PrintoutLocalStorage?)
export async function printVisitedCities() {
  //read all saved cities
  let visitedCities = citiesVisited();

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

export async function population() {

  let visitedId = JSON.parse(localStorage.getItem('ID')) || [];

  let totPop = 0;
  for (let i = 0; i < visitedId.length; i++) {

    const element = visitedId[i];

    let popCity = await getStartObjById(element);

    totPop = totPop + popCity.population;

  }

  let allPopulation = document.createElement("p");
  allPopulation.innerHTML = totPop;

  let section = document.getElementById("section");
  section.append(allPopulation);
}
