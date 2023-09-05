let pastEvents = [];

for(let datos of data.events){
  if(datos.date < data.currentDate){
    pastEvents.push(datos);
  } 
};
cardMaker(pastEvents, 'tarjetas');
checkboxesDiv;
inputText;


