import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="/home">Navbar</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/demohocmodal">Demo HOC</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bai Tap</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/todolistrfc">TODOLIST RFC</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrcc">TODOLIST RCC</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrfcredux">TODOLIST RFC REDUX</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrfcsaga">TODOLIST RFC SAGA</NavLink>
                            <NavLink className="dropdown-item" to="/cyberbugs">CyberBugs</NavLink>
                            <NavLink className="dropdown-item" to="/dragdrop">Demo Drag Drop</NavLink>
                            <NavLink className="dropdown-item" to="/dragdropdnd">Demo Drag Drop</NavLink>
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
