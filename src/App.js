import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
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

function App() {
  return (
    <BrowserRouter>
      <Modal/>
      <LoadingComponent/>
      <Switch>
        <HomeTemmlate exact path='/home' Component={Home} />
        <HomeTemmlate exact path='/contact' Component={Contact} />
        <HomeTemmlate exact path='/about' Component={About} />
        <HomeTemmlate exact path='/' Component={Home} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs}/>
        <HomeTemmlate exact path='/detail/:id' Component={Detail}/>
        <HomeTemmlate exact path='/profile' Component={Profile}/>
        <HomeTemmlate exact path='/todolistrfc' Component={ToDoListRFC}/>
        <HomeTemmlate exact path='/todolistrcc' Component={ToDoList}/>
        <HomeTemmlate exact path='/todolistrfcredux' Component={ToDoListRedux}/>
        <HomeTemmlate exact path='/todolistrfcsaga' Component={ToDoListSaga}/>
        <HomeTemmlate exact path='/demohocmodal' Component={DEmoHocModal}/>
        <HomeTemmlate path="*" Component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
