import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import ToDoListSaga from './pages/ToDoList/ToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DEmoHocModal from './pages/DemoHocModal/DEmoHocModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemmlate } from './templates/HomeTemplate/HomeTemmlate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import { useState, useEffect } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ADD_HISTORY } from './util/constants/settingSystem';
import { CyberBugsTemplate } from './templates/HomeTemplate/CyberBugsTemplate';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import ModalCyberBugs from './HOC/CyberBugsHOC/ModalCyberBugs'
import IndexCyberBugs from './redux/saga/Cyberbugs/indexCyberBugs';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history: history
    })
    return () => {

    }
  }, [])


  return (
    <>
      <Modal />
      <ModalCyberBugs/>
      <LoadingComponent />
      <Switch>
        <HomeTemmlate exact path='/home' Component={Home} />
        <HomeTemmlate exact path='/contact' Component={Contact} />
        <HomeTemmlate exact path='/about' Component={About} />
        <CyberBugsTemplate exact path='/' Component={ProjectManagement} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <HomeTemmlate exact path='/detail/:id' Component={Detail} />
        <HomeTemmlate exact path='/profile' Component={Profile} />
        <HomeTemmlate exact path='/todolistrfc' Component={ToDoListRFC} />
        <HomeTemmlate exact path='/todolistrcc' Component={ToDoList} />
        <HomeTemmlate exact path='/todolistrfcredux' Component={ToDoListRedux} />
        <HomeTemmlate exact path='/todolistrfcsaga' Component={ToDoListSaga} />
        <HomeTemmlate exact path='/demohocmodal' Component={DEmoHocModal} />
        <CyberBugsTemplate exact path='/cyberbugs' Component={IndexCyberBugs}/>
        <CyberBugsTemplate exact path='/createprojectsetting' Component={CreateProject}/>
        <CyberBugsTemplate exact path='/projectmanagement' Component={ProjectManagement}/>
        <CyberBugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBugs}/>
        <HomeTemmlate path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
