//tarjetas dinamicas
let cardMaker = (elemento, mainID) => {
  let nuevoHtml = '';
  elemento.forEach((caracteristica)=>{
    let {_id, name, image, description, price} = caracteristica;
      let tarjeta = `<div class="card">
      <img src="${image}" class="card-img-top" alt="${name}">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
        <div class="foot-flex">
        <p>Price: ${price}</p>
        <a href="./details.html?id=${_id}" class="btn">Details</a>
        </div>
      </div>
    </div>
    </div>`;
  nuevoHtml += tarjeta;

    document.getElementById(mainID).innerHTML = nuevoHtml;
  })

  };

  //checkbox dinamico
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
let inputText = document.getElementById("search");

// Buscador + filtro
inputText.addEventListener('input', ()=>{
simulFiltro(); 
});
//filtro de checkbox
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', simulFiltro);
  });


// filtra checkbox y buscador a la vez
  function simulFiltro(){
      let textoEscrito = inputText.value;
    let eventoFiltrado = data.events.filter(nombres => nombres.name.toLowerCase().includes(textoEscrito.toLowerCase()));
    let selectedCategories = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
    selectedCategories.push(checkbox.value);
    }
    });

  let eventFiltro = eventoFiltrado.filter(event => {
      return selectedCategories.includes(event.category);
      });
      if(eventoFiltrado.length > 0 || eventFiltro.length > 0){
        cardMaker(eventoFiltrado,'tarjetas');
        cardMaker(eventFiltro, 'tarjetas');
        } 
      else{
        let nuevoParrafo = document.createElement("p");
        nuevoParrafo.textContent ='No results found';
        tarjetas.appendChild(nuevoParrafo);
      };
    }
    