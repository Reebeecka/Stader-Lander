export function printStad(landUL, id) {
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
