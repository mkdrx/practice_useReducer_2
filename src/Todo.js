import React, { useReducer, useState } from "react";

// Types for dispatch
const TYPES = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
};

// Initial empty array - to be filled by to-dos
const initialTodos = [];

// Reducer function used by useReducer - takes the dispatch() as action and updates the state based on xyz
const reducer = (state, action) => {
  // Switch statement to check what action was dispatch'd
  switch (action.type) {
    case TYPES.DELETE:
      return state.filter((todo) => todo.id !== action.payload);

    case TYPES.ADD:
      return [...state, action.payload];

    case TYPES.UPDATE:
      const todoEdit = action.payload;
      return state.map((todo) => (todo.id === todoEdit.id ? todoEdit : todo));

    default:
      return state;
  }
};

// Component
const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newTodo = { id: Math.floor(Math.random() * 10000), title: text };
    dispatch({ type: TYPES.ADD, payload: newTodo });
  };

  return (
    <div>
      <h2>To-do list</h2>
      <ul>
        {/*  Maps through every to-do and creates it with its title and with Delete/Update buttons */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button
              onClick={() => dispatch({ type: TYPES.DELETE, payload: todo.id })}
            >
              Delete
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: TYPES.UPDATE,
                  payload: { ...todo, title: text },
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add a To-do"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Todo;
