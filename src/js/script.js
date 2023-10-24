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
                li.innerHTML = `${task.title} - ${task.description} - ${task.priority} - ${task.dueDate}`;
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
    const priority = document.getElementById("priority").value;
    const tag = "DFE 2023-2";
    const dueDate = document.getElementById("dueDate").value;
    const data = {
        title,
        description,
        completed: false,
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
    // Implementa la lógica para editar una tarea aquí
}

function deleteTask(id) {
    // Implementa la lógica para eliminar una tarea aquí
}

// Llamar a getTasks al cargar la página para mostrar las tareas existentes.
getTasks();
addTask();