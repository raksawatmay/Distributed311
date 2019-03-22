import React, {Component} from 'react'
import TaskList from './todo/TaskList'
import InputTask from "./todo/InputTask";
import Github from "./Github";
import Axios from "axios";
import './App.css';

// class App extends Component {
//     state = { count:0 }
//     constructor(props) {
//       super(props)
//     }
   
//     add = () => {
//         this.setState({count:this.state.count+1})
//     }
//     delete = () => {
//         this.setState({count:this.state.count-1})
//     }
//     clear = () => {
//         this.setState({count:this.state.count=0})
//     }

//     render() {
//         return (
//             <div style={{textAlign:"center"}}>
//                 <header><h1>Counter</h1></header>
//                 <div style={{marginBottom:"30px"}}>{this.state.count}</div>
//                 <button onClick={this.add}> Add </button>
//                 <button onClick={this.delete}> Delete </button>
//                 <button onClick={this.clear}> Clear </button>
//             </div>
//         );
//     }
// }

class App extends Component {

    state = {
        tasks: [{id: 1, task: 'Do homework',data:'Hello'},
                {id: 2, task: 'Read book',data:'World'}],
        
        tasks2:[{id: 3,where:'home'}],
        id:4,user:'',
        data: null,
    }
 
    addTask = (task,data) => {
        this.setState({
                 tasks: [...this.state.tasks, {id: this.state.id,task,data } ],
                 id: this.state.id+1  })
    }
    addUser = (user) =>{
        this.fetchUser(user)
        this.setState({
        user: user
     }) 
    }

    fetchUser = (USER) => {
    Axios.get(`https://api.github.com/users/${USER}`)
        .then(res => {
            this.setState({data: res.data})
            console.log(res.data)
        })
    }

    fetchPersons = () => {
    Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const persons = res.data
            this.setState({persons})
            console.log(persons)
        })
    }
 
    componentWillMount(){
        this.fetchPersons();
    }

    render() {   
 
 
        return (
            <div className="change">
                <h1>Todo</h1>
                <TaskList tasks={this.state.tasks} tasks2={this.state.tasks2}/>
                <InputTask addTask={this.addTask} id={this.state.id} user= {this.state.user} addUser={this.addUser}/>
                <br/>
                <Github data={this.state.data}/>
                <div className="list2"> <ul>{ this.state.persons ? this.state.persons.map(persons => <li>{persons.address.street}</li>) : <p>no data</p>}</ul>
                </div>
            </div>
        );
    }
 }
 



export default App;