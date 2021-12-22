
    
export function SaveToStorage(ID) {

    let getID = IDarray();

    getID.push(ID);

    localStorage.setItem("ID", JSON.stringify(getID));

};

function IDarray() {

    return JSON.parse(localStorage.getItem('ID')) || []
}


//function printLocalStorage() {

   // for (let i = 0; i < localStorage.length; i++) {

   //     const key = localStorage.key(i);

     //   const value = localStorage.getItem(key);

    //    console.log(key);

   // }
//}