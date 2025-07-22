import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const task = {
      id: Date.now(),
      text: trimmed,
      done: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const beginEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const applyEdit = (id) => {
    const trimmed = editingText.trim();
    if (!trimmed) return;

    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, text: trimmed } : t
    ));

    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="todo-container">
      <h1 className="title">My To-Do List</h1>

      <form onSubmit={addTask} className="form">
        <input
          className="input"
          placeholder="What do you need to do?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.done ? "done" : ""}`}>
            {editingId === task.id ? (
              <input
                className="edit-input"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => applyEdit(task.id)}
              />
            ) : (
              <span
                className="task-text"
                onClick={() => beginEdit(task)}
              >
                {task.text}
              </span>
            )}

            <div className="btn-group">
              <button
                className="btn small"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                className="btn small delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;