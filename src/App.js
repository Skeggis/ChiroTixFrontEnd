import React from 'react';
import {Fragment} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EventPage from './Pages/EventPage/EventPage'
import 'antd/dist/antd.css';


function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/event' component={EventPage}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
