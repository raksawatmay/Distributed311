import React, {Component} from 'react';
import './App.css';
import Music from "./Music"
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import axios from "axios";
import thunk from 'redux-thunk'



export const getMusicsSuccess = musics => ({
    type: 'GET_MUSICS_SUCCESS',
    musics
});
export const getMusicsFailed = () => ({ type: 'GET_MUSICS_FAILED'});

export const getMusics = () => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/musics`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getMusicsSuccess(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(getMusicsFailed());
    }
}

//----------------------------------------------

export const findMusic = (music_id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/musics/${music_id}`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getMusicsSuccess(responseBody));
    }catch (err){
        console.error(err);
        dispatch(getMusicsFailed());
    }
}

export const addMusic = (music) => async (dispatch) => {
    try{

        const response = await axios.post(`http://localhost:8000/api/musics`,music )
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getMusicsSuccess(responseBody));
    }catch(err){
        console.error(err);
        dispatch(getMusicsFailed());
    }

}
export const updateMusic = (music) => async (dispatch) => {
    try{

        const response = await axios.put(`http://localhost:8000/api/musics/${music.music_id}`,  music )
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getMusicsSuccess(responseBody));
    }catch(err){
        console.error(err);
        dispatch(getMusicsFailed());
    }

}
export const deleteMusic = (music_id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/musics/${music_id}`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getMusicsSuccess(responseBody));
    }catch (err){
        console.error(err);
        dispatch(getMusicsFailed());
    }
}


export const musicReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_MUSICS_SUCCESS':
            console.log('action: ' , action.musics)
            return action.MUSICS
        case 'GET_MUSICS_FAILED':
            console.log('action: Failed')
            return action.music
        default:
            return state
    }
}


const rootReducer = combineReducers( {
    musicsPass: musicReducer
})
export const store = createStore(rootReducer, applyMiddleware(logger, thunk))

class App extends Component {

    render() {
        return (
            <Provider store={store}>
            <div>
                <Music />
            </div>
            </Provider>
        );
    }
}

export default App;
