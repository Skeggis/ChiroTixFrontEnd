import React from 'react';
import {Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './Pages/HomePage/HomePage'
import 'antd/dist/antd.css';
import Header from './Components/Header/Header'


function App() {
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact component={HomePage}/>
      </Switch>
    </Fragment>
  );
}

export default App;
