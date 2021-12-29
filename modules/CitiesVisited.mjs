import { removeStorage } from "./localStorage.mjs";
import { printVisitedCities, population } from "./CitiesVisitedInfo.mjs";
import { switchColors } from "./lander.mjs";

export function CitiesVisitedLiElement() {
    //create button for to show "Cities I visited"(Städer jag besökt) list in the main
    let btnVisited = document.createElement("li");
    btnVisited.innerText = "Städer jag besökt";
    btnVisited.className="Contries";
    let landNav = document.getElementById("land");
    landNav.append(btnVisited);

    //create eventlistener to "Städer jag besökt" button
    btnVisited.addEventListener("click", function () {
        let clear = document.getElementById("clear");
        clear.innerHTML = "";

        //In citesVistedInfo.mjs
        printVisitedCities();
        population();
        switchColors(btnVisited);

        //create button for clear localstorage id in the main page
        let btnClear = document.createElement("button");
        btnClear.innerText = "Töm min lista";
        clear.append(btnClear);

        //Add eventlistener and give the new function to clear the localstorage data
        btnClear.addEventListener("click", function () {
            let section = document.getElementById("section");
            let stader = document.getElementById("stader");
            section.innerHTML = "";
            stader.innerHTML = "";

            //In localStorage.mjs
            removeStorage();
        });
    });
};