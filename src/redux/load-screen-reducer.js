import {loadScreenAuthAPI, TokenConfig, logoutScreenAuthAPI} from "../api/api";

const LOAD_SCREEN_AUTH = 'LOAD_SCREEN_AUTH';
const STATUS = 'STATUS';
const ACCESS_TOKEN = 'ACCESS_TOKEN';
const EXIT = 'SET_EXIT'

let initialState = {
    grant_type: null,
    username: null,
    password: null,
    client_id: null,
    client_secret: null,
    status: null,
    access_token: null,
    exit: false
}

debugger;
const setLoadScreenAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCREEN_AUTH: {
            debugger;
            return { ...state,  grant_type: action.grant_type, username: action.username, password: action.password, client_id: action.password, client_secret: action.client_secret }
        }
        case STATUS: {
            return { ...state, status: action.status }
        }
        case ACCESS_TOKEN: {
            return { ...state, statusText: action.access_token }
        }
        case EXIT: {
            return { ...state, exit: action.exit }
        }
        default:
            return state;
    }
}

debugger;
export const setLoadScreenAuth = (grant_type, username, password, client_id, client_secret) => ({type: LOAD_SCREEN_AUTH, grant_type, username, password, client_id, client_secret })
export const setStatus = (status) => ({type: STATUS, status})
export const setAccessToken = (access_token) => ({type: ACCESS_TOKEN, access_token})
export const setExit = (exit) => ({type: EXIT, exit})

debugger;
export const getLoadScreenAuthThunkCreator = (grant_type, username, password, client_id, client_secret) => {
    return (dispatch) => {
        debugger;
        loadScreenAuthAPI.login(grant_type, username, password, client_id, client_secret).then(response => {
            dispatch(setStatus(response.status));
            dispatch(setAccessToken(TokenConfig.Token(response.data.access_token)));
            dispatch(setExit(false));
        });
    }
}

export const getLogoutScreenAuth = () => {
    return (dispatch) => {
        debugger;
        logoutScreenAuthAPI.logout().then(response => {
            console.log('++')
            console.log(response);
            debugger;
            if(response.data.result === "success"){
                console.log("+***************+" + response.data.result);
                dispatch(setExit(true));
            }
            //dispatch(setStatus(response));
            //dispatch(Redirect.MaimPage);
        });
    }
}

export default setLoadScreenAuthReducer;