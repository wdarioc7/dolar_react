import { authActionTypes } from "../actions/actionTypes";
import {HttpNode } from "../../axiosInstances";
import md5 from 'md5';

export const login = (user, password, history) => {
    var sesion = 0;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    const usu = localStorage.getItem("username");
    const ses = localStorage.getItem("sesiones");
    return dispatch => {
        dispatch(authStart());
        HttpNode.get(`/seticap/api/users/${user}/${md5(password)}/`)
            .then(response => {
                if(response.data.status === 'success'){

                if (user != usu && ses != 1){
                    localStorage.setItem("token", md5(password));
                    localStorage.setItem("user", response.data.user.name);
                    localStorage.setItem("username", user);
                    sesion = 1;
                    localStorage.setItem("sesiones", sesion);
                    response.data.token = md5(password);
                    dispatch(authFinished({token: md5(password), user: response.data.user.name}));
                    history.push("/dashboard/");
                }
                else{
                    dispatch(authError("Usuario ya ingreso" + "USUARIO:" + response.data.user.name + "SESION" + ses));
                    localStorage.removeItem('sesiones');
                    dispatch(logout());
                }
                }else{
                    dispatch(authError("Usuario/Contraseña incorrectos"));
                }
            });
    };
};

const authStart = () => {
    return {
        type: authActionTypes.LOGIN_START
    };
};

const authFinished = auth => {
    return {
        type: authActionTypes.LOGIN_SUCCESS,
        payload: auth
    };
};

const autoLogin = () => {
    return {
        type: authActionTypes.LOGIN_INITIAL_CHECK
    };
};

const authError = error => {
    return {
        type: authActionTypes.LOGIN_ERROR,
        payload: error
    };
};

const authCheckLogin = () => {
    return dispatch => {
        dispatch(autoLogin());
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("username");
        const sesion = localStorage.getItem("sesiones");
        if (token) {
            HttpNode.get(`/seticap/api/users/${user}/${token}/`).then(({ data }) => {
                if (data.status === 'success') {
                    const user = localStorage.getItem("user");
                    dispatch(authFinished({ token, user }));
                } else {
                    dispatch(logout());
                }
            });
        }else{
            dispatch(logout());
        }
    };
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return {
        type: authActionTypes.LOGOUT
    };
};

export default {
    login: login,
    checkLogin: authCheckLogin,
    logout: logout
};
