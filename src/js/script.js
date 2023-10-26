const apiUrl = "https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219203957/tasks";

function getTasks() {
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = "";
            data.forEach((task) => {
                const li = document.createElement("li");
                li.innerHTML = `${task.title} / ${task.description} / ${task.completed} / ${task.priority} / ${task.tag} / ${task.dueDate}`;
                const editButton = document.createElement("button");
                editButton.innerText = "Editar";
                editButton.onclick = () => editTask(task.id);
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Eliminar";
                deleteButton.onclick = () => deleteTask(task.id);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const completed = document.getElementById("checkbox-input").checked;
    const priority = document.getElementById("priority").value;
    const tag = document.getElementById("tag").value;
    const dueDate = document.getElementById("dueDate").value;
    const data = {
        title,
        description,
        completed,
        priority,
        tag,
        dueDate,
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            getTasks();
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("dueDate").value = "";
        });
}


function editTask(id) {
        // Abre el modal para editar la tarea
        const modal = document.getElementById("editTaskModal");
        modal.style.display = "block";
    
        // Realiza una solicitud GET para obtener los datos de la tarea a editar
        fetch(`${apiUrl}/${id}`, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            const taskToEdit = data;
            document.getElementById("editTitle").value = taskToEdit.title;
            document.getElementById("editDescription").value = taskToEdit.description;
            document.getElementById("editCompleted").value = taskToEdit.completed;
            document.getElementById("editPriority").value = taskToEdit.priority;
            document.getElementById("editTag").value = taskToEdit.tag;
            document.getElementById("editDueDate").value = taskToEdit.dueDate;
    
            document.getElementById("saveChangesButton").addEventListener("click", function() {
            saveEditedTask(id, taskToEdit); 
            });
    
        })
        .catch((error) => {
            console.error("Error al obtener los datos de la tarea: " + error);
        });
}
function saveEditedTask(id, taskData) {
        const title = document.getElementById("editTitle").value;
        const description = document.getElementById("editDescription").value;
        const completed = document.getElementById("editCompleted").value;
        const priority = document.getElementById("editPriority").value;
        const tag = document.getElementById("editTag").value;
        const dueDate = document.getElementById("editDueDate").value;

        const data = {
        title,
        description,
        completed,
        priority,
        tag,
        dueDate,
        };

        fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.status === 200) {
            getTasks(); 
            closeEditTaskModal(); 
            } else {
            console.error("Error al editar la tarea");
            }
        })
        .catch((error) => {
            console.error("Error al editar la tarea: " + error);
        });
}

function closeEditTaskModal() {
    const modal = document.getElementById("editTaskModal");
    modal.style.display = "none";
}

function deleteTask(id) {
    // Confirmar si el usuario realmente quiere eliminar la tarea
    if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    getTasks();
                } else {
                    console.error("Error al eliminar la tarea");
                }
            })
            .catch((error) => {
                console.error("Error al eliminar la tarea: " + error);
            });
    }
}

// Llamar a getTasks al cargar la página para mostrar las tareas existentes.
getTasks();