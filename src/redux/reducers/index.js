import {
  REDUX_USERS,
  REDUX_LOGIN
} from "../constants/action-types";

const initialState = {
  users: {},
  login: null,
};

function rootReducer(state = initialState, action) {
    // if (action.type === ADD_ARTICLE) {
    //   return Object.assign({}, state, {
    //     articles: state.articles.concat(action.payload)
    //   });
    // }

    if (action.type === REDUX_USERS) {
        return Object.assign({}, state, {
            users: action.payload,
        });
    }

    if (action.type === REDUX_LOGIN) {
        return Object.assign({}, state, {
            login: action.payload,
        });
    }

    return state;
}

export default rootReducer;
