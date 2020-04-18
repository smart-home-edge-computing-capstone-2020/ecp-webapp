import React from 'react';
import './style/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import About from "./components/About";
import Home from "./components/Home";
import Interaction from "./components/Interaction";
import Interactions from "./components/Interactions";
import Devices from "./components/Devices";
import Device from "./components/Device";


function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <Router>
        <Switch>
          <Route path="/devices">
            <Devices />
          </Route>
          {/* <Route path="/device/:id" component={Device}/> */}
          <Route path='/device/:serial' component={Device} />
          <Route path="/interaction/:id" component={Interaction}/>
          <Route path="/interactions">
            <Interactions />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
