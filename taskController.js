const Task = require('./taskModel'); 


async function getAllTasks(req, res) {
  try {
    const tasks = await Task.findAll(); 
    res.status(200).json({ response: { success: true, tasks } });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ response: { success: false, message: 'Failed to fetch tasks' } });
  }
}


async function createTask(req, res) {
  try {
    const { text, completed = false } = req.body;
    if (!text) {
      return res.status(400).json({ response: { success: false, message: 'Task text is required' } });
    }

    const newTask = await Task.create({ text, completed }); 
    res.status(201).json({ response: { success: true, id: newTask.id } });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ response: { success: false, message: 'Failed to create task' } });
  }
}


async function updateTask(req, res) {
  try {
    const { text, completed } = req.body;
    const taskId = req.params.id;

    await Task.update({ text, completed }, { where: { id: taskId } }); 
    res.status(200).json({ response: { success: true, message: 'Task updated' } });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ response: { success: false, message: 'Failed to update task' } });
  }
}


async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;

    await Task.destroy({ where: { id: taskId } }); 
    res.status(200).json({ response: { success: true, message: 'Task deleted' } });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ response: { success: false, message: 'Failed to delete task' } });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
