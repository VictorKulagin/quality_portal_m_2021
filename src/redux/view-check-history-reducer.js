import {ViewCheckHistoryAPI} from "../api/api";

const VIEW_CHECK_HISTORY = 'VIEW_CHECK_HISTORY';
const DELETE_CHECK_HISTORY = 'DELETE_CHECK_HISTORY';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    result: null,
    model: null,
    id: null,
    isFetching: false
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
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}

export const setViewCheckHistory = (result, model) => ({type: VIEW_CHECK_HISTORY, result, model})
export const setDeleteViewCheckHistory = (id) => ({type: VIEW_CHECK_HISTORY, id})
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const getViewCheckThunkHistory = (parentIdView, checkIdView) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        ViewCheckHistoryAPI.ViewCheckHistory(parentIdView).then(response => {
           dispatch(setViewCheckHistory(response.data.result, response.data));
           dispatch(toggleIsFetching(false));
        });
        if(checkIdView !== undefined){
            ViewCheckHistoryAPI.DeleteViewCheckHistory(checkIdView).then(() => {
                console.log(checkIdView);
                dispatch(setDeleteViewCheckHistory(checkIdView));
            });
        }
    }
}

export default viewCheckHistoryReducer;