import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

class Logout extends React.Component {

    constructor(props) {
        super(props);
        localStorage.removeItem("user");
    }

    componentDidMount() {
        localStorage.removeItem("user");
    }

    render() {
        return <Redirect to="/"/>;
    }
}

export default connect(null)(Logout);
