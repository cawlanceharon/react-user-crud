import { reduxUsers } from "../../redux/actions/index";

export const mapDispatchToProps = dispatch => {
  return {
    reduxUsers: users => dispatch(reduxUsers(users)),
  };
};
