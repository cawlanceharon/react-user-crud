import React from 'react';
import { mapDispatchToProps } from './login-redux';
import LoginView from './login-view';
import './login.scss';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = null;
        this.handleLoginAuth = this.handleLoginAuth.bind(this);
    }

    componentDidMount() {}

    handleLoginAuth(form) {
        let expirationDate = new Date(new Date().getTime() + (60000 * 10));
        let sessionObject = {
            expiresAt: expirationDate,
            email: form.elements.email.value,
            password: form.elements.password.value,
        };

        localStorage.setItem('user', JSON.stringify(sessionObject));

        return <Redirect to='/users' />;
    }

    render() {
        return <LoginView
            handleLoginAuth={this.handleLoginAuth} />
    }
}

export default connect(null, mapDispatchToProps)(Login);
