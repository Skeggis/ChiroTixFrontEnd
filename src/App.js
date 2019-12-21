import React from 'react';
import {Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './Pages/HomePage/HomePage'
import 'antd/dist/antd.css';
import Header from './Components/Header/Header'
import EventPage from './Pages/EventPage/EventPage'
import TicketsPage from './Pages/TicketsPage/TicketsPage'


function App() {
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/event' exact component={EventPage}/>
        <Route path='/tickets' exact component={TicketsPage}/>
      </Switch>
    </Fragment>
  );
}

export default App;
