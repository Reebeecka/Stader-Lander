import { printStad,printVisitedCities} from "./stader.mjs";
import { removeStorage} from "./localStorage.mjs";


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
    //Clear stader and section to only show one contries cities
    stader.innerHTML="";
    section.innerHTML="";
    //call printStad, and send the ID of the contry you just clicked.
    printStad(land.id);
  })

}


//create button for to show "Cities I visited"(Städer jag besökt) list in the main
let btnBesökt=document.createElement("button");
btnBesökt.innerText = "Städer jag besökt";

//create eventlistener to "Städer jag besökt" button
btnBesökt.addEventListener("click",function(){
  
printVisitedCities();
});
//create button for clear localstorage id in the main page
let btnClear=document.createElement("button");
btnClear.innerText = "clear Storage Data";
let mainBtn=document.getElementById("main");
mainBtn.append(btnClear, btnBesökt);

//Add eventlistener and give the new function to clear the localstorage data
btnClear.addEventListener("click", function(){
 removeStorage();

})



 

