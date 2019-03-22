import React, {Component}  from 'react';
import '../App.css';

class InputTask extends Component {

   state = {task:'',data:'',user:''}

   handleChange = (e) => {
       this.setState({ [e.target.name] : e.target.value });
   }

   render() {
       return (
           <div className="add">
               <input type="hidden" name="id" value={this.props.id} /><br/>
               <input type="text" name="task" onChange={this.handleChange} placeholder="task" /> <br/>
               <input type="text" name="data" onChange={this.handleChange} placeholder="data" /> <br/>
               <input type = "text" name = "user" onChange = {this.handleChange} placeholder="Username" /> <br/>
               <button onClick={() => this.props.addTask(this.state.task,this.state.data)}>Add</button>
               <button onClick={() => this.props.addUser(this.state.user)} >User id</button>
           </div>
       )
   }
}

export default InputTask