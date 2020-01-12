import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import Axios from "axios";
import { Formik } from "formik";
import * as yup from 'yup';

export const UsersUpdateModal = ({state, handleImage, handleResetUsers, handleModalView, handleInputChange}) => {

    const formFields = {
        id: state.form.id,
        email: state.form.email,
        avatar: state.form.avatar,
        first_name: state.form.first_name,
        last_name: state.form.last_name,
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
        first_name: yup
            .string()
            .required()
            .label('First Name')
            .max(50, 'Maximum Length Is 50 Characters'),
        last_name: yup
            .string()
            .required()
            .label('Last Name')
            .max(50, 'Maximum Length Is 50 Characters'),
    });

    const handleSubmit = (values, actions) => {
        Axios.patch('https://reqres.in/api/users/'+values.id, values).then(response => {
            handleModalView('update', false, response.data);
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
            <Modal show={state.modal.update} onHide={() => handleModalView('update', false, false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
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
                                    <Form.Control type="email" placeholder="Email" name={"email"} value={formikProps.values.email} onChange={e => {formikProps.handleChange(e); handleInputChange(e)}} />
                                    <div className={"invalid"}>{formikProps.errors.email}</div>
                                </Form.Group>

                                <Form.Group md="6" controlId="first_name">
                                    <Form.Label column={"required"}>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" name={"first_name"} value={formikProps.values.first_name} onChange={e => {formikProps.handleChange(e); handleInputChange(e)}} />
                                    <div className={"invalid"}>{formikProps.errors.first_name}</div>
                                </Form.Group>

                                <Form.Group md="6" controlId="last_name">
                                    <Form.Label column={"required"}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" name={"last_name"} value={formikProps.values.last_name} onChange={e => {formikProps.handleChange(e); handleInputChange(e)}} />
                                    <div className={"invalid"}>{formikProps.errors.last_name}</div>
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
