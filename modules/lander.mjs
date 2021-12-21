export function Lander(landData){
    let landList;

   for (let i = 0; i < landData.length; i++) {
       landList = landData[i];
       console.log("land",landList);
    }
    let landerulList =document.getElementById("landerulList");
       landData.forEach(eachLand => {
           console.log("nu"+ eachLand);

       let li= document.createElement("li");
       li.innerText= eachLand.countryname; 
       landerulList.appendChild(li);
    });
    
    
}
