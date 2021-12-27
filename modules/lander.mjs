<<<<<<< Updated upstream
import { printStad } from "./stader.mjs";
=======
import { printStad,printVisitedCities, population} from "./stader.mjs";
import { removeStorage} from "./localStorage.mjs";

>>>>>>> Stashed changes

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
  landNav.append(landName);

  //Create eventlistener for every contry
  landName.addEventListener("click", function(){
    //Stader is an ul list in index.html and section is also in main
    let stader = document.getElementById("stader");
    let section = document.getElementById("section");
    let clear = document.getElementById("clear");
    //Clear stader and section to only show one contries cities
    stader.innerHTML="";
    section.innerHTML="";
<<<<<<< Updated upstream
    //call printStad, and send the ID of the contry you just clicked. IN Stader.mjs
=======
    clear.innerHTML="";
    //call printStad, and send the ID of the contry you just clicked.
>>>>>>> Stashed changes
    printStad(land.id);
  })

}
<<<<<<< Updated upstream
=======


//create button for to show "Cities I visited"(Städer jag besökt) list in the main
let btnVisited=document.createElement("li");
btnVisited.innerText = "Städer jag besökt";

let landNav = document.getElementById("land");
landNav.append(btnVisited);

//create eventlistener to "Städer jag besökt" button
btnVisited.addEventListener("click",function(){
  
let clear = document.getElementById("clear");
clear.innerHTML="";

//In stader.mjs
printVisitedCities();
population();


//create button for clear localstorage id in the main page
let btnClear=document.createElement("button");
btnClear.innerText = "clear Storage Data";

clear.append(btnClear);

//Add eventlistener and give the new function to clear the localstorage data
btnClear.addEventListener("click", function(){

let section = document.getElementById("section");
let stader = document.getElementById("stader");

section.innerHTML="";
stader.innerHTML="";

  //In localStorage
 removeStorage();

})

});

 

>>>>>>> Stashed changes
