import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

const API_URL = "https://playground.4geeks.com/todo/";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    initializeUserAndTasks();
  }, []);

  async function initializeUserAndTasks() {
    await getTasks();
  }

  async function createUser() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/Samir_Mondabla",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]), // Enviar un array vacío para crear el usuario
        }
      );
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
    } catch (error) {
    }
  }

  async function getTasks() {
    try {
      const response = await fetch(`${API_URL}users/Samir_Mondabla`);
      if (!response.ok) {
        if (response.status === 404) {
          await createUser();
          await getTasks();
          return;
        } else {
          throw new Error("Failed to fetch tasks");
        }
      }
      const data = await response.json();
      setTodos((prevTodos) => (data.todos ? data.todos : []));
    } catch (error) {
      setTodos([]);
    }
  }

  async function addTodo(e) {
    if (e.key === "Enter" || e.type === "click") {
      if (inputValue.trim() !== "") {
        try {
          const response = await fetch(
            `${API_URL}todos/Samir_Mondabla`,
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                label: inputValue,
                is_done: false,
              }),
            }
          );
          const data = await response.json();
          setTodos((prevTodos) => [...prevTodos, { id: data.id, label: inputValue, completed: false }]);
          setInputValue("");
        } catch (error) {
        }
      }
    }
  }

  async function deleteTasks(id) {
    try {
      const response = await fetch(`${API_URL}todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
      }
    } catch (error) {
    }
  }

  async function deleteAllTasks() {
    try {
      const deletePromises = todos.map((todo) =>
        fetch(`${API_URL}todos/${todo.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      await Promise.all(deletePromises);
      setTodos([]);
    } catch (error) {
    }
  }

  const handleToggleCompleted = (indexToToggle) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo, index) => {
        if (index === indexToToggle) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const countPendingTodos = () => {
    return todos.filter((todo) => !todo.completed).length;
  };
  
  return (
    <div className="container">
      <h1 className="text-center mb-4">Lista de Tareas</h1>
      <div className="input-container">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={addTodo}
          name="text"
          placeholder="¿Cuál es la tarea hoy?"
          className="input"
          type="text"
        />
        <button type="submit" className="todo-btn" onClick={addTodo}>
          Agregar Tarea
        </button>
      </div>
      <ul className="col-12 p-0 mt-3">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`Todo text-white ${todo.completed? "completed" : ""}`}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleCompleted(index)}
            />
            {todo.label}
            <i
              className="ml-2 fa fa-trash"
              onClick={() => deleteTasks(todo.id)}
            ></i>
          </li>
        ))}
      </ul>
      <div className="col-12 p-0 text-white text-center">
        {countPendingTodos()} elemento(s) pendiente(s)
      </div>
      <div className="col-12 p-0 text-center">
        <button className="todo-btn2 mt-2" onClick={deleteAllTasks}>
          Eliminar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default TodoList;