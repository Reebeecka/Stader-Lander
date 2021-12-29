import { printStad } from "./stader.mjs";
import { ReadWikiAPI } from "./PrintCityinfo.mjs";
//import { removeStorage } from "./localStorage.mjs";

// export only top-level function (printLands)
export function printLands() {
  //Get lander's data from JSON.
  fetch("json/land.json")
    .then((response) => response.json())
    .then((data) => data.forEach((land) => printLand(land)))
    .catch((error) => {
      console.error('Error:', error);
    }
    );
}


// fix problem when page is opened as file and URL is "file:///"
// call this function AFTER assigning the field .url of the image object
// otherwise, the path will simply be a relative path without "file:///"
export function fixWikiURL(url) {
  if (url.startsWith("file:///")) {
    url = "https://upload.wikimedia.org/" + url.substring(8);
    // 8 = position at string after "file:///"
  }
  return url;
}

// print one country at a time (called from inside the fetch chain)
function printLand(land) {
  let landNav = document.getElementById("land");
  let landName = document.createElement("li");
  //Add text to LI element with the name of the Country
  landName.innerText = land.countryname;
  landName.className = "Contries";
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
    switchColors(landName);
  })
}
export function switchColors(landName){
  let liElements = document.getElementsByClassName("Contries");

  for(let i = 0; i < liElements.length; i ++){
    liElements.item(i).style.color = "white";
    liElements.item(i).style.border="none";
    landName.style.color="#617bc4";
    landName.style.border="3px solid white"
  }
}

//ONÖDIG FUNKTION BARA FÖR KUL
async function printCountry(land){

let wikiURL = "https://sv.wikipedia.org/w/rest.php/v1/search/page?q=" + land.countryname + "&limit=1";
let s = await ReadWikiAPI(wikiURL);

let newsURL = "https://newsapi.org/v2/everything?q=" + land.countryname + "&from=2021-11-29&sortBy=publishedAt&apiKey=ce2d33c9daf84acbae294d547091fba1";
    let n = await ReadWikiAPI(newsURL);

// //Creates H1 element that writes out Country name
let contryH1 = document.createElement("h1");
contryH1.innerText = land.countryname;
// //Fetches from Wiki to print out a description of the contry
let contryDescription = document.createElement("h3");
contryDescription.innerHTML = s.pages[0].description.charAt(0).toUpperCase() + s.pages[0].description.slice(1);

let contryImg = document.createElement("img");
contryImg.src = s.pages[0].thumbnail.url;
contryImg.src = fixWikiURL(contryImg.src);

let description = document.createElement("p");
description.innerHTML = "Till vänster ser du några av " + land.countryname + "s städer, tryck på en av dessa för mer infomration!"
let section = document.getElementById("section");
section.innerHTML = "";

let section2 = document.getElementById("clear");
    section2.innerHTML="";

    let title = document.createElement("h2");
    title.innerHTML=n.articles[0].title;

    let news = document.createElement("p");
    news.innerHTML=n.articles[0].description;

    let source = document.createElement("img");
    source.src=n.articles[0].urlToImage;

    let articleLink = document.createElement("a");
    articleLink.innerHTML=n.articles[0].url;
    articleLink.href=n.articles[0].url;

section.append(contryH1, contryDescription, contryImg, description);
section2.append(title, news, source, articleLink);
}



