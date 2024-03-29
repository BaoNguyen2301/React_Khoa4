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
import ProjectCyberBugsReducer from './reducers/ProjectCyberBugsReducer'
import DrawerReducer from "./reducers/DrawerReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import TaskTypeReducer from "./reducers/TaskTypeReducer";
import PriorityReducer from "./reducers/PriorityReducer";
import StatusReducer from "./reducers/StatusReducer";
import TaskReducer from "./reducers/TaskReducer";
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserCyberbugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk,middleWareSaga),
    
);

middleWareSaga.run(rootSaga);

export default store;