const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const contenedorTareas = document.getElementById("contenedorTareas");
const form = document.getElementById("form");
const contenedorForm = document.getElementById("contenedorForm")
const contenedoDeleteAll = document.getElementById("contenedoDeleteAll");

all.addEventListener("click",() => showAll());
active.addEventListener("click",() => showActive());
completed.addEventListener("click",() => showCompleted());
//--------------- Agrega tareas dentro del localStorage
form.addEventListener("submit", addTask)

function showAll() {
    all.classList.add("active")
    active.classList.remove("active")
    completed.classList.remove("active");
    contenedorForm.style.display = ""
    contenedoDeleteAll.classList.add("none");
    getTareas(false,"") ;
}
// showAll();
// Agrega elementos al LocalStorage---------------------------------
function addTask(e) {
  e.preventDefault();
  let title = document.getElementById("input-add").value;
  let id = counId() ;
  let completed= false;
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
  getTareas(false,"");
}
// Función checked para los input check
function inputChecked(params) {

  
}

// Funcion count que generará los id de task para que no se repita
function counId() {
//--------------------   CORREGIR NO GUARDA UN ID UNICO E IRREPETIBLE---------------------------------  
  let count = 1;
  if (localStorage.getItem("tarea")=== null) {
    count;
    localStorage.setItem("id",JSON.stringify(count));
  } else {
    let id = JSON.parse(localStorage.getItem("id"));
    // let lengthTareas = [...tareas];
    count = id + 1;
    localStorage.setItem("id",JSON.stringify(count));
    
  }
  return count;
  
}
// Funcion que muestra las tareas almacenadas en el localStorage
function getTareas(none, gaa) {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let showTask = document.getElementById("showTask");
  showTask.innerHTML ="";
  if (localStorage.getItem("tarea")=== null) {
    showTask.innerHTML ="";
  } else {
    if (gaa=="showCompleted") {
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
        inputCheckbox.checked = tarea.completed;
        inputCheckbox.id = tarea.id;//id  unicos para los inputcheck
        
  
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = tarea.id;
        label.textContent =tarea.title;
  
        inputCheckbox.addEventListener('change', () => completeTask(inputCheckbox,tareas,tarea,label))
        
        completeTask(inputCheckbox,tareas,tarea,label);
    
        contenedorCheckbox.appendChild(inputCheckbox);
        contenedorCheckbox.appendChild(label);
    
        // Crear el div para el botón
        let contenedorBtn = document.createElement('div');
        //evalua si none es true  -----------------------------
        if (none) {  
          contenedorBtn.classList.add('contenedor-btn');
          // console.log(none)
        } else {
          
          contenedorBtn.classList.add('contenedor-btn', 'none')
        }
        //------------------------------------------------------
    
        let btnDelete = document.createElement('button');
        btnDelete.id = 'delete';
        btnDelete.classList.add('btn-delete');
        // evento para eliminar una tarea
        btnDelete.addEventListener("click", () => deleteTask(tarea))
    
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-trash-can');
    
        btnDelete.appendChild(icon);
        contenedorBtn.appendChild(btnDelete);
    
        // Agregar los divs al div principal
        divCheck.appendChild(contenedorCheckbox);
        divCheck.appendChild(contenedorBtn);
    
        // Agregar el div principal al contenedor showTask
        showTask.appendChild(divCheck);
        console.log("gaaaaa"+tarea.completed +" "+tarea.id)
    });
    }else if(gaa =="showActive" ){
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
      inputCheckbox.checked = tarea.completed;
      inputCheckbox.id = tarea.id;//id  unicos para los inputcheck
      

      let label = document.createElement('label');
      label.classList.add('form-check-label');
      label.htmlFor = tarea.id;
      label.textContent =tarea.title;

      inputCheckbox.addEventListener('change', () => completeTask(inputCheckbox,tareas,tarea,label))
      
      completeTask(inputCheckbox,tareas,tarea,label);
  
      contenedorCheckbox.appendChild(inputCheckbox);
      contenedorCheckbox.appendChild(label);
  
      // Crear el div para el botón
      let contenedorBtn = document.createElement('div');
      //evalua si none es true  -----------------------------
      if (none) {  
        contenedorBtn.classList.add('contenedor-btn');
        // console.log(none)
      } else {
        
        contenedorBtn.classList.add('contenedor-btn', 'none')
      }
      //------------------------------------------------------
  
      let btnDelete = document.createElement('button');
      btnDelete.id = 'delete';
      btnDelete.classList.add('btn-delete');
      // evento para eliminar una tarea
      btnDelete.addEventListener("click", () => deleteTask(tarea))
  
      let icon = document.createElement('i');
      icon.classList.add('fa-regular', 'fa-trash-can');
  
      btnDelete.appendChild(icon);
      contenedorBtn.appendChild(btnDelete);
  
      // Agregar los divs al div principal
      divCheck.appendChild(contenedorCheckbox);
      divCheck.appendChild(contenedorBtn);
  
      // Agregar el div principal al contenedor showTask
      showTask.appendChild(divCheck);
      console.log("gaaaaa"+tarea.completed +" "+tarea.id)
  });
    }
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
  inputCheckbox.checked = tarea.completed;
  inputCheckbox.id = tarea.id;//id  unicos para los inputcheck
  

  let label = document.createElement('label');
  label.classList.add('form-check-label');
  label.htmlFor = tarea.id;
  label.textContent =tarea.title;

  inputCheckbox.addEventListener('change', () => completeTask(inputCheckbox,tareas,tarea,label))
  
  completeTask(inputCheckbox,tareas,tarea,label);

  contenedorCheckbox.appendChild(inputCheckbox);
  contenedorCheckbox.appendChild(label);

  // Crear el div para el botón
  let contenedorBtn = document.createElement('div');
  //evalua si none es true  -----------------------------
  if (none) {  
    contenedorBtn.classList.add('contenedor-btn');
    // console.log(none)
  } else {
    
    contenedorBtn.classList.add('contenedor-btn', 'none')
  }
  //------------------------------------------------------

  let btnDelete = document.createElement('button');
  btnDelete.id = 'delete';
  btnDelete.classList.add('btn-delete');
  // evento para eliminar una tarea
  btnDelete.addEventListener("click", () => deleteTask(tarea))

  let icon = document.createElement('i');
  icon.classList.add('fa-regular', 'fa-trash-can');

  btnDelete.appendChild(icon);
  contenedorBtn.appendChild(btnDelete);

  // Agregar los divs al div principal
  divCheck.appendChild(contenedorCheckbox);
  divCheck.appendChild(contenedorBtn);

  // Agregar el div principal al contenedor showTask
  showTask.appendChild(divCheck);
  console.log("gaaaaa"+tarea.completed +" "+tarea.id)
});
}}


function showActive() {
    all.classList.remove("active")
    active.classList.add("active")
    completed.classList.remove("active");
    contenedoDeleteAll.classList.add("none");
    filterUncompleted()
    getTareas(false,"showActive");

}
function showCompleted() {
    all.classList.remove("active")
    active.classList.remove("active")
    completed.classList.add("active") 
    contenedorForm.style.display ="none";
    contenedoDeleteAll.classList.remove("none");
    // console.log(filterCompleted());
    filterCompleted()
    getTareas(true,"showCompleted") 
}
// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(inputCheckbox,tareas,tarea,label) {
  if (inputCheckbox.checked) {
    let indice = tareas.findIndex(task => task.id == tarea.id)
    tareas[indice].completed = inputCheckbox.checked;
    localStorage.setItem("tarea",JSON.stringify(tareas))
    label.classList.add("text-decoration-line-through");
  } else {
    let indice = tareas.findIndex(task => task.id == tarea.id)
    tareas[indice].completed = inputCheckbox.checked;
    localStorage.setItem("tarea",JSON.stringify(tareas))
    label.classList.remove("text-decoration-line-through");
  }
}
// Función para borrar una tarea
function deleteTask(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  if (tareas.find(task => task.id === tarea.id )) {
    let indice = tareas.findIndex(task => task.id === tarea.id);
    tareas.splice(indice,1)
  }
  localStorage.setItem("tarea",JSON.stringify(tareas));
  getTareas(true);
}
// Funcion para borrar todas las tareas
function deleteAll() {
  
}

// Función para filtrar tareas completadas
function filterCompleted() {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let tareasCompleted = tareas.filter(tarea =>tarea.completed === true)
  console.log(tareasCompleted)

}

// Función para filtrar tareas incompletas
function filterUncompleted() {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let tareasUnCompleted = tareas.filter(tarea =>tarea.completed === false)
  
  console.log(tareasUnCompleted)
}