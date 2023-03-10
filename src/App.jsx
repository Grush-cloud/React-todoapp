import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faCheck, faPlus);

function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todosText, setTodosText] = useState("");

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  //function that gets text that is typed in the input.
  function handleOnChange(e) {
    setTodosText(e.target.value);
  }

  //function for add button
  function handleAdd() {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random(), text: todosText, status: false },
    ]);
    setTodosText("");
  }

  //form submit to prevent page refresh
  function handleOnSubmit(e) {
    e.preventDefault();
  }

  //function for complete button
  function handleComplete(id) {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, status: true } : todo
      )
    );
  }

  //function for remove completed button
  function handleRemoveCompleted() {
    setTodos((prevState) => {
      return prevState.filter((item) => item.status === false);
    });
  }

  //displays to-do-list items
  const showText = todos.map((txt) => (
    <div className="todo" key={txt.id}>
      <p className={!txt.status ? "todo-item" : "todo-item-completed"}>
        <span className="todo.text">{txt.text}</span>
      </p>

      {!txt.status && (
        <button
          className="completed-btn"
          onClick={() => handleComplete(txt.id)}
        >
          <FontAwesomeIcon icon="check" />
        </button>
      )}
    </div>
  ));

  return (
    <div className="App">
      <header className="header">
        <h1 className="nav-title">ToDo list</h1>

        <button className="remove-btn" onClick={handleRemoveCompleted}>
          remove completed
        </button>
      </header>
      <form className="form" onSubmit={handleOnSubmit}>
        <input
          className="type-text"
          type="text"
          placeholder="Type todo here"
          onChange={handleOnChange}
          value={todosText}
        />

        {todosText.length > 0 && (
          <button className="add-btn" onClick={handleAdd}>
            <FontAwesomeIcon icon="plus" />
          </button>
        )}
      </form>
      {showText}
    </div>
  );
}

export default App;
