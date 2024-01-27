import { GET_TASK_API } from "../constants/ToDoListConstant"
import axios from "axios";


export const getTaskListAPI = () => {
    return dispatch =>{
        let promise = axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
          });
          promise.then((Result) => {
            dispatch({
              type: GET_TASK_API,
              taskList: Result.data
            })
          });
          promise.catch((err) => {
            console.log(err.response.data)
          })
    }
}

export const addTaskAPI = (taskName) => {
    return dispatch => {
        axios({
          url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
          method: 'POST',
          data: { taskName: taskName }
        }).then((result) => {
          dispatch(getTaskListAPI())
        }).catch((err) => {
          alert(err.response.data)
        })
    }
}

export const delTaskAPI = (taskName) => {
    return dispatch =>{
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
          }).then((result) => {
            dispatch(getTaskListAPI())
          }).catch((err) => {
            alert(err.response.data)
          })
    }
}

export const doneTaskAPI = (taskName) => {
    return dispatch => {
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
          }).then((result) => {
            dispatch(getTaskListAPI())
          }).catch((err) => {
            alert(err.response.data)
          })
    }
} 

export const rejectTaskAPI = (taskName) =>{
    return dispatch => {
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
          }).then((result) => {
            dispatch(getTaskListAPI())
          }).catch((err) => {
            alert(err.response.data)
          })
    }
}
