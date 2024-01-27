import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    ToDoListReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;