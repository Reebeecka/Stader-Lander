import { citiesVisited } from "./localStorage.mjs";
import { printStadlocal } from "./stader.mjs";

export async function printVisitedCities() {
    //read all saved cities
    let visitedCities = citiesVisited();
    let stader = document.getElementById("stader");
    stader.innerHTML = "";
    let clear = document.getElementById("clear");
    clear.innerHTML = "";
    section.innerHTML = "";

    for (let i = 0; i < visitedCities.length; i++) {
        const element = visitedCities[i];
        let stadObj = await getStartObjById(element);
        //In stader.mjs
        printStadlocal(stadObj);
    }
}

export async function population() {
    let visitedId = JSON.parse(localStorage.getItem('ID')) || [];

    let totPop = 0;
    for (let i = 0; i < visitedId.length; i++) {
        const element = visitedId[i];
        let popCity = await getStartObjById(element);
        totPop = totPop + popCity.population;
    }

    totPop = formatNumber(totPop);
    function formatNumber(totPop) {
        return totPop.toLocaleString(); 
    }

    let description = document.createElement("p");
    description.innerHTML = "Här ovan ser du alla städer du besökt";

    let allPopulation = document.createElement("p");
    allPopulation.innerHTML = "Det totala invånarantalet av alla dessa städer är " + totPop;
    let section = document.getElementById("section");
    section.append(description, allPopulation);
}

async function getStartObjById(Id) {
    let h = "";
    let response = await fetch("json/stad.json");

    let data = await response.json();
    data.forEach((stad => {
        if (stad.id == Id) {
            h = stad;
        }
    }
    ));
    return h;
};