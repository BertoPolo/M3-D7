/* GLOBAL VARIABLES */
let searchQuery = "";
let results = [];

let filterInput = document.getElementById("filtersInput");
let filterValue = filterInput.value;
/* GLOBAL VARIABLES END */

/* SYNC FUNCTIONS START */

const getSearchInput = function () {
  searchQuery = document.querySelector("#searchInput").value.toLowerCase();
  
  if (filterValue === "userName") {
    const newArr = results.filter((element) => {
      return element.username.toLowerCase().includes(searchQuery);
    });
    console.log(newArr);
    loadOnsearch(newArr);
  } else if (filterValue === "name") {
     const newArr = results.filter((element) => {
      return element.name.toLowerCase().includes(searchQuery);
    });
    console.log(newArr);
    loadOnsearch(newArr);
    
  } else if (filterValue === "email") {
      const newArr = results.filter((element) => {
       return element.email.toLowerCase().includes(searchQuery);
      });
      console.log(newArr);
      loadOnsearch(newArr);
  }  

  
  
};

const loadOnsearch = function (arr) {
  const tableContainer = document.getElementById("table");
  tableContainer.innerHTML = ` <tr class="mx-3">
                                  <th>Name</th>
                                  <th>Username</th>
                                  <th>Email</th>
                                </tr>`;
  console.log(searchQuery);
  console.log(arr);

  arr.forEach((element) => {
      const newTr = document.createElement("tr");
      tableContainer.appendChild(newTr);
      let newTd1 = document.createElement("td");
      let newTd2= document.createElement("td");
      let newTd3 = document.createElement("td");
      newTd1.innerText = element.name;
      newTd1.classList.add("name");
      newTd2.innerText = element.username;
      newTd2.classList.add("username");
      newTd3.innerText = element.email;
      newTd3.classList.add("email");
      newTr.appendChild(newTd1);
      newTr.appendChild(newTd2);
      newTr.appendChild(newTd3);
  });

  /* highLightSearchedString(); */
};

/* const highLightSearchedString = function () {
   let nameStrings = document.getElementsByClassName("name")
   let userNameStrings = document.getElementsByClassName("username")
   let emailStrings = document.getElementsByClassName("email")
 

  for (i = 0; i < emailStrings.length; i++) {
    let str = emailStrings[i].innerText
    let strLength = emailStrings[i].innerText.length
    let queryLength = searchQuery.length
    
      if (str.includes(searchQuery)) {
        
        let beginning = str.slice(0, str.indexOf(searchQuery[0]))
        let middle = str.slice(
          str.indexOf(searchQuery[0]),
          str.indexOf(searchQuery[0]) + queryLength
        );
        let end = str.slice(str.indexOf(searchQuery[0])+queryLength);

        
        emailStrings[i].innerHTML = `${beginning}<mark>${middle}</mark>${end}`;
        console.log(emailStrings[i]);
      }
    }
  } */

  

  

/*  const clearContainer = function () {
        const userNameContainer = document.getElementById("userNameTable")
            
            userNameContainer.innerHTML= ""
            console.log("cleared")
      } */

const loadUserNames = function (arr) {
  const tableContainer = document.getElementById("table");
 
  tableContainer.innerHTML = ` <tr class="mx-3">
                                  <th>Name</th>
                                  <th>Username</th>
                                  <th>Email</th>
                                </tr>`;
  
  /* results = []; */

  arr.forEach((element) => {
    const newTr = document.createElement("tr");
    tableContainer.appendChild(newTr);
    let newTd1 = document.createElement("td");
    let newTd2= document.createElement("td");
    let newTd3 = document.createElement("td");
    newTd1.innerText = element.name
    newTd1.classList.add("name")
    newTd2.innerText = element.username
    newTd2.classList.add("username");
    newTd3.innerText = element.email
    newTd3.classList.add("email");
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
  });
};

const sortByName = function () {  
   let table = document.getElementById("table");
   let unsorted = document.getElementById("table").classList.contains("unsorted");
   let sortedDesc = document.getElementById("table").classList.contains("sortedDesc");
   let sortedAsc = document.getElementById("table").classList.contains("sortedAsc");

   if (unsorted || sortedDesc) {
     results.sort(function (a, b) {
       let nameA = a.name.toUpperCase();
       let nameB = b.name.toUpperCase();
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
       // names must be equal
       return 0;
     });
    
     loadUserNames(results);
     
     table.classList.remove("unsorted");
     table.classList.remove("sortedDesc");
     table.classList.add("sortedAsc");
   } else if (sortedAsc) {
     results.sort(function (a, b) {
       let nameA = a.name.toUpperCase();
       let nameB = b.name.toUpperCase();
       if (nameA > nameB) {
         return -1;
       }
       if (nameA < nameB) {
         return 1;
       }
       // names must be equal
       return 0;
     });
     
     loadUserNames(results);

     table.classList.remove("sortedAsc");
     table.classList.add("sortedDesc");
   }
  
}

/* SYNC FUNCTIONS END */

/* ASYNC FUNCTIONS START */
const displayNames = async function () {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();

  const exercice2 = document.getElementById("exercice2");
  exercice2.innerHTML = "";
  data.forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<span>${element.name}</span>   
    <a href="details.html?ID=${element.id}" class="btn btn-secondary btn-lg active my-1" role="button" aria-pressed="true">Details</a>`;   
    exercice2.appendChild(newDiv);
  });
};
const displayAddress = async function () {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();
  console.log(data);
  const exercice3 = document.getElementById("exercice3");
  exercice3.innerHTML = "";
  
  
  data.forEach((element) => {
    let {address} = element
    console.log(address);
    let newDiv = document.createElement("div");
    newDiv.innerText = address.street + ", " + address.suite + ", " + address.city + ", " + address.zipcode 
    exercice3.appendChild(newDiv);
  });
};

const fetchOnload = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();
  console.log(data);
  results = data;
  loadUserNames(data);
  
};

/* ASYNC FUNCTIONS END */

/* event listeners */
const buttonNode = document.getElementById("button2");
const buttonNode2 = document.getElementById("button3");
buttonNode.addEventListener("click", displayNames);
buttonNode2.addEventListener("click", displayAddress);

    /* Search field */
const searchField = document.getElementById("searchInput");
searchField.addEventListener("keyup", getSearchInput);
//searchField.addEventListener("focus", clearContainer)

filterInput.addEventListener("change", function () {
  filterValue = filterInput.value;
});

const sortBtn = document.getElementById("sorting-btn");
sortBtn.addEventListener("click", sortByName)

/* event listeners end */

window.onload = () => {
  fetchOnload();
  
};
