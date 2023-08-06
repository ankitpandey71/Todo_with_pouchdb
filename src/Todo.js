import React, { useState, useEffect } from "react";
import PouchDB from "pouchdb";

const db = new PouchDB("todos");

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch all todos from the local PouchDB database
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const result = await db.allDocs({ include_docs: true });
      const todos = result.rows.map((row) => row.doc);
      setTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    try {
      const todo = {
        _id: new Date().toISOString(),
        text: newTodo,
        completed: false,
      };
      await db.put(todo);
      setNewTodo("");
      fetchTodos(); // Refresh the todos list after adding a new todo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = await db.get(id);
      todo.completed = !todo.completed;
      await db.put(todo);
      fetchTodos(); // Refresh the todos list after toggling the todo
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todo = await db.get(id);
      await db.remove(todo);
      fetchTodos(); // Refresh the todos list after deleting the todo
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
