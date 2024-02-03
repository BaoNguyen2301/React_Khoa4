import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import ModalReducer from "./reducers/ModalReducer";
import { thunk } from "redux-thunk";
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from "./saga/rootSaga";
import HistoryReducer from "./reducers/HistoryReducer";
import UserCyberbugsReducer from "./reducers/UserCyberbugsReducer"
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer'
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserCyberbugsReducer,
    ProjectCategoryReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk,middleWareSaga),
    
);

middleWareSaga.run(rootSaga);

export default store;