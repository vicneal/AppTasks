const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const contenedorTareas = document.getElementById("contenedorTareas");
const form = document.getElementById("form");
const contenedorForm = document.getElementById("contenedorForm")
const contenedoDeleteAll = document.getElementById("contenedoDeleteAll");
const btnDeleteAll = document.getElementById("delete-all");
const inputAddTask = document.querySelector(".inputAddTask");
const btnAddTask = document.getElementById("gaaa");

//------  Lista de eventos para cambiar entre vistas  ---------------
all.addEventListener("click",() => showAll());
active.addEventListener("click",() => showActive());
completed.addEventListener("click",() => showCompleted());
//------  Evento para agregar tareas dentro del localStorage  -------
form.addEventListener("submit", addTask)
//------  Evento para borrar todas las tareas -----------------------
btnDeleteAll.addEventListener("click",()=>{
  deleteAll()
  filterCompleted()
})
//------  Evento verificar si inputAddTask esta vacio----------------
inputAddTask.addEventListener("input",() =>{
  if (inputAddTask.value ==="") {
    btnAddTask.disabled = true;
  } else {
    btnAddTask.disabled = false;
  }
})
//------  Funcion para la vista "All"  ------------------------------
function showAll() {
    all.classList.add("active")
    active.classList.remove("active")
    completed.classList.remove("active");
    contenedorForm.classList.remove("none")
    contenedoDeleteAll.classList.add("none");
    let gaa = true;
    localStorage.setItem("gaa",gaa);
    getTareas();
}
showAll();
//------  Funcion para la vista "Active"  ---------------------------
function showActive() {
    all.classList.remove("active")
    active.classList.add("active")
    completed.classList.remove("active");
    contenedorForm.classList.remove("none");
    contenedoDeleteAll.classList.add("none");
    let gaa = false;
    localStorage.setItem("gaa",gaa);
    filterUncompleted();
}
//------  Funcion para la vista "Completed"  ------------------------
function showCompleted() {
    all.classList.remove("active")
    active.classList.remove("active")
    completed.classList.add("active") 
    contenedorForm.classList.add( "none");
    contenedoDeleteAll.classList.remove("none");
    filterCompleted()
}
//------  Funcion que agrega las tareas al LocalStorage  ------------
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
  if (localStorage.getItem("tarea") === null) {
    let tareas = [];
    tareas.push(task);
    localStorage.setItem("tarea",JSON.stringify(tareas));
  } else {
    let tareas = JSON.parse(localStorage.getItem("tarea"));
    tareas.push(task);
    localStorage.setItem("tarea",JSON.stringify(tareas))
  }
  form.reset();
  btnAddTask.disabled = true;
  if (JSON.parse(localStorage.getItem("gaa"))) {
    getTareas();
  } else {
    filterUncompleted();
  }
}
//------  Funcion que generadora de ids  ----------------------------
function counId() {
 let count = 1;
  if (localStorage.getItem("tarea")=== null) {
    count;
    localStorage.setItem("id",JSON.stringify(count));
  } else {
    let id = JSON.parse(localStorage.getItem("id"));
    count = id + 1;
    localStorage.setItem("id",JSON.stringify(count));
  }
  return count;
}
//------  Funcion que extrae y muestra las tareas almacenadas  ------
function getTareas() {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let showTask = document.getElementById("showTask");
  showTask.innerHTML ="";
  if (localStorage.getItem("tarea")=== null) {
    showTask.innerHTML ="";
  } else {
    tareas.forEach(tarea => {
        // Creamos el div principal
        let divCheck = document.createElement('div');
        divCheck.classList.add('div-check');
        // Creamos el div para el checkbox y la etiqueta
        let contenedorCheckbox = document.createElement('div');
        contenedorCheckbox.classList.add('contenedor-checkbox', 'py-1');
        // Creamos el InputCheck
        let inputCheckbox = document.createElement('input');
        inputCheckbox.classList.add('form-check-input');
        inputCheckbox.checked = tarea.completed;
        inputCheckbox.type = 'checkbox';
        inputCheckbox.checked = tarea.completed;
        inputCheckbox.id = tarea.id;
        // Creamos el Label para cada InputCheck
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = tarea.id;
        label.style.paddingLeft = "5px";
        label.textContent =tarea.title;
        //------  Evento que guarda el estado de true o false del InputCheck en el LocalStorage
        inputCheckbox.addEventListener('change', () => completeTask(inputCheckbox,tareas,tarea,label))
        //------  Invocamos a la funcion "completeTask" por defecto ---------------------------
        completeTask(inputCheckbox,tareas,tarea,label);
        //------  Agregamos los elementos hijos a los contenedores padres  ---------------------
        contenedorCheckbox.appendChild(inputCheckbox);
        contenedorCheckbox.appendChild(label);
        // Creamos el div para el botón
        let contenedorBtn = document.createElement('div');
        contenedorBtn.classList.add('contenedor-btn')
        // Creamos el botón eliminar
        let btnEdit = document.createElement('button');
        btnEdit.id = 'edit';
        btnEdit.classList.add('btnEdit');
        btnEdit.setAttribute("data-bs-toggle","modal")
        btnEdit.setAttribute("data-bs-target","#staticBackdrop");
        // evento
        btnEdit.addEventListener("click",()=> editTask(tarea))
        // Creamos el icono de trash
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-pen-to-square');
        //------  Agregamos los elementos hijos a los contenedores padres  ---------------------  
        btnEdit.appendChild(icon);
        contenedorBtn.appendChild(btnEdit);
        // Agregamos los divs al div principal
        divCheck.appendChild(contenedorCheckbox);
        divCheck.appendChild(contenedorBtn);
        // Agregamos el div principal al contenedor showTask
        showTask.appendChild(divCheck);
    });
    }
}
//------  Función para marcar una tarea como completada o imcompleta
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
//------  Función para borrar una tarea  ----------------------------
function deleteTask(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  if (tareas.find(task => task.id === tarea.id )) {
    let indice = tareas.findIndex(task => task.id === tarea.id);
    tareas.splice(indice,1)
  }
  localStorage.setItem("tarea",JSON.stringify(tareas));
  filterCompleted() ;
}
//------  Función para editar una tarea  ----------------------------
function editTask(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  if (tareas.find(task => task.id === tarea.id )) {
    let indice = tareas.findIndex(task => task.id === tarea.id);
    const inputEditTask = document.getElementById("inputEditTask");
    inputEditTask.placeholder = tareas[indice].title;
    console.log(tareas[indice].title)
    console.log(tareas[indice].id)
    const btnEditarTarea = document.getElementById("btnEditarTarea");
    btnEditarTarea.addEventListener("click",()=>{
      tareas[indice].title = inputEditTask.value;
      localStorage.setItem("tarea",JSON.stringify(tareas));
      if (JSON.parse(localStorage.getItem("gaa"))) {
          getTareas();
        } else {
          filterUncompleted();
        }
    })
    inputEditTask.value ="";
  }
  // localStorage.setItem("tarea",JSON.stringify(tareas))
};
//------  Funcion para borrar todas las tareas  --------------------
function deleteAll() {
    let tareas = JSON.parse(localStorage.getItem("tarea"));
    for (let i = tareas.length -1 ; i>=0; i--) {
        if (tareas[i].completed) {
            let indice = tareas.findIndex(task => task.id === tareas[i].id);
            tareas.splice(indice,1)
            localStorage.setItem("tarea",JSON.stringify(tareas));       
        }
    }
}
// Función para filtrar tareas completadas
function filterCompleted() {
  let tareas = JSON.parse(localStorage.getItem("tarea"));
  let showTask = document.getElementById("showTask");
  showTask.innerHTML ="";
  tareas.filter( tarea =>{
    if(tarea.completed){
       // Creamos el div principal
       let divCheck = document.createElement('div');
       divCheck.classList.add('div-check');
       // Creamos el div para el checkbox y la etiqueta
       let contenedorCheckbox = document.createElement('div');
       contenedorCheckbox.classList.add('contenedor-checkbox', 'py-1');
       // Creamos el InputCheck
       let inputCheckbox = document.createElement('input');
       inputCheckbox.classList.add('form-check-input');
       inputCheckbox.checked = tarea.completed;
       inputCheckbox.type = 'checkbox';
       inputCheckbox.checked = tarea.completed;
       inputCheckbox.id = tarea.id;
       // Creamos el Label para cada InputCheck
       let label = document.createElement('label');
       label.classList.add('form-check-label');
       label.htmlFor = tarea.id;
       label.style.paddingLeft = "5px";
       label.textContent =tarea.title;
       //------  Evento que guarda el estado de true o false del InputCheck en el LocalStorage
       inputCheckbox.addEventListener('change', () => {
          setTimeout(() => {
              completeTask(inputCheckbox,tareas,tarea,label)
          }, 50);
      
          setTimeout(() => {
              filterCompleted();
          }, 1200);
        })
       //------  Invocamos a la funcion "completeTask" por defecto ---------------------------
       setTimeout(() => {
          completeTask(inputCheckbox,tareas,tarea,label)
       }, 50);
       //------  Agregamos los elementos hijos a los contenedores padres  ---------------------
       contenedorCheckbox.appendChild(inputCheckbox);
       contenedorCheckbox.appendChild(label);
       // Creamos el div para el botón
       let contenedorBtn = document.createElement('div');
       contenedorBtn.classList.add('contenedor-btn');
       // Creamos el botón eliminar
       let btnDelete = document.createElement('button');
       btnDelete.id = 'delete';
       btnDelete.classList.add('btn-delete');
       //------- Evento para eliminar una tarea ----------------------------
       btnDelete.addEventListener("click", () => deleteTask(tarea))
       // Creamos el icono de trash
       let icon = document.createElement('i');
       icon.classList.add('fa-regular', 'fa-trash-can');
       //------  Agregamos los elementos hijos a los contenedores padres  ---------------------  
       btnDelete.appendChild(icon);
       contenedorBtn.appendChild(btnDelete);
       // Agregamos los divs al div principal
       divCheck.appendChild(contenedorCheckbox);
       divCheck.appendChild(contenedorBtn);
       // Agregamos el div principal al contenedor showTask
       showTask.appendChild(divCheck);
    };
  });
}
// Función para filtrar tareas incompletas
function filterUncompleted() {
    let tareas = JSON.parse(localStorage.getItem("tarea"));
    let showTask = document.getElementById("showTask");
    showTask.innerHTML ="";
    tareas.filter( tarea =>{
      if(!tarea.completed){
        // Creamos el div principal
        let divCheck = document.createElement('div');
        divCheck.classList.add('div-check');
        // Creamos el div para el checkbox y la etiqueta
        let contenedorCheckbox = document.createElement('div');
        contenedorCheckbox.classList.add('contenedor-checkbox', 'py-1');
        // Creamos el InputCheck
        let inputCheckbox = document.createElement('input');
        inputCheckbox.classList.add('form-check-input');
        inputCheckbox.checked = tarea.completed;
        inputCheckbox.type = 'checkbox';
        inputCheckbox.checked = tarea.completed;
        inputCheckbox.id = tarea.id;
        // Creamos el Label para cada InputCheck
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = tarea.id;
        label.style.paddingLeft = "5px";
        label.textContent =tarea.title;
        //------  Evento que guarda el estado de true o false del InputCheck en el LocalStorage
        inputCheckbox.addEventListener('change', () => {
            setTimeout(() => {
                completeTask(inputCheckbox, tareas, tarea, label);
            }, 50);
        
            setTimeout(() => {
                filterUncompleted();
            }, 1200);
        })
        //------  Invocamos a la funcion "completeTask" por defecto ---------------------------
        setTimeout(() => {
          completeTask(inputCheckbox, tareas, tarea, label);
        }, 50);
        //------  Agregamos los elementos hijos a los contenedores padres  ---------------------
        contenedorCheckbox.appendChild(inputCheckbox);
        contenedorCheckbox.appendChild(label);
        // Creamos el div para el botón
        let contenedorBtn = document.createElement('div');
        contenedorBtn.classList.add('contenedor-btn')
        // Creamos el botón eliminar
        let btnEdit = document.createElement('button');
        btnEdit.id = 'edit';
        btnEdit.classList.add('btnEdit');
        btnEdit.setAttribute("data-bs-toggle","modal")
        btnEdit.setAttribute("data-bs-target","#staticBackdrop");
        // evento
        btnEdit.addEventListener("click",()=> editTask(tarea))
        // Creamos el icono de trash
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-pen-to-square');
        //------  Agregamos los elementos hijos a los contenedores padres  ---------------------
        btnEdit.appendChild(icon);
        contenedorBtn.appendChild(btnEdit);
        // Agregamos los divs al div principal
        divCheck.appendChild(contenedorCheckbox);
        divCheck.appendChild(contenedorBtn);
        // Agregamos el div principal al contenedor showTask
        showTask.appendChild(divCheck);
      };
    }); 
}
