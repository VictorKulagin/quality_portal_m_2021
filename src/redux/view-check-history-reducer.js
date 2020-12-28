import {ViewCheckHistoryAPI, CreateCheckCategoriesAPI} from "../api/api";

const VIEW_CHECK_HISTORY = 'VIEW_CHECK_HISTORY';
const DELETE_CHECK_HISTORY = 'DELETE_CHECK_HISTORY';

debugger;
let initialState = {
    result: null,
    model: null,
    id: null
}

const viewCheckHistoryReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case VIEW_CHECK_HISTORY: {
            return { ...state, ...action.result, ...action.model }
        }
        case DELETE_CHECK_HISTORY: {
            return { ...state, ...action.id }
        }
        default:
            return state;
    }
}

export const setViewCheckHistory = (result, model) => ({type: VIEW_CHECK_HISTORY, result, model})
export const setDeleteViewCheckHistory = (id) => ({type: VIEW_CHECK_HISTORY, id})

export const getViewCheckThunkHistory = (parentIdView, checkIdView) => {
    return (dispatch) => {
        debugger;
        ViewCheckHistoryAPI.ViewCheckHistory(parentIdView).then(response => {
            debugger;
           dispatch(setViewCheckHistory(response.data.result, response.data));
        });
        if(checkIdView !== undefined){
            ViewCheckHistoryAPI.DeleteViewCheckHistory(checkIdView).then(() => {
                debugger;
                console.log(checkIdView);
                dispatch(setDeleteViewCheckHistory(checkIdView));
            });
        }
    }
}

export default viewCheckHistoryReducer;