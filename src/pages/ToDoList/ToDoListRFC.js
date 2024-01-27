import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ToDoListRFC(props) {

  const [state, setState] = useState({
    taskList: [],
    values: {
      taskName: ''
    },
    errors: {
      taskName: ''
    }
  })

  const getTaskList = () => {
    let promise = axios({
      url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
      method: 'GET'
    });
    promise.then((Result) => {
      setState({
        ...state,
        taskList: Result.data
      })
    });
    promise.catch((err) => {
      console.log(err.response.data)
    })
  }

  useEffect(() => {
    getTaskList();
    return () => {
    }
  })

  const handleChange = (e) => {
    let { name, value } = e.target;

    let newValues = { ...state.values, [name]: value }
    let regexString = /^[a-z A-Z]+$/;
    let newErrors = { ...state.errors };
    if (!regexString.test(value) || value.trim() === '') {
      newErrors[name] = [name] + ' invalid!';
    } else {
      newErrors[name] = '';
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors
    })
  }

  const renderTaskTodo = () => {
    return state.taskList.filter(item => !item.status).map((item, index) => {
      return <li key={index}><span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" type='button' onClick={() => { delTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
          <button className="complete" type='button' onClick={() => { doneTask(item.taskName) }}><i className="far fa-check-circle" /></button>
        </div>
      </li>
    })
  }

  const renderTaksComplete = () => {
    return state.taskList.filter(item => item.status).map((item, index) => {
      return <li key={index}><span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" type='button' onClick={() => { delTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
          <button className="complete" type='button' onClick={() => { rejectTask(item.taskName) }}><i class="fa fa-undo"></i></button>
        </div>
      </li>
    })
  }

  const addTask = (e) => {
    e.preventDefault();
    axios({
      url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST',
      data: { taskName: state.values.taskName }
    }).then((result) => {
      getTaskList();
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  const delTask = (taskName) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE'
    }).then((result) => {
      getTaskList();
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  const doneTask = (taskName) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT'
    }).then((result) => {
      getTaskList();
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  const rejectTask = (taskName) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT'
    }).then((result) => {
      getTaskList();
    }).catch((err) => {
      alert(err.response.data)
    })
  }



  return (
    <form onSubmit={addTask}>
      {/* <button onClick={()=>{this.getTaskList()}}>Get task list</button> */}
      <div className="card">
        <div className="card__header">
          <img src={require('./bg.png')} alt='1' />
        </div>
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="card__add">
              <input name='taskName' id="newTask" type="text" placeholder="Enter an activity..." onChange={handleChange} />
              <button id="addItem" type='submit' onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p style={{ fontSize: '10px' }} className='text text-danger'>{state.errors.taskName}</p>
            <div className="card__todo">
              <ul className="todo" id="todo">
                {renderTaskTodo()}
              </ul>
              <ul className="todo" id="completed">
                {renderTaksComplete()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}


