//funcion para agregar filas a las tablas
function addRowToTableBody(tableBodyId, valor1, valor2, valor3) {
  let tbody = document.getElementById(tableBodyId);
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = valor1;
  let td2 = document.createElement("td");
  td2.textContent = valor2;
  let td3 = document.createElement("td");
  td3.textContent = valor3;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbody.appendChild(tr);
};

//funcion para sacar porcentaje de asistencia
async function getPorcentaje() {
  try {
      let data = await GetDatos();
      let attendancePorcentaje = data.events.map(event => {
          if (event.assistance != null) {
              return {
                  name: event.name,
                  porcentaje: (event.assistance / event.capacity) * 100
              };
          } else {
              return {
                  name: event.name,
                  porcentaje: (event.estimate / event.capacity) * 100
              };
          }
      });


      return attendancePorcentaje;
  } catch (error) {
      console.error("Se encontró un error", error);
  }
};
//funciones para ordenar los eventos y las capacidades
function ordenarMenorAMayor(arreglo){
arreglo.sort((eventA, eventB)=>{
  return eventA.porcentaje - eventB.porcentaje
})
return arreglo;
};

function ordenarMayorAMenor(arreglo){
  arreglo.sort((eventA, eventB)=>{
    return eventB.porcentaje - eventA.porcentaje
  })
  
  return arreglo;
  };
  function ordenarMayorCapacity(arreglo){
    arreglo.sort((eventA, eventB)=>{
      return eventB.capacity - eventA.capacity
    })
    return arreglo;
    };
//funcion para agregar los calculos de la primer tabla
  async function llenarTablas(){
    let data = await GetDatos();
    const porcentajeCalculado = await getPorcentaje();
    let porcentajeCalculado2 = await getPorcentaje();
    const columna1 = ordenarMayorAMenor(porcentajeCalculado2);
    const columna2 = ordenarMenorAMayor(porcentajeCalculado);
    let columna3 = ordenarMayorCapacity(data.events);
    for(i = 0; i < 3; i++){
    addRowToTableBody('table1', columna1[i].name +  ': %'+ columna1[i].porcentaje, columna2[i].name +': %' + columna2[i].porcentaje, columna3[i].name + ': '+ columna3[i].capacity)
  };
  };
  llenarTablas()

// funcion para agregar tanto los stats de eventos futuros como pasados
  async function getCategoriesUpco(){
    let data =await GetDatos();
    let currentDate = data.currentDate;

    let eventos = data.events;

    let primerColumna = [];
    for(let i=0; i <eventos.length; i++){
      if(!primerColumna.includes(eventos[i].category)){
        primerColumna.push(eventos[i].category)
      }
    }
    console.log(primerColumna)
    getRevenuesUpco("Food",eventos)
    primerColumna.forEach(categoria=>{
    addRowToTableBody('table2', categoria, calcularIngresos(categoria, false, currentDate, eventos),'% ' + porcentajePorCategoria(categoria, false, currentDate, eventos))
    addRowToTableBody('table3', categoria, calcularIngresos(categoria, true, currentDate, eventos), '% ' + porcentajePorCategoria(categoria, true, currentDate, eventos))
  })
    };
//funciones para calcular los ingresos(revenues)
async function getRevenuesUpco(categoria, eventos){
  let data =await GetDatos();
let ingresos = 0;
let fecha = data.currentDate;
for(let i=0; i <eventos.length; i++){
  if(eventos[i].date > fecha && eventos[i].category === categoria){
  ingresos += eventos[i].price * eventos[i].estimate;
  }
}
return ingresos;
};
getCategoriesUpco()



function calcularIngresos(categoria, validacion, currentDate, eventos){
  let ingresos = 0;
  for (let i = 0; i < eventos.length; i++){
      let condicionFecha = (validacion) ? eventos[i].date < currentDate : eventos[i].date >= currentDate;
      if(eventos[i].category === categoria && condicionFecha) {
          if(eventos[i].assistance == undefined) ingresos += eventos[i].price * eventos[i].estimate;
          else ingresos += eventos[i].price * eventos[i].assistance;
      }
  }
  return (ingresos != 0) ? ingresos : "No events";
};
//porcentaje de attendance
function porcentajePorCategoria(categoria, validacion, currentDate, eventos){
  let sumaAsistencias = 0;
  let sumaCapacidad = 0;
  for (let i = 0; i < eventos.length; i++){
    let condicionFecha = (validacion) ? eventos[i].date < currentDate : eventos[i].date >= currentDate;
    if(eventos[i].category === categoria && condicionFecha) {
      sumaCapacidad += eventos[i].capacity;
        if(eventos[i].assistance == undefined) sumaAsistencias += eventos[i].estimate;
        else sumaAsistencias += eventos[i].assistance;
    }
}
return (sumaCapacidad != 0)?  (sumaAsistencias * 100 / sumaCapacidad).toFixed(2) : "No events";

};