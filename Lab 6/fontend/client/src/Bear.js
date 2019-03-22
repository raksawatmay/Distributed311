import React, { Component } from "react";
import { getBears } from "./App";
import { connect } from "react-redux";

class Bear extends Component {
  state = {
    name: " "
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{ margin: "20px", textAlign: "center" }}>
        <h3>Input name with Github</h3>
        <input type="text" name="name" onChange={this.handleChange} />
        <button onClick = { () =>this.props.getBears(this.state.name)}>Submit</button><br/>
        <img src={this.props.bears.avatar_url} width="450px" style={{ marginTop: "20px" }}/>
        <ul style={{ padding: "0 120px" }}>{this.props.bears.name}</ul>
        <ul style={{ padding: "0 120px" }}>{this.props.bears.html_url}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ bears }) => {
  return { bears };
};

const mapDispatchToProps = dispatch => {
  return {
    getBears: (name) => dispatch(getBears(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bear);
