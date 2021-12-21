export function printLands() {
  //Get lander's data from JSON.
  fetch("json/land.json")
    .then((response) => response.json())
    .then((data) => data.forEach((land) => printLand(land)));
}

function printLand(land) {
  //(land in lands) {
  let ul = document.getElementById("land");
  let li = document.createElement("li");
  ul.append(li);
  li.innerText = land.countryname;
  // print each team in the array of lands
  let landUL = document.createElement("ul");
  li.append(landUL);
}

export function printStad(id, landUL) {
  //Get Stad's data from JSON.
  fetch("json/stad.json")
    .then((response) => response.json())
    // filter all cities by selecting only those with the right landId
    .then((stads) => stads.filter((stad) => stad.landId == id))
    .then((data) =>
      data.sort(function (a, b) {
        return a.landName.localeCompare(b.landName);
      })
    )
    .then((data) => printStad(data));

  function printStad(stad) {
    for (stadname in stad) {
      let li = document.createElement("li");
      landUL.append(li);
      li.innerText = stad[stadname].stadname;
    }
  }
}
