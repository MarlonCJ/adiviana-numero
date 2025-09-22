
const formulario1 = document.querySelector('#formulario1');
    const inputMinimo = document.querySelector('#numMinimo');
    const inputMaximo = document.querySelector('#numMaximo');

    const formulario2 = document.querySelector('#formulario2');
    const inputNumero = document.querySelector('#numero');

    let mensaje = document.querySelector('#mensaje');
    let numeroSecreto = cargarDesdeLocalStorage();

    // --- Establecer rango ---
    formulario1.addEventListener('submit', e => {
        e.preventDefault();

        let minimo = Number(inputMinimo.value);
        let maximo = Number(inputMaximo.value);

        if (isNaN(minimo) || isNaN(maximo)) {
            mensaje.textContent = "Debes ingresar valores válidos.";
            return;
        }

        if (minimo >= maximo) {
            mensaje.textContent = "El número mínimo debe ser menor que el máximo.";
            return;
        }

        numeroSecreto = numeroAleatorio(minimo, maximo);
        localStorage.setItem('numeroSecreto', numeroSecreto);
        mensaje.textContent = `Número secreto generado entre ${minimo} y ${maximo}. ¡Adivina! 🎯`;
        console.log("Secreto:", numeroSecreto);
    });

    // --- Intento de adivinar ---
    formulario2.addEventListener('submit', e => {
        e.preventDefault();

        let numero = Number(inputNumero.value);

        if (isNaN(numero)) {
            mensaje.textContent = "Ingresa un número válido.";
            return;
        }

        if (numero === numeroSecreto) {
            mensaje.textContent = "🎉 ¡Adivinaste!";
            localStorage.removeItem('numeroSecreto');
        } else if (numero > numeroSecreto) {
            mensaje.textContent = "El número secreto es menor.";
        } else {
            mensaje.textContent = "El número secreto es mayor.";
        }

        inputNumero.value = ""; // limpiar input
        inputNumero.focus();
    });

    // --- Funciones auxiliares ---
    function numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function cargarDesdeLocalStorage() {
        try {
            let guardado = localStorage.getItem('numeroSecreto');
            return guardado ? Number(guardado) : null;
        } catch (error) {
            console.log("Error al cargar:", error.message);
            return null;
        }
    }