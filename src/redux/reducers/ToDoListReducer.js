/* eslint-disable import/no-anonymous-default-export */
import { GET_TASK_API } from "../constants/ToDoListConstant"

const initialState = {
    taskList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_TASK_API:{
    state.taskList = action.taskList;
    return { ...state}
  }
  default: return {...state}
}}
