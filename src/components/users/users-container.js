import React from 'react';
import Axios from "axios";
import {UsersView} from "./users-view";
import {mapDispatchToProps} from './users-redux';
import {connect} from "react-redux";
import './users.scss';
import store from "../../redux/store";
import {Redirect} from 'react-router-dom';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0,
      data: null,
      selectedFile: null,
      imagePreviewUrl: "assets/images/icon.png",
      form: {
        id: '',
        avatar: '',
        email: '',
        first_name: '',
        last_name: '',
      },
      modal: {
        update: false,
        delete: false,
        insert: false,
      },
      alert: {
        update: false,
        delete: false,
        insert: false,
      },
    };

    this.handlePageView = this.handlePageView.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModalView = this.handleModalView.bind(this);
    this.handleResetUsers = this.handleResetUsers.bind(this);
    this.handleModalAlertView = this.handleModalAlertView.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount() {
      this.handleResetUsers();

      store.subscribe(() => {
          if (!store.getState().login) {

          }
      });
  }

  handleModalAlertView(action, alert) {
    let modalAlert = this.state.alert;
    modalAlert[action] = alert;
    this.setState({alert: modalAlert});
  }

  handleModalView(action, modal, users) {
    let dataModal = this.state.modal;
    dataModal[action] = modal;
    this.setState({modal: dataModal});

    if (users) {
      this.setState({form: users});
      this.setState({imagePreviewUrl: "assets/images/icon.png"});
    }
  }

  handleResetUsers() {
    return Axios.get('https://reqres.in/api/users?page=' + this.state.currentPage).then(response => {
        this.setState({data: response.data});
        this.setState({currentPage: response.data.page});
        this.setState({totalPages: response.data.total_pages});
        store.dispatch(this.props.reduxUsers(response.data));
    });
  }

  handleInputChange(e) {
    let stateForm = this.state.form;
    stateForm[e.target.name] = e.target.value;
    this.setState({form: stateForm});
  }

  handleImage(selectedFile, imagePreviewUrl) {
      if (selectedFile) {
          this.setState({selectedFile: selectedFile});
      }

      if (imagePreviewUrl) {
          let stateForm = this.state.form;
          stateForm['avatar'] = imagePreviewUrl;
          this.setState({form: stateForm});
          this.setState({imagePreviewUrl: imagePreviewUrl});
      }
  }

  handlePageView(pageNumber) {
      return Axios.get('https://reqres.in/api/users?page=' + pageNumber).then(response => {
          this.setState({data: response.data});
          this.setState({currentPage: pageNumber});
          this.setState({totalPages: response.data.total_pages});
          store.dispatch(this.props.reduxUsers(response.data));
      });
  }

  render() {
    return (this.state.data) ? (
      <>
        <UsersView users={this.state.data}
                   state={this.state}
                   handlePageView={this.handlePageView}
                   handleImage={this.handleImage}
                   handleModalAlertView={this.handleModalAlertView}
                   handleResetUsers={this.handleResetUsers}
                   handleInputChange={this.handleInputChange}
                   handleModalView={this.handleModalView} />
      </>
    ) : null;
  }
}

export default connect(null, mapDispatchToProps)(Users);
