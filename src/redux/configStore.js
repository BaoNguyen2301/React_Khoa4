import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { thunk } from "redux-thunk";
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from "./saga/rootSaga";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk,middleWareSaga)
    
);

middleWareSaga.run(rootSaga);

export default store;