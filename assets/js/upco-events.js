let upcoEvents = [];

  for(let datos of data.events){
    if(datos.date > data.currentDate){
      upcoEvents.push(datos);
    } 
  };
cardMaker(upcoEvents, 'tarjetas');
checkboxesDiv;
inputText;
