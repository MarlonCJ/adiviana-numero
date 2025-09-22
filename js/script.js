


const formulario1 = document.querySelector('#formulario1');
const inputMinimo = document.querySelector('#numMinimo');
const inputMaximo = document.querySelector('#numMaximo');

const formulario2 = document.querySelector('#formulario2');
const inputNumero = document.querySelector('#numero');

let mensage = document.querySelector('#mensaje');
let num = cargarDesdeLocalStorage();
console.log('numero cargado', num)

formulario1.addEventListener('submit',e =>{

    let minimo = Number(inputMinimo.value);
    let maximo = Number(inputMaximo.value);

    // console.log(minimo + maximo);

    let adivina = numeroAleatorio(minimo,maximo);
    localStorage.setItem('dato', adivina);
    console.log(adivina);
})


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cargarDesdeLocalStorage(){
    try{
        let guardar = localStorage.getItem('dato');
        return guardar ? Number(guardar) : 0;
    }catch(error){
        console.log('No se pudo cargar',error.message)
        return 0;
    }
}


formulario2.addEventListener('submit', e =>{
    e.preventDefault();

    let numero = Number(inputNumero.value);
    if(numero === num){
        mensage.textContent = "Adivinaste";
        localStorage.clear();
        location.reload(true);
    }else if(numero > num){
        mensage.textContent = "El número es menor";
    }else if(numero < num){
        mensage.textContent = "El número es mayor";

    }

})