import React, { Component } from "react";
import "./app.css";

let paresedData = localStorage.getItem("todoList");
let initialTodoList = JSON.parse(paresedData);
let length = initialTodoList.length + 1;
export default class App extends Component {
  state = {
    todoList: initialTodoList,
    inputText: "",
    editText: "",
  };

  addInputText = (e) => {
    e.preventDefault();
    const { inputText } = this.state;
    if (inputText === "") {
      return alert("please enter todo");
    }
    const newTodo = {
      id: length,
      text: inputText,
      isEdit: false,
      isChecked: false,
    };
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newTodo],
    }));
    length += 1;
  };

  onDeleteHandler = (id) => {
    const { todoList } = this.state;
    const filterdData = todoList.filter((item) => item.id !== id);
    this.setState({ todoList: filterdData });
  };

  updateEditStatus = (id) => {
    this.setState((prev) => ({
      todoList: prev.todoList.map((item) =>
        item.id === id ? { ...item, isEdit: !item.isEdit } : item
      ),
    }));
  };

  updateCheckboxStatus = (id) => {
    this.setState((prev) => ({
      todoList: prev.todoList.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      ),
    }));
  };

  editTextHandler = (id, description) => {
    this.setState((prev) => ({
      todoList: prev.todoList.map((item) =>
        item.id === id ? { ...item, text: description } : item
      ),
    }));
  };

  saveTodoItems = () => {
    const { todoList } = this.state;
    const data = JSON.stringify(todoList);
    localStorage.setItem("todoList", data);
  };

  render() {
    const { todoList, inputText, editText } = this.state;

    return (
      <div className="todoContainer d-flex flex-column align-items-center  p-4">
        <h1 className="mb-3 heading">Todo List</h1>
        <form className="d-flex" onSubmit={this.addInputText}>
          <input
            type="text"
            className="form-control mr-3"
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
                    className="p-2"
                    style={{ fontSize: "18px", border: "none" }}
                    value={item.text}
                    onChange={(e) =>
                      this.editTextHandler(item.id, e.target.value)
                    }
                  />
                ) : (
                  <p
                    className={item.isChecked ? "toogleChecklist" : null}
                    style={{ fontSize: "23px" }}
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
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn-info" onClick={this.saveTodoItems}>
          Save
        </button>
      </div>
    );
  }
}
