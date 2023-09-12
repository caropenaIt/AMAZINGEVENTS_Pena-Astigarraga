let selectedCategories = [];
//obtener data de API
async function GetDatos(){
const DataApi ="https://mindhub-xj03.onrender.com/api/amazing";
const response = await fetch(DataApi);
const data = response.json();
return data;}

//tarjetas dinamicas
async function cardMaker(mainID){
let data = await GetDatos();
elemento = data.events;
for(datos of elemento){
  let tarjeta= `<div class="card ultimate-test" data-category=${datos.category}>
  <img src="${datos.image}" class="card-img-top" alt="${datos.name}">
  <div class="card-body">
    <h5 class="card-title">${datos.name}</h5>
    <p class="card-text">${datos.description}</p>
    <p>Price: ${datos.price}</p>
    <a href="./details.html?id=${datos._id}" class="btn">Details</a>
  </div>
</div>
</div>`;
document.getElementById(mainID).innerHTML += tarjeta;
}};

  //checkbox dinamico
async function checkboxMaker(){
  let data = await GetDatos();
  let categorias = [];
  data.events.forEach(event => {
    if (!categorias.includes(event.category)) {
      categorias.push(event.category);
    }
  });

  let checkboxesDiv = document.getElementById("allInputs");
      categorias.forEach(category => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
      checkbox.name = "categories";
        checkbox.value = category;
      let label = document.createElement("label");
      label.innerHTML = category;
      checkboxesDiv.appendChild(label);
    checkboxesDiv.appendChild(checkbox);
    });
    addCheckboxListeners();
};


//listen checkbox + filtro
    function addCheckboxListeners() {
      let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            selectedCategories.push(this.value.toLowerCase());
            showCards();
            hideCards();
          } else if (!this.check) {
            selectedCategories = selectedCategories.filter(
              (category) => category !== this.value.toLowerCase()
            );
          showCards();
          hideCards();
          }
          });
      });
    };

//funciones relacionadas a mostrar o no las tarjetas segun los filtros
    function showAllCards() {
      let divElements = document.querySelectorAll(".ultimate-test");
      if (selectedCategories.length == 0) {
        divElements.forEach((div) => {
          div.setAttribute("style", "");
        });
      }
    }
    
    function showCards() {
      let divElements = document.querySelectorAll(".ultimate-test");
      divElements.forEach((div) => {
        let category = div.getAttribute("data-category");
        if (selectedCategories.includes(category.toLowerCase())) {
          div.setAttribute("style", "");
        }
      });
    }
    
    function hideCards() {
      let divElements = document.querySelectorAll(".ultimate-test");
      divElements.forEach((div) => {
        let category = div.getAttribute("data-category");
        if (!selectedCategories.includes(category.toLowerCase())) {
          div.setAttribute("style", "display: none;");
        }
      });
      showAllCards();
    }
//filtro busqueda
    function performSearch() {
      let searchInput = document.getElementById("search");
      let searchButton = document.getElementById("botonBusqueda");
      let searchResultMessage = document.getElementById("search");
    
      searchButton.addEventListener("click", () =>{
        let divs = document.querySelectorAll(".ultimate-test");
        let searchValue = searchInput.value.toLowerCase();
        let resultsFound = false;
        divs.forEach((element) => {
    
          let h5Element = element.querySelector("h5");
          let h5Text = h5Element.textContent.toLowerCase();
    
          if (!h5Text.includes(searchValue)) {
            element.setAttribute("style", "display: none;");
            searchResultMessage.setAttribute("placeholder", "Search");
          } else {
            resultsFound = true;
          };
        });
        //searchInput.value = "";
        //lastSearchIndex = selectedCategories.indexOf(searchValue);
        if (resultsFound) {
          searchResultMessage.textContent = "";
        } else {
          let nuevoParrafo = document.createElement("p");
          nuevoParrafo.setAttribute("style", "color: red;");
          nuevoParrafo.textContent ='No results found';
          text.appendChild(nuevoParrafo);
          showAllCards();
        };
      });
    };
//limpia tanto filtro de checkbox como de busqueda
    function limpiaFiltro() {
      let clearFilter = document.getElementById("clear");
      clearFilter.addEventListener("click", ()=> {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        selectedCategories = [];
        showAllCards();
      });
    };
    limpiaFiltro();