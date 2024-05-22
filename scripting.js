async function fetchTasks() {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks`);
    const data = await response.json();
    const taskList = document.getElementById("task-list");

    taskList.innerHTML = "";
    data.response.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id}, this.checked)">
        <span>${task.text}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="editTask(${task.id}, '${task.text}')">Edit</button> <!-- Add edit button -->
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}


async function createTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText) {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: taskText })
      });

      if (response.ok) {
        taskInput.value = ""; 
        fetchTasks(); 
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  } else {
    alert("Task cannot be empty");
  }
}


async function toggleTask(id, isCompleted) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: isCompleted }) 
    });

    if (response.ok) {
      fetchTasks(); 
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTasks(); // Refresh the task list
    } else {
      console.error("Error deleting task:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}


async function editTask(id, currentText) {
  const newText = prompt("Edit task text:", currentText); 
  if (newText) {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }), 
      });

      if (response.ok) {
        fetchTasks(); 
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  } else {
    console.error("No new text provided for task"); 
  }
}
