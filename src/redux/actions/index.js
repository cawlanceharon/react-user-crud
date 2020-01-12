import {
  REDUX_USERS,
  REDUX_LOGIN
} from "../constants/action-types";

export function reduxUsers(payload) {
  return { type: REDUX_USERS, payload };
}

export function reduxLogin(payload) {
    return { type: REDUX_LOGIN, payload };
}
