import React, { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Fetch todos from the provided API endpoint
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;

    if (editingTask !== null) {
      // Editing an existing task
      const updatedTodos = todos.map((todo, index) => {
        if (index === editingTask) {
          return { ...todo, title: newTask };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setNewTask('');
      setEditingTask(null);
    } else {
      // Adding a new task
      const newTodo = {
        userId: 1,
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setNewTask(todos[index].title);
    setEditingTask(index);
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="main-container">
      <div className="AddTodo-container">
      <h1 className="main-heading">Todo List</h1>
      <div>
      <input
        type="text"
        placeholder="Add a new task"
        className="input-container"
        value={newTask}
        onChange={(error) => setNewTask(error.target.value)}
      />
      <button onClick={addTask} className="button">
        {editingTask !== null ? 'Update Task' : 'Add Task'}
      </button>
      </div>
      </div>
      <div className="Todo-user">
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {todo.title}
            <button className="button1" onClick={() => editTask(index)}>Edit</button>
            <button className="button2" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;