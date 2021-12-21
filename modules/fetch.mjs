import { Lander} from "./lander.mjs";

// export function
export function getLandAndStad(){ 

fetch("./json/land.json")
.then(response => response.json())
.then(landData => {

    Lander(landData);
    
    // kalla på funtion hämta länder
});

fetch("./json/stad.json")
.then(response => response.json())
.then(stadData => {
    
    // kalla på funtion hämta städer
});
}

// function Hello(){
//     console.log("hello");
// }

// export function hello(){
//     console.log("hello");
// }


