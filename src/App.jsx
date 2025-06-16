import React, { Component } from "react";
import "./App.css";

const getInitialTodos = () => {
  const parsedData = localStorage.getItem("todoList");
  try {
    return parsedData ? JSON.parse(parsedData) : [];
  } catch {
    return [];
  }
};

export default class App extends Component {
  state = {
    todoList: getInitialTodos(),
    inputText: "",
  };

  generateNewId = () => {
    const { todoList } = this.state;
    return todoList.length > 0
      ? Math.max(...todoList.map((todo) => todo.id)) + 1
      : 1;
  };

  addInputText = (e) => {
    e.preventDefault();
    const { inputText } = this.state;
    if (!inputText.trim()) {
      alert("Please enter a todo");
      return;
    }

    const newTodo = {
      id: this.generateNewId(),
      text: inputText.trim(),
      isEdit: false,
      isChecked: false,
    };

    this.setState(
      (prevState) => ({
        todoList: [...prevState.todoList, newTodo],
        inputText: "",
      }),
      this.saveTodoItems
    );
  };

  onDeleteHandler = (id) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.filter((item) => item.id !== id),
      }),
      this.saveTodoItems
    );
  };

  updateEditStatus = (id) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.map((item) =>
          item.id === id ? { ...item, isEdit: !item.isEdit } : item
        ),
      }),
      this.saveTodoItems
    );
  };

  updateCheckboxStatus = (id) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.map((item) =>
          item.id === id ? { ...item, isChecked: !item.isChecked } : item
        ),
      }),
      this.saveTodoItems
    );
  };

  editTextHandler = (id, newText) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.map((item) =>
          item.id === id ? { ...item, text: newText } : item
        ),
      }),
      this.saveTodoItems
    );
  };

  saveTodoItems = () => {
    const { todoList } = this.state;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  render() {
    const { todoList, inputText } = this.state;

    return (
      <div className="todoContainer d-flex flex-column align-items-center p-4">
        <h1 className="mb-3 heading">Todo List</h1>
        <form className="d-flex" onSubmit={this.addInputText}>
          <input
            type="text"
            className="form-control mr-3"
            placeholder="Enter new todo"
            onChange={(e) => this.setState({ inputText: e.target.value })}
            value={inputText}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <ul
          className="card w-50 mt-4 p-4"
          style={{
            listStyleType: "none",
            background: "black",
            color: "white",
            borderRadius: "12px",
          }}
        >
          {todoList.map((item) => (
            <li
              key={item.id}
              className="border m-2 p-3 d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.isChecked}
                  onChange={() => this.updateCheckboxStatus(item.id)}
                />
                {item.isEdit ? (
                  <input
                    type="text"
                    className="p-2 ml-2"
                    style={{ fontSize: "18px", border: "none" }}
                    value={item.text}
                    onChange={(e) =>
                      this.editTextHandler(item.id, e.target.value)
                    }
                  />
                ) : (
                  <p
                    className={item.isChecked ? "toogleChecklist ml-2" : "ml-2"}
                    style={{
                      fontSize: "23px",
                      textDecoration: item.isChecked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => this.updateEditStatus(item.id)}
                >
                  {item.isEdit ? "Save" : "Edit"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.onDeleteHandler(item.id)}
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
}
