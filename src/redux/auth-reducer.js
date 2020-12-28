import {authAPI as AuthAPI} from "../api/api";

/*let initialState = {
    username: null,
    isLoggedIn: false,
    isError: false,
    errors: null,
    access_token: null
}*/


/*export default (state = initialState, action) => {
    return state;
}*/

export const login = (username, password) => (dispatch) => {
    debugger;
    AuthAPI.login(username, password)
        .then(response => {
            console.log(response.data);
            debugger;
            if(response.data.code !== 0){

                console.log(11145);
                alert(title);
            }
        });
}