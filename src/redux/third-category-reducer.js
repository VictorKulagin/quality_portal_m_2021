import {ThirdCategoriesAPI} from "../api/api";

const SET_THIRD_CATEGORIES = 'SET_THIRD_CATEGORIES';
const PARENT_ID = 'PARENT_ID';

let initialState = {
    categories: [],
    parent_id: null
}

const thirdCategoriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_THIRD_CATEGORIES: {
            return { ...state, categories: action.categories }
        }
        case PARENT_ID: {
            return { ...state,  ...action.parent_id }
        }
        default:
            return state;
    }
}

export const setThirdCategories = (categories) => ({type: SET_THIRD_CATEGORIES, categories})
export const setParentId = (parent_id) => ({type: SET_THIRD_CATEGORIES, parent_id})

export const getThirdCategoriesThunkCreator = (setParentId) => {
    return (dispatch) => {
        ThirdCategoriesAPI.getThirdCategories(setParentId).then(response => {
            dispatch(setThirdCategories(response.data.categories));
        });
    }
}

export default thirdCategoriesReducer;