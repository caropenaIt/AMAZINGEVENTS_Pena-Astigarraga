//event listener para el form
let form = document.querySelector('form');

form.addEventListener('submit',f=>{
f.preventDefault();
form.reset();
});