import { reduxLogin } from "../../redux/actions/index";

export const mapDispatchToProps = dispatch => {
  return {
      reduxLogin: dashboard => dispatch(reduxLogin(dashboard)),
  };
};
