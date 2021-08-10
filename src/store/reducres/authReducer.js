import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START } from "../actions/actionTypes";
import { AUTH_SUCCESS, AUTH_REMOVE_ERROR } from './../actions/actionTypes';

const initialState = {
    token: false,
    error: '',
    loading: false
}

const authStart = (state) => {
    return {...state, loading: true, error: false}
}
const authSuccess = (state, action) => {
    return {...state, loading: false, token: action.token}
}
const authFail = (state, action) => {
    return {...state, loading: false, error: action.error}
}
const authRemoveError = (state) => {
    return {...state, error: false}
}
const authLogout = (state) => {
    return {...state, token: null}
}

function authReducer(state=initialState, action) {
    switch(action.type) {
        case AUTH_START: return authStart(state);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case AUTH_REMOVE_ERROR: return authRemoveError(state);
        case AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
}

export default authReducer;

