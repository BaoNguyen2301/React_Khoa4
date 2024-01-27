import React, { Component } from 'react'
import axios from 'axios'
import './ToDoListCss.css'
export default class ToDoList extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }

    }

    getTaskList = () => {
        let promise = axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((Result) => {
            this.setState({
                taskList: Result.data
            })
        });
        promise.catch((err) => {
            console.log(err.response.data)
        })
    }

    renderTaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}><span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => { this.delTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
                    <button className="complete" type='button' onClick={() => { this.doneTask(item.taskName) }}><i className="far fa-check-circle" /></button>
                </div>
            </li>
        })
    }

    renderTaksComplete = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}><span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => { this.delTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
                    <button className="complete" type='button' onClick={() => { this.rejectTask(item.taskName) }}><i class="fa fa-undo"></i></button>
                </div>
            </li>
        })
    }
    //ham se tu dong thuc thi sau khi component dc render
    componentDidMount() {
        this.getTaskList();
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        let newValues = { ...this.state.values, [name]: value };

        let regexString = /^[a-z A-Z]+$/;

        let newErrors = { ...this.state.errors };
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = [name] + ' invalid!';
        } else {
            newErrors[name] = ''
        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    addTask = (e) => {
        e.preventDefault();
        console.log(this.state.values.taskName)
        axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        }).then((result) => {
            this.getTaskList();
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    delTask = (taskName) => {
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        }).then((result) => {
            this.getTaskList();
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    doneTask = (taskName) => {
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        }).then((result) => {
            this.getTaskList();
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    rejectTask = (taskName) => {
        axios({
            url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        }).then((result) => {
            this.getTaskList();
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    render() {
        return (
            <form onSubmit={() => { }}>
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
                                <input name='taskName' onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                <button id="addItem" onClick={this.addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p style={{ fontSize: '10px' }} className='text text-danger'>{this.state.errors.taskName}</p>
                            <div className="card__todo">
                                <ul className="todo" id="todo">
                                    {this.renderTaskTodo()}
                                </ul>
                                <ul className="todo" id="completed">
                                    {this.renderTaksComplete()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
