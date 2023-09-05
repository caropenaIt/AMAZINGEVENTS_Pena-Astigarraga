// params de busqueda

let queryString = document.location.search;

let urlParams = new URLSearchParams(queryString);

let id = urlParams.get('id');

//let contenedor = document.getElementById('tarjetaDetails');
let elEvento = data.events.find(evento =>evento._id === id)

//tarjeta dinamica para details
function cardDetail() {
document.getElementById('tarjetaDetails').innerHTML = 
  `<div class="img-box">
    <img src="${elEvento.image}" alt="${elEvento.name}" class="card-img-top">
  </div>
    <article class="word-box">
    <h4>${elEvento.name}</h4>
      <p>Id: ${elEvento._id}</p>
      <p>${elEvento.description}</p>
      <p>Category: ${elEvento.category}</p>
      <p>Place: ${elEvento.place}</p>
      <p>Max capacity: ${elEvento.capacity}</p>
      <p>Assistance: ${elEvento.assistance}</p>
      <p>Estimate: ${elEvento.estimate}</p>
      <p>Price: ${elEvento.price}</p>
    </article>`
}
cardDetail();

