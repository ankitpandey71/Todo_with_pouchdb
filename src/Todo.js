import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
    setNewTodo("");
  };

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setUpdatedTodoText(text);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setUpdatedTodoText("");
  };

  const updateTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setUpdatedTodoText("");
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={updatedTodoText}
                  onChange={(e) => setUpdatedTodoText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <span
                  style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
