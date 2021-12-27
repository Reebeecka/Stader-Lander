import { SaveToStorage,staderBesökt } from "./localStorage.mjs";

//function to get Id obj from local storage 
export async function getStartObjById(Id) {
  let h="";
  let response = await fetch("json/stad.json");
  let data = await response.json();  
  data.forEach((stad =>{ 
    if (stad.id==Id) {  
  h= stad;      
    }
     
  }))
  return h;
}

export async function ReadAPI(url) {

  let response = await fetch(url);
  let data = await response.json();  
  return data;
}



//adding export function for reading weather from api
export async function readWeatherAsync(stad) {
  let cityname=stad.stadname;
  
  let url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=8a2c10b1ad16525bbb3226ccdfbfe9cb";
  let g= await ReadAPI(url);
  console.log(g.main.temp_min);
  console.log(g.main.temp_max);
  console.log(g.main.pressure);
  console.log(g.main.humidity);

      //Finds the section already in HTML and clears in to only get one city
      let section = document.getElementById("section");
      section.innerHTML = "";

      //Creates H1 and P element to wirte out the Cityname and popluation
      let stadH1 = document.createElement("h1");
      stadH1.innerText ="Stad_Name::"+ stad.stadname;
      let stadP = document.createElement("label");
      stadP.innerText = "Population::"+stad.population;

      //Creates labels to print weather info like max temparature,min temparature and pressure
      let stadmaxtemp = document.createElement("label");
      stadmaxtemp.innerText ="Maximum_Tepmarature::"+ g.main.temp_max+ " Degrees";

      let stadMainTemp= document.createElement("label");
      stadMainTemp.innerText = "Minimum_Tepmarature::"+g.main.temp_min+ " Degrees";
      
      let stadPressure = document.createElement("label");
      stadPressure.innerText = "Pressure::"+g.main.pressure;

      let stadHumidity = document.createElement("label");
      stadHumidity.innerText = "Humidity::"+g.main.humidity;

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

      section.append(stadmaxtemp,stadMainTemp,stadPressure,stadHumidity,stadH1, stadP, btnVisited,);
  
}

//funtion to print visited cities list using localstorage id
export async function printVisitedCities() {
  //read all saved cities
  let visitedCities= staderBesökt();
  for (let i = 0; i < visitedCities.length; i++) {
    const element = visitedCities[i];
    let stadObj= await getStartObjById(element);
console.log("hi"+stadObj.stadname);
//calling printStadlocal() to get cities info with click event
    printStadlocal(stadObj);
  }
  
  section.innerHTML="";
 
}
//function to get cities list which match with country
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
//function to print cities list
 export function printStadlocal(stad) {
   console.log("inside"+stad);
    let stader = document.getElementById("stader");
    // Creates one LI element for each cit
    let li = document.createElement("li");

    // LI inner text is the cityname in the API
    li.innerText = stad.stadname;

    //appended li to ul
    stader.append(li);

    // Adds eventlistenes to the cities
    li.addEventListener("click", function () {

      stader.innerHTML="";

      //calling function to print weather repport for each city
      readWeatherAsync(stad);
      
    })
  }

