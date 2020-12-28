import {CreateCheckAPI} from "../api/api";

const CHECK_ID = 'PARENT_ID';

debugger;
let initialState = {
    result: [],
    check: []
}

const menuCreatorReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHECK_ID: {
            return { ...state, result: action.result, check: action.check }
        }
        default:
            return state;
    }
}


export const setCheckId = (result, check) => ({type: CHECK_ID, result, check})

debugger;
export const getCheckThunkCreator = (setCheckId) => {
    return (dispatch) => {
        debugger;
        CreateCheckAPI.CreateCheck(setCheckId).then(response => {
            console.log(response.data + "1");
            debugger;
            dispatch(setCheckId(response.data.result, response.data.check));
        });
    }
}

export default menuCreatorReducer;