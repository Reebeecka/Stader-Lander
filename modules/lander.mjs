import { printStad } from "./stader.mjs";
import { ReadWikiAPI } from "./PrintCityinfo.mjs";
//import { removeStorage } from "./localStorage.mjs";

// export only top-level function (printLands)
export function printLands() {
  //Get lander's data from JSON.
  fetch("json/land.json")
    .then((response) => response.json())
    .then((data) => data.forEach((land) => printLand(land)));
}

// print one country at a time (called from inside the fetch chain)
function printLand(land) {
  let landNav = document.getElementById("land");
  let landName = document.createElement("li");
  //Add text to LI element with the name of the Country
  landName.innerText = land.countryname;
  // Append the Li element to the UL thats already in HTML
  landNav.prepend(landName);

  //Create eventlistener for every contry
  landName.addEventListener("click", function () {

    //Stader is an ul list in index.html and section is also in main
    let stader = document.getElementById("stader");
    let section = document.getElementById("section");
    let clear = document.getElementById("clear");
    //Clear stader and section to only show one contries cities
    stader.innerHTML = "";
    section.innerHTML = "";
    clear.innerHTML = "";
    //call printStad, and send the ID of the contry you just clicked. IN Stader.mjs
  
    printCountry(land);
    printStad(land.id);
  })
}

//ONÖDIG FUNKTION BARA FÖR KUL
async function printCountry(land){
  console.log(land.countryname);
let wikiURL = "https://sv.wikipedia.org/w/rest.php/v1/search/page?q=" + land.countryname + "&limit=1";
let s = await ReadWikiAPI(wikiURL);

// //Creates H1 element that writes out Country name
let contryH1 = document.createElement("h1");
contryH1.innerText = land.countryname;
// //Fetches from Wiki to print out a description of the contry
let contryDescription = document.createElement("h3");
contryDescription.innerHTML = s.pages[0].description;

let contryImg = document.createElement("img");
contryImg.src = s.pages[0].thumbnail.url;

let description = document.createElement("p");
description.innerHTML = "Till vänster ser du några av " + land.countryname + "s städer, tryck på en av dessa för mer infomration!"
let section = document.getElementById("section");
section.append(contryH1, contryDescription, contryImg, description);
}



