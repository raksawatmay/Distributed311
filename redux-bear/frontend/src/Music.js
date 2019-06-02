import React, {Component} from 'react';
import { store} from "./App";
import {connect} from "react-redux";
import {getMusics,findMusic,addMusic,updateMusic,deleteMusic} from "./App"
import './App.css'


class Music extends Component {
    state = {
        addstatus : false,
        removestatus : false,
        findstatus: false,
        findAllstatus : false,
        changestatus: false,
        music_id:'',
        music_name : '',
        music_price : '',
        show : false
    }

    handleChagne = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    } 
    
    renderMusic = () => {
        console.log(this.props.musics)
        
            return  this.props.musics.map( (music,index) =>
                (<li key={index}> {music.id} {music.name} {music.price} </li>)
            )  
          
    }
    
    findMusic = (music_id) => async () => {
        if(music_id){
            try {
                await store.dispatch(findMusic(music_id))
                if(this.props.musics.id !== undefined){
                    alert("หมีทีท่านต้องการคือ \nid : "+this.props.musics.id +"\nName : "+this.props.musics.name+"\nWeight : "+this.props.musics.price)
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
    addMusic= () => async () => {
        if(this.state.music_name&&this.state.music_price){
            try {
                //onsole.log("HERE")
                let music = {name: this.state.music_name , price:this.state.music_price}
                await store.dispatch(addMusic(music))
                alert('เพิ่มหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    updateMusic = () => async () => {
        
        if(this.state.music_id&&this.state.music_name&&this.state.music_price){

            try {
                //console.log("HERE")
                let music = {music_id: this.state.music_id , name: this.state.music_name , price:this.state.music_price}
                await store.dispatch(updateMusic(music))
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
    deleteMusic = (music_id) => async () => {
        if(this.state.music_id){
            try {
                //console.log("HERE")
                await store.dispatch(deleteMusic(music_id))
                alert('ลบหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }

    findMusic  = () => async () => {
        try {
            //console.log("HERE")
            await store.dispatch(getMusics())
            this.setState({findAllstatus : true})
        } catch (error) {
            console.error(error);
        }
        
    }
    render() {
        const  { addstatus, removestatus,findstatus,findAllstatus,changestatus } = this.state
        if(addstatus === false && removestatus === false && findstatus === false && findAllstatus === false && changestatus === false){
            return(
                <div align="center">
                <h1 className="App">Musics</h1>
                    <button className="button-color" onClick={()=> {this.setState({addstatus : true}) }}>ADD</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({changestatus : true}) }}>UPDATE MUSIC</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({removestatus : true}) }}>DELETE</button> {' '}
                    <button className="button-color" onClick={()=> {this.setState({findstatus : true}) }}>FIND MUSIC</button> {' '}
                    <button className="button-color" onClick={this.findMusic()}>SHOW ALL MUSICS</button> {' '}
                </div>

            )
        }
        else if(addstatus && !removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div align="center">
                    <h1 className="App">Music</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td><h3 className="leftText"> Music Name :</h3></td>
                                <td><input name="music_name" type="text" onChange={this.handleChagne}></input></td>
                            </tr>
                            <tr>
                                <td><h3 className="leftText">Pice :</h3></td>
                                <td><input name="music_weight" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button className="button-color" onClick={this.addMusic()}>ADD MUSIC</button><br/><br/><br/>
                    <button className="button-color" onClick={()=> {this.setState({addstatus : false}) }}>BACK</button>
                    
                    
                </div>
            );
        }
        else if(!addstatus && removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div align="center">
                    <h1 className="App">Musics</h1>
                    <table>
                        <tbody>
                            <tr >
                                <td ><h3 className="leftText">MusicID :</h3></td>
                                <td><input name="music_id" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                        
                    </table>
                    
                    <button className="button-color" onClick={this.deleteMusic(this.state.music_id)}>DELETE Music</button><br/><br/><br/>
                    <button className="button-color" onClick={()=> {this.setState({removestatus : false}) }}>BACK</button>
                </div>
            )
        }
        else if(!addstatus && !removestatus && findstatus&& !findAllstatus && !changestatus ){
            return (
                <div align="center">
                <h1 className="App">Music</h1>
                <table>
                    <thead>
                        <tr >
                            <td ><h3 className="leftText"> Music ID :</h3></td>
                            <td><input name="music_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </thead>
                </table>
                
                <button className="button-color" onClick={this.findMusic(this.state.music_id)}>FIND Music</button><br/><br/><br/>
                
                <button className="button-color" onClick={()=> {this.setState({findstatus : false,show : false}) }}>BACK</button>
            </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& findAllstatus && !changestatus ){
            
            return (
                <div align="center">
                    <h1 className="App">Musics</h1>
                    <hr/>
                        <ul>
                            <h1>{ this.renderMusic()}</h1>
                        </ul>
                    <hr/>
                    <button className="button-color" onClick={()=> { this.setState({findAllstatus : false}) }}>BACK</button>
                    
                </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& !findAllstatus && changestatus ){
            return (
                <div align="center">
                <h1 className="App">Musics</h1>
                <table>
                    <tbody>
                        <tr >
                            <td ><h3 className="leftText">Music ID :</h3></td>
                            <td><input name="music_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText"> Music Name :</h3></td>
                            <td><input name="music_name" type="text" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText">Muisc Price :</h3></td>
                            <td><input name="music_weight" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </tbody>
                </table>
                
                <button className="button-color" onClick={this.updateMusic()}>UPDATE Music</button><br/><br/><br/>
                <button className="button-color" onClick={()=> {this.setState({changestatus : false}) }}>BACK</button>
                
                
            </div>
            )
        }
       
    }
}


  
const mapStateToProps = (musics) => {
    return {
         musics:musics.musicsPass
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMusics:  () => store.dispatch(getMusics()),
        findMusic:  () => store.dispatch(findMusic()),
        addMusic:  () => store.dispatch(addMusic()),
        updateMusic:  () => store.dispatch(updateMusic()),
        deleteMusic :  () => store.dispatch(deleteMusic()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Music);