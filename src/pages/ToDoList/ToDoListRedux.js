import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addTaskAPI, delTaskAPI, doneTaskAPI, getTaskListAPI, rejectTaskAPI } from '../../redux/actions/ToDoListAction';

export default function ToDoListRedux(props) {

    const {taskList} = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();

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
        dispatch(getTaskListAPI())
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
        return taskList.filter(item => !item.status).map((item, index) => {
          return <li key={index}><span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" type='button' onClick={() => { delTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
              <button className="complete" type='button' onClick={() => { doneTask(item.taskName) }}><i className="far fa-check-circle" /></button>
            </div>
          </li>
        })
      }
    
      const renderTaksComplete = () => {
        return taskList.filter(item => item.status).map((item, index) => {
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
        dispatch(addTaskAPI(state.values.taskName))
      }
    
      const delTask = (taskName) => {
        dispatch(delTaskAPI(taskName))
      }
    
      const doneTask = (taskName) => {
        dispatch(doneTaskAPI(taskName))
      }
    
      const rejectTask = (taskName) => {
        dispatch(rejectTaskAPI(taskName))
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
