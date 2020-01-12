import store from "./store";
import {
  reduxUsers,
  reduxLogin
} from "./actions";

window.store = store;
window.users = reduxUsers;
window.login = reduxLogin;
