

/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
//Mostrar vistas
// let all = document.getElementById("all");

// all.addEventListener("click",showAll)

// function showAll() {
//   getTareas();
// }

// Función para añadir una nueva tarea
let form = document.getElementById("form");

form.addEventListener("submit", addTask)

function addTask(e) {
  e.preventDefault();
  let title = document.getElementById("input-add").value;
  let id = counId() ;
  let completed= false;
  console.log(id)
  const task ={
    title,
    id,
    completed
  }
  if (localStorage.getItem("tarea")=== null) {
    let tareas = [];
    tareas.push(task);
    localStorage.setItem("tarea",JSON.stringify(tareas));
  } else {
    let tareas = JSON.parse(localStorage.getItem("tarea"));
    tareas.push(task);
    localStorage.setItem("tarea",JSON.stringify(tareas))
  }
  form.reset();
  getTareas();
}
// Funcion count que almacenará los id de task para que no se repita
function counId() {
  
  let count = 1;
  if (localStorage.getItem("tarea")=== null) {
    count;
    localStorage.setItem("id",JSON.stringify(count));
  } else {
    let tareas = JSON.parse(localStorage.getItem("tarea"));
    count += tareas.length;
    localStorage.setItem("id",JSON.stringify(count));
  }
  return count;
}
// Función para obtener las tareas almacenadas en el localStorage
function getTareas() {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let showTask = document.getElementById("showTask");
  showTask.innerHTML ="";
  if (localStorage.getItem("tarea")=== null) {
    showTask.innerHTML ="";
  } else {
    tareas.forEach(tarea => {
      // Crear el div principal
      let divCheck = document.createElement('div');
      divCheck.classList.add('div-check');
  
      // Crear el div para el checkbox y la etiqueta
      let contenedorCheckbox = document.createElement('div');
      contenedorCheckbox.classList.add('contenedor-checkbox', 'py-1');
  
      let inputCheckbox = document.createElement('input');
      inputCheckbox.classList.add('form-check-input');//aqui
      inputCheckbox.checked = tarea.completed;
      inputCheckbox.type = 'checkbox';
      inputCheckbox.value = '';
      inputCheckbox.id = 'flexCheckChecked';
  
      let label = document.createElement('label');
      label.classList.add('form-check-label');
      label.htmlFor = 'flexCheckChecked';
      label.textContent =tarea.title;
  
      contenedorCheckbox.appendChild(inputCheckbox);
      contenedorCheckbox.appendChild(label);
  
      // Crear el div para el botón
      let contenedorBtn = document.createElement('div');
      contenedorBtn.classList.add('contenedor-btn', 'none');
  
      let btnDelete = document.createElement('button');
      btnDelete.id = 'delete';
      btnDelete.classList.add('btn-delete');
  
      let icon = document.createElement('i');
      icon.classList.add('fa-regular', 'fa-trash-can');
  
      btnDelete.appendChild(icon);
      contenedorBtn.appendChild(btnDelete);
  
      // Agregar los divs al div principal
      divCheck.appendChild(contenedorCheckbox);
      divCheck.appendChild(contenedorBtn);
  
      // Agregar el div principal al contenedor showTask
      showTask.appendChild(divCheck);

    });
    
  }

}
getTareas() ;

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask() {

}

// Función para borrar una tarea
function deleteTask() {
  
}

// Funcion para borrar todas las tareas
function deleteAll() {
  
}

// Función para filtrar tareas completadas
function filterCompleted() {
    
}

// Función para filtrar tareas incompletas
function filterUncompleted() {

}

