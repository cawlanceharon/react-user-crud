import React from 'react';
import {Form, Button} from 'react-bootstrap';
import Axios from "axios/index";
import { useState } from 'react';

const LoginView = ({login, handleLoginAuth}) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;

        if (form.checkValidity() !== false) {
            handleLoginAuth(form);
        }

        setValidated(true);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group md="6" controlId="email">
                <Form.Label column={"required"}>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="password">
                <Form.Label column={"required"}>Email</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">Save</Button>
        </Form>
    )
};

export default LoginView