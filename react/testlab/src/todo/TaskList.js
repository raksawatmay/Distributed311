import React,{Component} from 'react'
import '../App.css';

class TaskList extends Component {
   render() {
       if ( this.props.tasks && this.props.tasks2 )
           return (
           <div className="list1">
               <ul> {
                   this.props.tasks.map((item) => (
                       <li key={item.id}> {item.task} : {item.data}</li>
                   ))
               }
               {this.props.tasks2.map((item2) => (
                       <li key={item2.id}> {item2.data} </li>
                   ))
                   
               }
           </ul>
           </div>
           )
   }
}

export default TaskList