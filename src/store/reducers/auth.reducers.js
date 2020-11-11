import * as actions from '../actions/actionTypes';

const initialState = {
    username: '',
    token: '',
    logginIn: false,
    user: '',
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.authActionTypes.LOGIN_START:
            return {
                ...state,
                logginIn: true,
                error: ''
            }
        case actions.authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                logginIn: false,
                token: action.payload.token,
                user: action.payload.user
            }
        case actions.authActionTypes.LOGIN_INITIAL_CHECK:
            return {
                ...state,
                logginIn: true
            }
        case actions.authActionTypes.LOGOUT:
            return {
                ...state,
                username: '',
                token: '',
                user: '',
                logginIn: false
            }
        case actions.authActionTypes.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;