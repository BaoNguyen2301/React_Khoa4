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

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <LoadingComponent/>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/detail/:id' component={Detail}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/todolistrfc' component={ToDoListRFC}/>
        <Route exact path='/todolistrcc' component={ToDoList}/>
        <Route exact path='/todolistrfcredux' component={ToDoListRedux}/>
        <Route exact path='/todolistrfcsaga' component={ToDoListSaga}/>
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
