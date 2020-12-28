import {loadScreenAuthAPI, TokenConfig} from "../api/api";

const LOAD_SCREEN_AUTH = 'LOAD_SCREEN_AUTH';
const STATUS = 'STATUS';
const ACCESS_TOKEN = 'ACCESS_TOKEN';

//debugger;
let initialState = {
    grant_type: null,
    username: null,
    password: null,
    client_id: null,
    client_secret: null,
    status: null,
    access_token: null
}

debugger;
const setLoadScreenAuthReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case LOAD_SCREEN_AUTH: {
            return { ...state,  grant_type: action.grant_type, username: action.username, password: action.password, client_id: action.password, client_secret: action.client_secret }
        }
        case STATUS: {
            return { ...state, status: action.status }
        }
        case ACCESS_TOKEN: {
            return { ...state, statusText: action.access_token }
        }
        default:
            return state;
    }
}

debugger;
export const setLoadScreenAuth = (grant_type, username, password, client_id, client_secret) => ({type: LOAD_SCREEN_AUTH, grant_type, username, password, client_id, client_secret })
export const setStatus = (status) => ({type: STATUS, status})
export const setAccessToken = (access_token) => ({type: ACCESS_TOKEN, access_token})

export const getLoadScreenAuthThunkCreator = (grant_type, username, password, client_id, client_secret) => {
    return (dispatch) => {
        debugger;
            loadScreenAuthAPI.login(grant_type, username, password, client_id, client_secret).then(response => {
                console.log(response.data + "1");
                debugger;
                //dispatch(setLoadScreenAuth(response.data.categories));
                dispatch(setStatus(response.status));
                debugger;
                dispatch(setAccessToken(TokenConfig.Token(response.data.access_token)));
            });
    }
}

export default setLoadScreenAuthReducer;