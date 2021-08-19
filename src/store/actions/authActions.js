import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_REMOVE_ERROR, AUTH_LOGOUT } from "./actionTypes"
import iaxios from './../../iaxios';


export function login(username, password) {
    return dispatch => {
        dispatch({type: AUTH_START});
        iaxios.post('login/', {
            username: username,
            password: password
        })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            iaxios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
            dispatch({type: AUTH_SUCCESS, token: response.data.token});
        })
        .catch(error => {
            let errorMessage;
            switch(error.response.status) {
                case 400:
                    errorMessage = 'İstifadəçi adı və ya şifrə yanlışdır!';
                    break;
                case 429:
                    errorMessage = 'Daxil olma limitini keçmisiz. Yenidən sınamaq üçün 1 saat gözləyin!';
                    break;
                default:
                    errorMessage = `Bilinməyən bir xəta baş verdi! Xəta Kodu: ${error.response.status}`;
                    break;
            }
            dispatch({type: AUTH_FAIL, error: errorMessage});
        });
    }
};

export function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({type: AUTH_LOGOUT});
        iaxios.post('logout/');
        delete iaxios.defaults.headers.common['Authorization'];
    }
};

export function checkAuth() {
    return dispatch => {
        if (window.navigator.onLine) {
            dispatch({type: AUTH_START})
            const token = localStorage.getItem('token');
            if (token) {
                iaxios.defaults.headers.common['Authorization'] = `Token ${token}`
                dispatch({type: AUTH_SUCCESS, token: token});
            }
            else {
                // to stop loading and define token doesn't exist (ass null instead of false) to redirect login page
                dispatch({type: AUTH_SUCCESS, token: null}); 
            }
        }
    }
};

export function removeError() {
    return {
        type: AUTH_REMOVE_ERROR,
    }
};