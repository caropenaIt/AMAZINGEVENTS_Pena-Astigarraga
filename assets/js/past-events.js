//funciones invocadas
checkboxMaker();
cardMakerPast('tarjetas');
performSearch();
limpiaFiltro();

//cardmaker de eventos pasados
async function cardMakerPast(mainID){
  let data = await GetDatos();
  elemento = data.events;
  for(datos of elemento){
    if(datos.date < data.currentDate){
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
    } 
}};

