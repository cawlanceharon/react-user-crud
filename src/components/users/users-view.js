import React from 'react';
import {Table, Button, Pagination} from 'react-bootstrap';
import {UsersInsertModal} from "./modal/users-insert-modal";
import {UsersUpdateModal} from "./modal/users-update-modal";
import store from "../../redux/store";
import {UsersDeleteModal} from "./modal/users-delete-modal";

export const UsersView = ({
                            users,
                            state,
                            handlePageView,
                            handleModalAlertView,
                            handleResetUsers,
                            handleInputChange,
                            handleImage,
                            handleModalView}) => {

    store.subscribe(() => {
        if (store.getState().users) {
          users = store.getState().users;
        }
    });

    const UsersList = ({users}) => {
        return (users.map((data, i) =>
            <tr key={i}>
                <td><img src={data.avatar} /></td>
                <td>{data.email}</td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>
                    <Button variant="outline-primary" onClick={() => handleModalView('update', true, data)}>Edit</Button> &nbsp;
                    <Button variant="outline-danger" onClick={() => handleModalView('delete', true, data)}>Delete</Button>
                </td>
            </tr>
        ));
    };

    const TablePages = ({totalPages, currentPage}) => {
        let active = currentPage;
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => handlePageView(number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        return <Pagination>{items}</Pagination>;
    };

    return (
    <>
        <UsersDeleteModal state={state}
                        handleModalAlertView={handleModalAlertView}
                        handleResetUsers={handleResetUsers}
                        handleModalView={handleModalView}/>
        <UsersUpdateModal state={state}
                        handleImage={handleImage}
                        handleResetUsers={handleResetUsers}
                        handleModalView={handleModalView}
                        handleInputChange={handleInputChange}/>
        <UsersInsertModal state={state}
                        handleImage={handleImage}
                        handleResetUsers={handleResetUsers}
                        handleModalView={handleModalView}/>
        <h1>User <Button variant="outline-primary" onClick={() => handleModalView('insert', true)}>Add New</Button></h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <UsersList users={users.data}/>
            </tbody>
        </Table>
        <TablePages totalPages={state.totalPages} currentPage={state.currentPage} />
    </>
    )
};
