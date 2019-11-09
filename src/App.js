import React, { Component } from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import AssociateLeave from './AssociateLeave';
import  ManagerLeave from './ManagerLeave';
class App extends Component {
  componentWillMount(){
    let username = sessionStorage.getItem('username');
    if(username === '' || username === null){
      window.location = '#/LoginForm'
    }   
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/LoginForm' component={LoginForm} />
          <Route exact path='/AssociateLeave' render={(props) => (<AssociateLeave {...props} />)} />
          <Route exact path='/ManagerLeave' render={(props) => (<ManagerLeave {...props} />)} />
        </div>

      </Router>
    );
  }
}

export default App;
