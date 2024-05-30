import React, { useState } from "react";
import { Button, Input, List, Typography, Checkbox, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setUpdatedTodoText("");
    setIsModalVisible(false);
  };

  const updateTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setUpdatedTodoText("");
    setIsModalVisible(false);
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
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <form onSubmit={addTodo} style={{ display: "flex", marginBottom: 20 }}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ marginRight: 10 }}
        />
        <Button type="primary" htmlType="submit">
          Add Todo
        </Button>
      </form>
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => startEditing(todo.id, todo.text)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => deleteTodo(todo.id)}
              />,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <Text
              delete={todo.completed}
              style={{ marginLeft: 8, flex: 1 }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </Text>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onOk={() => updateTodo(editingTodoId)}
        onCancel={cancelEditing}
      >
        <Input
          type="text"
          value={updatedTodoText}
          onChange={(e) => setUpdatedTodoText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Todo;
