import {categoriesAPI} from "../api/api";


const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_TOKEN = 'SET_TOKEN';

let initialState = {
    categories: [],
    token: ""
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return { ...state, categories: action.categories }
        }
        case SET_TOKEN: {
            return { ...state, token: action.token }
        }
        default:
            return state;
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORIES, categories})
export const setToken = (token) => ({type: SET_TOKEN, token})

export const getCategoriesThunkCreator = () => {
    return (dispatch) => {
        categoriesAPI.getCategories().then(response => {
            dispatch(setCategories(response.data.categories));

            dispatch(setToken(response.config.accessTocken));
        });
    }
}

export default categoriesReducer;