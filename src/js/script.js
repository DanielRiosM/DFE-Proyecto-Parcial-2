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
                li.innerHTML = `${task.title} - ${task.description} - ${task.completed} -${task.priority} - ${task.dueDate}`;
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
    const tag = "DFE 2023-2";
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

function normalizeCompleted(completedValue) {
    // Convierte el valor de "completed" a un booleano (true o false)
    if (completedValue === "true" || completedValue === "1") {
        return true;
    } else {
        return false;
    }
}

function normalizePriority(completedValue) {
    // Convierte el valor de "completed" a un booleano (true o false)
    if (completedValue === "Baja" || completedValue === "1") {
        return "Baja";
    } else if (completedValue === "Media" || completedValue === "2") {
        return "Media";
    } else{
        return "Alta";
    }
}

function editTask(id) {
    const title = prompt("Nuevo título de la tarea:");
    if (title === null) {
        return;
    }

    const description = prompt("Nueva descripción de la tarea:");
    const completedInput = prompt("¿Esta completado? (1=si y 2=no)")
    const completed = normalizeCompleted(completedInput);
    const priorityInput = prompt("Nueva prioridad de la tarea (1=Baja 2=Media 3=Alta):");
    const priority = normalizePriority(priorityInput);
    const dueDate = prompt("Nueva fecha de vencimiento (AAAA-MM-DD):");

    const data = {
        title,
        description,
        completed,
        priority,
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
                // Tarea editada exitosamente
                getTasks(); // Actualizar la lista de tareas después de editar
            } else {
                console.error("Error al editar la tarea");
            }
        })
        .catch((error) => {
            console.error("Error al editar la tarea: " + error);
        });
}

function deleteTask(id) {
    // Confirmar si el usuario realmente quiere eliminar la tarea
    if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    // Tarea eliminada exitosamente
                    getTasks(); // Actualizar la lista de tareas después de eliminar
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