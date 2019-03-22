// import React, { Component } from "react";
// import "./App.css";
// import Count from "./Count";
// // import Bear from "./Bear"
// import { Provider } from "react-redux";
// // import logger from 'redux-logger'
// import { createStore, combineReducers } from "redux";
// // import axios from "axios";
// // import thunk from 'redux-thunk'

// export const add = () => {
//   return { type: "ADD" };
// };

// export const add2 = num => {
//   return { type: "ADD2", num: num };
// };

// export const minus = () => {
//   return { type: "MINUS" };
// };

// export const addlist = (task,id) => {
//   return { type: "ADDLIST", task:task, id:id };
// };

// const numberReducer = (state = 0, action) => {
//   switch (action.type) {
//     case "ADD":
//       return state + 1;
//     case "ADD2":
//       return state + action.num;
//     case "MINUS":
//       return state - 1;
//     default:
//       return state;
//   }
// };

// const jook = {
//   tasks: [{ id: 1, task: "Do homework"}, {id: 2, task: 'Read book' }],
//   id:3
// };

// const jookReducer = (state = jook, action) => {
//   switch (action.type) {
//     case "ADDLIST":
//       return {
//         tasks: [...state.tasks, { id: action.id ,task: action.task }]
//       };
//     default:
//       return state;
//   }
// };

// // ==========  END Number reducer

// // export const getBearsSuccess = bears => ({
// //     type: 'GET_BEARS_SUCCESS',
// //     bears
// // });
// // export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED'});

// // export const getBears = () => async (dispatch) => {
// //     try {
// //         console.log('get bear new')
// //         const response = await axios.get(`http://localhost/api/bears`)
// //         const responseBody = await response.data;
// //         console.log('response: ', responseBody)
// //         dispatch(getBearsSuccess(responseBody));
// //     } catch (error) {
// //         console.error(error);
// //         dispatch(getBearsFailed());
// //     }
// // }

// // export const bearReducer = (state = 0, action) => {
// //     switch (action.type) {
// //         case 'GET_BEARS_SUCCESS':
// //             console.log('action: ' , action.bears)
// //             return action.bears
// //         case 'GET_BEARS_FAILED':
// //             console.log('action: Failed')
// //             return action.bears
// //         default:
// //             return state
// //     }
// // }

// const rootReducer = combineReducers({
//   x: numberReducer,
//   a: jookReducer
//   // bears: bearReducer
// });

// export const store = createStore(rootReducer);
// store.dispatch(add());
// store.dispatch(minus());

// store.subscribe(() => {
//   console.log("getStatesub: ", store.getState());
// });
// class App extends Component {
//   render() {
//     return (
//       <Provider store={store} >
//         {/* <Bear /> */}
//         <Count />
//       </Provider>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import Bear from "./Bear";
import axios from "axios";
import thunk from "redux-thunk";

export const getBearsSuccess = bears => ({
  type: "GET_BEARS_SUCCESS",
  bears
});
export const getBearsFailed = () => ({ type: "GET_BEARS_FAILED" });

export const getBears = (USER) => async dispatch => {
  try {
    console.log("get bear new");
    const response = await axios.get(`https://api.github.com/users/${USER}`);
    const responseBody = await response.data;
    console.log("response: ", responseBody);
    dispatch(getBearsSuccess(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(getBearsFailed());
  }
};

export const bearReducer = (state = 0, action) => {
  switch (action.type) {
    case "GET_BEARS_SUCCESS":
      console.log("action: ", action.bears);
      return action.bears;
    case "GET_BEARS_FAILED":
      console.log("action: Failed");
      return action.bears;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  bears: bearReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));

// ======== wrap root element by Provider with Store ========
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Bear />
      </Provider>
    );
  }
}

export default App;
