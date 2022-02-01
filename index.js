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

  highLightSearchedString();
};

const highLightSearchedString = function () {
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
  }

  

  

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


    /* if (filterValue === "userName") {
      results.push(element.username);      
    } else if (filterValue === "name") {
      results.push(element.name);      
    } else if (filterValue === "email") {
      results.push(element.email);      
    } */

  });
};

/* SYNC FUNCTIONS END */

/* ASYNC FUNCTIONS START */
const displayNames = async function () {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();

  const exercice2 = document.getElementById("exercice2");
  exercice2.innerHTML = "";
  data.forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.innerText = element.name;
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
    let newDiv = document.createElement("div");
    newDiv.innerText = JSON.stringify(element.address);
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

/* event listeners end */

window.onload = () => {
  fetchOnload();
  
};
