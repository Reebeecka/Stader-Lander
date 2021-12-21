// export only top-level function (printLands)
export function printLands() {
  //Get lander's data from JSON.
  fetch("json/land.json")
    .then((response) => response.json())
    .then((data) => data.forEach((land) => printLand(land)));
}

// print one country at a time (called from inside the fetch chain)
function printLand(land) {
  let ul = document.getElementById("land");
  //let li = document.createElement("li");
  //Jag trodde att create button är bättre än list? Vad tror ni?
  let li = document.createElement("button");
  ul.append(li);
  li.innerText = land.countryname;
  // print each land in the array of lands
  let landUL = document.createElement("ul");
  li.append(landUL);
  printStad(landUL, land.id);
}

function printStad(landUL, id) {
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
    let li = document.createElement("li");
    landUL.append(li);
    li.innerText = stad.stadname;
  }
}
