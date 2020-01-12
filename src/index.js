import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store/index";
import {Provider} from "react-redux";
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import Users from './components/users/index';
import Login from './components/login/index';
import NotFound from './components/not-found/index';
import Logout from './components/logout/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { isLoggedIn } from './authentication';

const routing = (
  <Provider store={store}>
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">React User CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Users</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={"container"}>
        <Switch>
            <Route exact path="/" render={() => (isLoggedIn() ? (<Redirect to="/users"/>) : (<Login />))}/>
            <Route exact path="/users" render={() => (isLoggedIn() ? (<Users />) : (<Redirect to="/login"/>))}/>
            <Route exact path="/login" render={() => (isLoggedIn() ? (<Users />) : (<Login />))}/>
            <Route exact path="/logout" render={() => (isLoggedIn() ? (<Logout />) : (<Redirect to="/login"/>))}/>
            <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("layout"));
