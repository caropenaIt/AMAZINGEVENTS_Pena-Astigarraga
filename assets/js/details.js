let contenedor = document.getElementById('tarjetaDetails');
//tarjeta dinamica para details
async function cardDetail() {
  let data = await GetDatos();
// params de busqueda

let queryString = document.location.search;

let urlParams = new URLSearchParams(queryString);

let id = urlParams.get('id');

let elEvento = data.events.find(evento =>evento._id == id)

document.getElementById('tarjetaDetails').innerHTML = 
  `<div class="img-box">
    <img src="${elEvento.image}" alt="${elEvento.name}" class="card-img-top">
  </div>
    <article class="word-box">
    <h4>${elEvento.name}</h4>
      <p>${elEvento.description}</p>
      <p>Category: ${elEvento.category}</p>
      <p>Place: ${elEvento.place}</p>
      <p>Max capacity: ${elEvento.capacity}</p>
      <p>Price: ${elEvento.price}</p>
    </article>`
}
cardDetail();
