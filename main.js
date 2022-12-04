//constructor
class Persona {
    constructor(nombre, apellido, dni, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.edad = edad;
    }
}

//variables
const spinner = document.querySelector('#spinner');
const btnBuscarCliente = document.querySelector('#buscarCliente');
const btnNuevoCliente = document.querySelector('#nuevoCliente');
const btnBorrarCliente = document.querySelector('#borrarCliente');
const menuUsuario = document.querySelector('#menuUsuario');
const flechaAtras = document.querySelectorAll('.btnAtras');
const formNuevoUsuario = document.querySelector('#formNuevoUsuario');
const formBuscarUsuario = document.querySelector('#formBuscarUsuario');
const formBorrarUsuario = document.querySelector('#formBorrarUsuario');
const btnBuscarEnBorrar = document.querySelector('#buscar');
let arrayPersonas = [];
//eventos
btnBuscarEnBorrar.addEventListener('click', buscarBoton);
formNuevoUsuario.addEventListener('submit', agregarUsuario);
formBuscarUsuario.addEventListener('submit', buscarUsuario);

btnBuscarCliente.addEventListener('click', () => {
    abrirMenu("buscarCliente");
});

btnNuevoCliente.addEventListener('click', () => {
    abrirMenu("nuevoCliente");
});

btnBorrarCliente.addEventListener('click', () => {
    abrirMenu("borrarCliente");
});

//funciones
function abrirMenu(menu) {
    if (menu === "buscarCliente") {
        menuUsuario.style.display = "none";
        document.querySelector('#buscarUsuario').style.display = "block";
        return;
    }

    if (menu === "nuevoCliente") {
        menuUsuario.style.display = "none";
        document.querySelector('#nuevoUsuario').style.display = "block";
        return;
    }

    if (menu === "borrarCliente") {
        menuUsuario.style.display = "none";
        document.querySelector('#borrarUsuario').style.display = "block";
        return;
    }

    menuUsuario.style.display = "block";
    document.querySelector('#borrarUsuario').style.display = "none";
    document.querySelector('#nuevoUsuario').style.display = "none";
    document.querySelector('#buscarUsuario').style.display = "none";
}

flechaAtras.forEach(element => {
    element.addEventListener('click', abrirMenu);
});

//agregamos un primer usuario
function agregarUsuario(e) {

    e.preventDefault();

    //capturamos todos los datos de los inputs
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const dni = document.querySelector('#dni').value;
    const edad = document.querySelector('#edad').value;

    const persona = new Persona(nombre, apellido, dni, edad);

    arrayPersonas = [...arrayPersonas, persona];

    sincronizarStorage();

    formNuevoUsuario.reset();

}

function buscarBoton() {
    const existe = document.querySelector('.borrar-persona');
    if(existe) {
        existe.remove();
    }
    const dniBorrar = document.querySelector('#dniBorrar').value;
    //esta funcion nos devuelve al objeto de persona encontrada
    const buscarEnArray = JSON.parse(localStorage.getItem('arrayPersonas')).find(element => element.dni === dniBorrar);
    //lugar donde se va a insertar la persona encontrada
    const lugarInsertarPersonaABorrar = document.querySelector('#personaEncontradaBorrar');
    const persona = document.createElement('p');
    persona.classList.add('borrar-persona');
    persona.textContent = `Usuario: ${buscarEnArray.nombre} ${buscarEnArray.apellido}`.toUpperCase();
    lugarInsertarPersonaABorrar.appendChild(persona);
    
}



function buscarUsuario(e) {
    e.preventDefault();
    const dniBuscar = document.querySelector('#dniBuscar').value;
    const divResultado = document.querySelector('#personaEncontrada');

    arrayPersonas = JSON.parse(localStorage.getItem('arrayPersonas'));
    const personaEncontrada = arrayPersonas.find(element => element.dni === dniBuscar);
    const persona = document.createElement('p');
    persona.classList.add('personita');
    spinner.style.display = "block";

    setTimeout(() => {
        if (personaEncontrada) {
            const eliminarPersona = document.querySelector('.personita');
            if(eliminarPersona) {
                eliminarPersona.remove();
            }
            persona.textContent = `Cliente: ${personaEncontrada.nombre} ${personaEncontrada.apellido}`.toUpperCase();
            divResultado.appendChild(persona);
            spinner.style.display = "none";
            return;
        } 
            divResultado.innerHTML = ""; 
            persona.textContent = "No se encontaron coincidencias";
            spinner.style.display = "none";
            divResultado.appendChild(persona);
    }, 2000);
         
    

    
    

}

function sincronizarStorage() {
    localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonas));
}


