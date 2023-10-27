import { crearTabla } from "./tabla.js";
import { Villano, Heroe} from "./individuos.js";
import {data} from "./data.js";

const $divTable = document.getElementById('table');
const $divAbm = document.getElementById('abm');
const $textProm = document.getElementById('text-promedio');
const $formulario = document.forms[1];

$divAbm.style.display = "none";
const parsedData = JSON.parse(localStorage.getItem("data")) || data;

function actualizarTabla(tipo){

    while($divTable.hasChildNodes()){
        
        $divTable.removeChild($divTable.firstElementChild);
    }

    switch(tipo){
        case 'todos':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            $divTable.appendChild(crearTabla(parsedData));
            break;
        case 'heroe':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            let heroes = parsedData.filter(h => h.hasOwnProperty('alterego'));
            $divTable.appendChild(crearTabla(heroes));
            break;
        case 'villano':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            let villanos = parsedData.filter(v => v.hasOwnProperty('asesinatos'));
            $divTable.appendChild(crearTabla(villanos));
            break;
        default:
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            $divTable.appendChild(crearTabla(parsedData));
            break;
    }
}

actualizarTabla();

document.getElementById('select-filtro').addEventListener('change', function() {
    var valorSeleccionado = this.value;
    actualizarTabla(valorSeleccionado);
});

function actualizarStorage(parsedData){
    localStorage.setItem("data", JSON.stringify(parsedData));
}

document.getElementById('calcular-prom').addEventListener('click', function(event) {
    
    event.preventDefault();
    let $filtro = document.getElementById('select-filtro');

    switch($filtro.value){
        case 'todos':
            const edadest = parsedData.map(t => parseInt(t.edad, 10));
            const edadesValidadast = edadest.filter(edad => !isNaN(edad)); 
            const sumaEdadest = edadesValidadast.reduce((acumulador, edad) => acumulador + edad, 0);
            const promedioEdadest = sumaEdadest / edadesValidadast.length;
            console.log(promedioEdadest);
            $textProm.value = promedioEdadest.toString();
            break;
        case 'heroe':
            let heroes = parsedData.filter(t => t.hasOwnProperty('alterego'));
            const edadesh = heroes.map(t => parseInt(t.edad, 10));
            const edadesValidadash = edadesh.filter(edad => !isNaN(edad)); 
            const sumaEdadesh = edadesValidadash.reduce((acumulador, edad) => acumulador + edad, 0);
            const promedioEdadesh = sumaEdadesh / edadesValidadash.length;
            console.log(promedioEdadesh);
            $textProm.value = promedioEdadesh.toString();
            break;
        case 'villano':
            let villanos = parsedData.filter(t => t.hasOwnProperty('asesinatos'));
            const edades = villanos.map(t => parseInt(t.edad, 10));
            const edadesValidadas = edades.filter(edad => !isNaN(edad)); 
            const sumaEdades = edadesValidadas.reduce((acumulador, edad) => acumulador + edad, 0);
            const promedioEdades = sumaEdades / edadesValidadas.length;
            console.log(promedioEdades);
            $textProm.value = promedioEdades.toString();
            break;
    }
});

window.addEventListener('dblclick', (e) => {
    const target = e.target;

    if (target.matches("td")) {
        limpiarForm();
        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;
        cargarFormulario(parsedData.find((individuo) => individuo.id == id));
    }
  });

//OCULTAR COLUMNA:
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const tabla = document.getElementById('table');
      const mostrar = this.checked;
      const column = this.dataset.column;
  
      const filas = tabla.querySelectorAll('tr');
  
      filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td, th');
        celdas[column].style.display = mostrar ? 'table-cell' : 'none';
      });
    });
  });

  function cargarFormulario(individuo){

    $formulario.inputId.value = individuo.id;
    $formulario.inputNombre.value = individuo.nombre;
    $formulario.inputApellido.value = individuo.apellido;
    $formulario.inputEdad.value = individuo.edad;

    if(individuo.alterego || individuo.publicado){
        $formulario.inputAlter.value = individuo.alterego;
        $formulario.inputCiu.value = individuo.ciudad;
        $formulario.inputPubli.value = individuo.publicado;
        $formulario.selectTipo.value = 'heroe';
    }else{
        $formulario.inputEne.value = individuo.enemigo;
        $formulario.inputRob.value = individuo.robos;
        $formulario.inputAse.value = individuo.asesinatos;
        $formulario.selectTipo.value = 'villano';
    }
}

  function agregarElemento() {

    let id = parsedData.length - 1;
    let nombre = $formulario.inputNombre.value;
    let apellido = $formulario.inputApellido.value;
    let edad = $formulario.inputEdad.value;
    let tipo = $formulario.selectTipo.value;
    let alterego = $formulario.inputAlter.value;
    let ciudad = $formulario.inputCiu.value;
    let publicado = $formulario.inputPubli.value;
    let enemigo = $formulario.inputEne.value;
    let robos = $formulario.inputRob.value;
    let asesinatos = $formulario.inputAse.value;

    if(nombre && apellido && parseInt(edad)){
        
        switch(tipo){
            case 'heroe':
                if(alterego && ciudad && parseInt(publicado) > 1940){
                    let heroe = new Heroe(id, nombre, apellido, edad, alterego, ciudad, publicado);
                    console.log(heroe);
                    parsedData.push(heroe);
                    localStorage.setItem("data", JSON.stringify(parsedData));
                    actualizarTabla()
                }else{
                    alert('El aterego, la ciudad o la publicacion estan incorrectos');
                }
                break;
            case 'villano':
                if(enemigo && parseInt(robos) > 0 && parseInt(asesinatos) > 0){
                    let villano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
                    console.log(villano);
                    parsedData.push(villano);
                    localStorage.setItem("data", JSON.stringify(parsedData));
                    actualizarTabla();
                }else{
                    alert('El enemigo, los robos o los asesinatos estan incorrectos');
                }
                break;
        }
    }else{
        alert('El nombre, el apellido o la edad son incorrectos.');
    }
    
  }
  function handlerUpdate(individuo){
    let indice = parsedData.findIndex(individuo =>{
        return individuo.id == individuo.id;
    });
    parsedData.splice(indice, 1);
    parsedData.push(individuo);
    actualizarStorage(parsedData);
    console.log('Se guardo');
    actualizarTabla();
}

function handlerDelete(id){

    let indice = parsedData.findIndex((individuo)=>{
        return individuo.id == id;
    });
    parsedData.splice(indice, 1);
    actualizarStorage(parsedData);
    actualizarTabla();
}

function limpiarForm(){
    $formulario.inputId.value="";
    $formulario.reset();
    console.log('Se limpio');
}
//BOTONES:
document.getElementById('btnAgregar').addEventListener('click', function(event){
    event.preventDefault();
    $divAbm.style.display = "block";
    $divAbm.focus();

    });

document.getElementById('btnConfirmar').addEventListener('click', function(event){
    event.preventDefault();
    agregarElemento();
    $divAbm.style.display = "none";
});

document.getElementById('btnModificar').addEventListener('click', function(event){
    event.preventDefault();
    
    let id = parsedData.length - 1;
    let nombre = $formulario.inputNombre.value;
    let apellido = $formulario.inputApellido.value;
    let edad = $formulario.inputEdad.value;
    let tipo = $formulario.selectTipo.value;
    let alterego = $formulario.inputAlter.value;
    let ciudad = $formulario.inputCiu.value;
    let publicado = $formulario.inputPubli.value;
    let enemigo = $formulario.inputEne.value;
    let robos = $formulario.inputRob.value;
    let asesinatos = $formulario.inputAse.value;
    

    if(tipo.value == 'heroe'){
        let heroe = new Heroe(id, nombre, apellido, edad, alterego, ciudad, publicado);
        handlerUpdate(heroe);
    }else{
        let villano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
        handlerUpdate(villano);
    }
    $divAbm.style.display = "none";
    });

    document.getElementById('btnEliminar').addEventListener('click', function(event){
    event.preventDefault();
    let id = parseInt($formulario.inputId.value);
    handlerDelete(id);
    $divAbm.style.display = "none";
    });

    document.getElementById('btnCancelar').addEventListener('click', function(event){
    event.preventDefault();
    $divAbm.style.display = "none";
    });
//OBTENER NOMBRE DE LA COLUMNA CLICKEADA:
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('#table th');

    headers.forEach(header => {
    header.addEventListener('click', function() {
        const columna = this.textContent;
        console.log('Columna:', columna);
    });
    });
});

