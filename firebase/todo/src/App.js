import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 0, name: "Benz", age: "22" },
        { id: 1, name: "Jook", age: "22" }
      ],
      task: "",
      age: null
    };

    var config = {
      apiKey: "AIzaSyBCcUWPDbpQ54lrkSz9BetY_ke2X2VH1YU",
      authDomain: "todo-fc82a.firebaseapp.com",
      databaseURL: "https://todo-fc82a.firebaseio.com",
      projectId: "todo-fc82a",
      storageBucket: "todo-fc82a.appspot.com",
      messagingSenderId: "492128981451"
    };

    if (firebase.apps.length === 0) firebase.initializeApp(config);
  }
  componentDidMount() {
    console.log("firebase: ", firebase.database());
    console.log("firebase: ", firebase.app().name);

    let myapp = firebase.database().ref("/");
    let tasksChild = myapp.child("/taskTable");
    tasksChild.on("value", snapshot => {
      console.log("task0: ", snapshot.val().tasks);
      if (snapshot.val()) {
        this.setState({
          tasks: snapshot.val().tasks
        });
      }
      console.log("state", this.state.tasks);
    });
  }

  removeTask = id => {
    let array = [...this.state.tasks];
    console.log("arr", array);

    let index = array.findIndex(task => task.id === id);
    array.splice(index, 1);
    this.setState({ tasks: array });
    console.log("update states tasks:", this.state.tasks);

    let tasksChild = firebase
      .database()
      .ref("/")
      .child("/taskTable/tasks/" + (id - 1));
    tasksChild
      .remove()
      .then(() => console.log("Remove success: "))
      .catch(err => console.log("Remove failed: " + err))
      .finally(() => this.componentDidMount());
  };

  addTask = (task, task2) => {
    if (this.state.task !== "" && this.state.age !== null) {
      let lastItem = this.state.tasks[this.state.tasks.length - 1];
      let newTask = {
        id: lastItem.id + 1,
        name: this.state.task,
        age: this.state.age * 1
      };
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });

      let tasksChild = firebase
        .database()
        .ref("/")
        .child("/taskTable/tasks/" + lastItem.id);
      tasksChild
        .set(newTask)
        .then(() => console.log("Add successfully: "))
        .catch(err => console.log("Remove failed: " + err))
        .finally(() => this.componentDidMount());
    } else {
    }
  };

  editTask = id => {
    const index = this.state.tasks.findIndex(task => task.id === id);
    console.log("S", this.state.tasks[index].name);
    this.setState({ task: this.state.tasks[index].name });
    console.log("X", this.state);
  };

  updateTask = id => {
    console.log("this.state.task", this.state.task);
    if (this.state.age !== null) {
      console.log("update states tasks:", this.state.tasks);
      let array = [...this.state.tasks];
      let index = array.findIndex(task => task.id === id);
      array[index].age = this.state.task;
      console.log("ArrUP", array);

      this.setState({ tasks: array });

      let tasksChild = firebase
        .database()
        .ref("/")
        .child("/taskTable/tasks/" + (id - 1));
      tasksChild
        .set({
          id: array[index].id,
          name: this.state.task,
          age: this.state.age * 1
        })
        .then(() => console.log("Update successfully: "))
        .catch(err => console.log("Update failed: " + err))
        .finally(() => this.componentDidMount());
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderTasks = () => {
    if (this.state.tasks.length !== 0)
      return this.state.tasks.map((task, index) => {
        return (
          <tr key={index}>
            <td style={{ color: "white" }}>{task.id}</td>
            <td style={{ color: "white" }}>{task.name}</td>
            <td style={{ color: "white" }}>{task.age}</td>
            <td>
              <button
                className="button-color"
                onClick={() => this.editTask(task.id)}
              >
                {" "}
                Get
              </button>
              <button
                className="button-color"
                onClick={() => this.updateTask(task.id)}
              >
                {" "}
                Update
              </button>
              <button
                className="button-color"
                onClick={() => this.removeTask(task.id)}
              >
                {" "}
                Delete
              </button>
            </td>
          </tr>
        );
      });
  };

  render() {
    return (
      <div className="todo" style={{ margin: "40px" }}>
        <h1 className="App">Age_Todo</h1>
        <form className="add">
          <input
            style={{ paddingLeft: "10px", padding: "5px", marginRight: "10px" }}
            type="text"
            name="task"
            onChange={this.handleChange}
            placeholder="Nickname"
          />
          <input
            style={{ paddingLeft: "10px", padding: "5px" }}
            type="number"
            name="age"
            onChange={this.handleChange}
            placeholder="Age"
          />
          <button className="button-color" onClick={this.addTask}>
            Add
          </button>
        </form>

        <table style={{ marginLeft: "auto", marginRight: "auto" }}>
          <thead>
            <tr style={{ color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTasks()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
