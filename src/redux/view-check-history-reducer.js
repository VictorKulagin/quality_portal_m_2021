import {ViewCheckHistoryAPI} from "../api/api";

const VIEW_CHECK_HISTORY = 'VIEW_CHECK_HISTORY';
const DELETE_CHECK_HISTORY = 'DELETE_CHECK_HISTORY';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const CATEGORY_NAME = 'CATEGORY_NAME';

let initialState = {
    result: null,
    model: null,
    categoryName: "",
    id: null,
    isFetching: false
}

const viewCheckHistoryReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case VIEW_CHECK_HISTORY: {
            debugger;
            return { ...state, ...action.result, ...action.model }
        }
        case DELETE_CHECK_HISTORY: {
            let results = state.model;
            let actionId = action.id;
            let newResults = results.filter(function(checks) {
                return checks.id !== actionId;
            });
            console.log(action.id);
            console.log(newResults);
            return { ...state, model: newResults }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case CATEGORY_NAME: {
            return { ...state, categoryName: action.categoryName }
        }
        default:
            return state;
    }
}

export const setViewCheckHistory = (result, model) => ({type: VIEW_CHECK_HISTORY, result, model})
export const setDeleteViewCheckHistory = (id) => ({type: DELETE_CHECK_HISTORY, id})
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const categoryName = (categoryName) => ({ type: CATEGORY_NAME, categoryName })

export const getViewCheckThunkHistory = (parentIdView, Page, pageSize, checkIdView) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        debugger;
        ViewCheckHistoryAPI.ViewCheckHistory(parentIdView, Page, pageSize).then(response => {
            debugger;
           dispatch(setViewCheckHistory(response.data.result, response.data));
           dispatch(toggleIsFetching(false));
           dispatch(categoryName(response.data.category_name));
        });
        if(checkIdView !== undefined){
            ViewCheckHistoryAPI.DeleteViewCheckHistory(checkIdView).then(() => {
                console.log(checkIdView);
                debugger;
                dispatch(setDeleteViewCheckHistory(checkIdView));
                dispatch(categoryName(response.data.category_name));
            });
        }
    }
}

export default viewCheckHistoryReducer;