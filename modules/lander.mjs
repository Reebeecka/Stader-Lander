export function Lander(landData){
    let landList;

   for (let i = 0; i < landData.length; i++) {
       landList = landData[i];
       console.log("land",landList);
    }
       
       landData.forEach(eachLand => {
           console.log("nu"+ eachLand);
       let landerList =document.getElementById("landerList");
    //    landerList.innerText=eachLand.countryname;
    //    landerList.appendChild(landList);
       landerList.innerHTML = "<li>" + landList.countryname + "</li>"
    //    mainContainer.appendChild(landerList);
    });
    
}
