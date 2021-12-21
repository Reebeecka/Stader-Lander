// export function
export function getLandAndStad(){ 

fetch("./json/land.json")
.then(response => response.json())
.then(landData => {
    
    // kalla på funtion hämta läder
});

fetch("./json/stad.json")
.then(response => response.json())
.then(stadData => {
    
    // kalla på funtion hämta städer
});
}

function Hello(){
    console.log("hello");
}

export function hello(){
    console.log("hello");
}


