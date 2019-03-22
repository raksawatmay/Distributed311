import React, { Component } from "react";
import { connect } from "react-redux";
import { add, minus, add2, addlist, store } from "./App";

class Count extends Component {
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <h2>Count: {this.props.y}</h2>
        <ul>
          {this.props.y2.tasks.map(item => (
            <li key={item.id}> {item.task}</li>
          ))}
        </ul>
        <input type="hidden" name="id" value={this.props.id} />
        <br />
        <input
          type="text"
          name="task"
          onChange={this.handleChange}
          placeholder="task"
        />{" "}
        <br />
        <button onClick={this.props.add}> + </button>
        <button onClick={this.props.add2}> +2 </button>
        <button onClick={this.props.minus}> - </button>
        <button onClick={this.props.addlist}>addlist</button>
      </div>
    );
  }
}

const mapStateToProps = ({ x, a }) => {
  return { y: x, y2: a };
};
// const mapStateToProps2 = ( {a} ) => { return {y2:a} }

const mapDispatchToProps = () => {
  return {
    add: () => store.dispatch(add()),
    add2: () => store.dispatch(add2(2)),
    minus: () => store.dispatch(minus()),
    addlist: () => store.dispatch(addlist())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
