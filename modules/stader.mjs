import { SaveToStorage } from "./localStorage.mjs";

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

  function printStad(stad) {
    let stader = document.getElementById("stader");
    // Creates one LI element for each city
    let li = document.createElement("li");

    // LI inner text is the cityname in the API
    li.innerText = stad.stadname;

    //appended li to ul
    stader.append(li);

    // Adds eventlistenes to the cities
    li.addEventListener("click", function () {

      //Finds the section already in HTML and clears in to only get one city
      let section = document.getElementById("section");
      section.innerHTML = "";

      //Creates H1 and P element to wirte out the Cityname and popluation
      let stadH1 = document.createElement("h1");
      stadH1.innerText = stad.stadname;

      let stadP = document.createElement("p");
      stadP.innerText = stad.population;

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

      section.append(stadH1, stadP, btnVisited);
    })
  }
}
