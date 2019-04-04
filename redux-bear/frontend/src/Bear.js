import React, {Component} from 'react';
import {  store} from "./App";
import {connect} from "react-redux";
import {getBears,findBear,addBear,updateBear,deleteBear} from "./App"
import './App.css'


class Bear extends Component {
    state = {
        addstatus : false,
        removestatus : false,
        findstatus: false,
        findAllstatus : false,
        changestatus: false,
        bear_id:'',
        bear_name : '',
        bear_weight : '',
        show : false
    }

    // componentDidMount = () => {
    //     this.props.getBears()
    // }
    handleChagne = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    } 
    
    renderBear = () => {
        console.log(this.props.bears)
        
            return  this.props.bears.map( (bear,index) =>
                (<li key={index}> {bear.id} {bear.name} {bear.weight} </li>)
            )  
          
    }
    
    findBear = (bear_id) => async () => {
        if(bear_id){
            try {
                await store.dispatch(findBear(bear_id))
                if(this.props.bears.id !== undefined){
                    alert("หมีทีท่านต้องการคือ \nid : "+this.props.bears.id +"\nName : "+this.props.bears.name+"\nWeight : "+this.props.bears.weight)
                }else{
                    alert("ไม่มีหมีทีท่านต้องการ..") 
                }
               
            }catch (err){
                console.error(err);  
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
  
    }
    addBear = () => async () => {
        if(this.state.bear_name&&this.state.bear_weight){
            try {
                //onsole.log("HERE")
                let bear = {name: this.state.bear_name , weight:this.state.bear_weight}
                //console.log("bear ",bear)
                await store.dispatch(addBear(bear))
                alert('เพิ่มหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    updateBear = () => async () => {
        
        if(this.state.bear_id&&this.state.bear_name&&this.state.bear_weight){

            try {
                //console.log("HERE")
                let bear = {bear_id: this.state.bear_id , name: this.state.bear_name , weight:this.state.bear_weight}
                //console.log("bear ",bear)
                await store.dispatch(updateBear(bear))
                alert('แก้ไขหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
                alert('ไม่พบหมีที่ต้องการแก้ไข...')
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    deleteBear = (bear_id) => async () => {
        if(this.state.bear_id){
            try {
                //console.log("HERE")
                await store.dispatch(deleteBear(bear_id))
                alert('ลบหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    findBears  = () => async () => {
        try {
            //console.log("HERE")
            await store.dispatch(getBears())
            this.setState({findAllstatus : true})
        } catch (error) {
            console.error(error);
        }
        
    }
    render() {
        const  { addstatus, removestatus,findstatus,findAllstatus,changestatus } = this.state
        if(addstatus === false && removestatus === false && findstatus === false && findAllstatus === false && changestatus === false){
            return(
                <div className="bears" >
                <h1 className="App">Bears</h1>
                    <button className="button-color" onClick={()=> {this.setState({addstatus : true}) }}>ADD</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({changestatus : true}) }}>UPDATE BEAR</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({removestatus : true}) }}>DELETE</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({findstatus : true}) }}>FIND BEAR</button> {' '}
                    <button className="button-color" onClick={this.findBears()}>SHOW ALL BEARS</button> {' '}
                    
                </div>

            )
        }
        else if(addstatus && !removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="bears">
                    <h1 className="App">Bears</h1>
                    <table align="center" >
                        <tbody>
                            <tr>
                                <td><h3 className="leftText"> Bear Name :</h3></td>
                                <td><input name="bear_name" type="text" onChange={this.handleChagne}></input></td>
                            </tr>
                            <tr>
                                <td><h3 className="leftText">Bear Weight :</h3></td>
                                <td><input name="bear_weight" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button className="button-color" onClick={this.addBear()}>ADD BEAR</button><br/><br/><br/>
                    <button className="button-color" onClick={()=> {this.setState({addstatus : false}) }}>BACK</button>
                    
                    
                </div>
            );
        }
        else if(!addstatus && removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="bears">
                    <h1 className="App">Bears</h1>
                    <table align="center" >
                        <tbody>
                            <tr >
                                <td ><h3 className="leftText">Bear ID :</h3></td>
                                <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                        
                    </table>
                    
                    <button className="button-color" onClick={this.deleteBear(this.state.bear_id)}>DELETE BEAR</button><br/><br/><br/>
                    <button className="button-color" onClick={()=> {this.setState({removestatus : false}) }}>BACK</button>
                </div>
            )
        }
        else if(!addstatus && !removestatus && findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="bears">
                <h1 className="App">Bears</h1>
                <table align="center" >
                    <thead>
                        <tr >
                            <td ><h3 className="leftText">Bear ID :</h3></td>
                            <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </thead>
                </table>
                
                <button className="button-color" onClick={this.findBear(this.state.bear_id)}>FIND BEAR</button><br/><br/><br/>
                
                <button className="button-color" onClick={()=> {this.setState({findstatus : false,show : false}) }}>BACK</button>
            </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& findAllstatus && !changestatus ){
            
            return (
                <div className="bears">
                    <h1 className="App">Bears</h1>
                    <hr/>
                        <ul>
                            <h1>{ this.renderBear()}</h1>
                        </ul>
                    <hr/>
                    <button className="button-color" onClick={()=> { this.setState({findAllstatus : false}) }}>BACK</button>
                    
                    
                    
                </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& !findAllstatus && changestatus ){
            return (
                <div className="bears">
                <h1 className="App">Bears</h1>
                <table align="center" >
                    <tbody>
                        <tr >
                            <td ><h3 className="leftText">Bear ID :</h3></td>
                            <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText"> Bear Name :</h3></td>
                            <td><input name="bear_name" type="text" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText">Bear Weight :</h3></td>
                            <td><input name="bear_weight" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </tbody>
                </table>
                
                <button className="button-color" onClick={this.updateBear()}>UPDATE BEAR</button><br/><br/><br/>
                <button className="button-color" onClick={()=> {this.setState({changestatus : false}) }}>BACK</button>
                
                
            </div>
            )
        }
       
    }
}


  
const mapStateToProps = (bears) => {
    return {
        bears:bears.bearsPass
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBears:  () => store.dispatch(getBears()),
        findBear:  () => store.dispatch(findBear()),
        addBear:  () => store.dispatch(addBear()),
        updateBear:  () => store.dispatch(updateBear()),
        deleteBear :  () => store.dispatch(deleteBear()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bear);