import React, { Component } from 'react'
import './ToDoListCss.css'
export default class ToDoList extends Component {
    render() {
        return (
            <div>
                <button>Get task list</button>
                <div className="card">
                    <div className="card__header">
                        <img src={require('./bg.png')}/>
                    </div>
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input id="newTask" type="text" placeholder="Enter an activity..." />
                                <button id="addItem">
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <div className="card__todo">
                                <ul className="todo" id="todo" />
                                <ul className="todo" id="completed">
                                    <li><span>Ăn sáng</span>
                                        <div className="buttons">
                                            <button className="remove"><i className="fa fa-trash-alt" /></button>
                                            <button className="complete"><i className="far fa-check-circle" /><i className="fas fa-check-circle" /></button>
                                        </div>
                                    </li>
                                    <li><span>Ăn sáng</span>
                                        <div className="buttons">
                                            <button className="remove"><i className="fa fa-trash-alt" /></button>
                                            <button className="complete"><i className="far fa-check-circle" /><i className="fas fa-check-circle" /></button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
