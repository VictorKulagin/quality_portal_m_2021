import {categoriesAPI, subCategoriesAPI} from "../api/api";


const SET_SUB_CATEGORIES = 'SET_SUB_CATEGORIES';
const PARENT_ID = 'PARENT_ID';

let initialState = {
    categories: [],
    parent_id: null
}

const subCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUB_CATEGORIES: {
            return { ...state, categories: action.categories }
        }
        case PARENT_ID: {
            return { ...state,  ...action.parent_id }
        }
        default:
            return state;
    }
}

export const setSubCategories = (categories) => ({type: SET_SUB_CATEGORIES, categories})
export const setParentId = (parent_id) => ({type: SET_SUB_CATEGORIES, parent_id})

export const getSubCategoriesThunkCreator = (setParentId) => {
    return (dispatch) => {
        subCategoriesAPI.getSubCategories(setParentId).then(response => {
           dispatch(setSubCategories(response.data.categories));
        });
    }
}

export default subCategoriesReducer;