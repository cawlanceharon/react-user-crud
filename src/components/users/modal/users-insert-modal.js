import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import Axios from "axios";
import { Formik } from "formik";
import * as yup from 'yup';

export const UsersInsertModal = ({ state, handleImage, handleResetUsers, handleModalView }) => {

    const formFields = {
        email: '',
        avatar: '',
        firstname: '',
        lastname: ''
    };

    const validationSchema = yup.object().shape({
        avatar: yup
            .string()
            .required()
            .label('Avatar'),
        email: yup
            .string()
            .email("Email Is Not Valid")
            .required()
            .label('Email'),
        firstname: yup
            .string()
            .required()
            .label('First Name')
            .max(50, 'Maximum Length Is 50 Characters'),
        lastname: yup
            .string()
            .required()
            .label('Last Name')
            .max(50, 'Maximum Length Is 50 Characters'),
    });

    const handleSubmit = (values, actions) => {
        Axios.post('https://reqres.in/api/users', values).then(response => {
            handleModalView('insert', false, response.data);
            handleResetUsers();
            actions.setSubmitting(false);
        });
    };

    const fileChangedHandler = (event) => {
        handleImage(event.target.files[0], null);

        let reader = new FileReader();

        reader.onloadend = () => {
            handleImage(null, reader.result);
        };

        reader.readAsDataURL(event.target.files[0])
    };

    return (
        <>
            <Modal show={state.modal.insert} onHide={() => handleModalView('insert', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={formFields} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {formikProps => (
                            <React.Fragment>

                                <Form.Group md="6" controlId="avatar">
                                    <Form.Label column={"required"}>Avatar</Form.Label>
                                    <Form.Control type="file" alt="image" name="avatar" onChange={e => {formikProps.handleChange(e); fileChangedHandler(e)}} />
                                    <img src={state.imagePreviewUrl}  alt="image" width="200" />
                                    <div className={"invalid"}>{formikProps.errors.avatar}</div>
                                </Form.Group>

                                <Form.Group md="6" controlId="email">
                                    <Form.Label column={"required"}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={formikProps.handleChange('email')} />
                                    <div className={"invalid"}>{formikProps.errors.email}</div>
                                </Form.Group>

                                <Form.Group md="6" controlId="firstname">
                                    <Form.Label column={"required"}>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" onChange={formikProps.handleChange('firstname')} />
                                    <div className={"invalid"}>{formikProps.errors.firstname}</div>
                                </Form.Group>

                                <Form.Group md="6" controlId="lastname">
                                    <Form.Label column={"required"}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" onChange={formikProps.handleChange('lastname')} />
                                    <div className={"invalid"}>{formikProps.errors.lastname}</div>
                                </Form.Group>

                                {formikProps.isSubmitting ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <Button variant="primary" type="submit" onClick={formikProps.handleSubmit}>Save</Button>
                                )}
                            </React.Fragment>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
};
