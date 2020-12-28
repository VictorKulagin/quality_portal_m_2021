import {categoriesAPI} from "../api/api";


const SET_CATEGORIES = 'SET_CATEGORIES';

debugger;
let initialState = {

    categories: []
    //category: {},
    /*category: {},
    categories: [
        {
            "id": 2,
            "title": "Отели",
            "text": "",
            "parent_id": 1,
            "part_id": null,
            "sort": null,
            "type": "category",
            "create_user": null,
            "create_date": null,
            "update_user": null,
            "update_date": null,
            "public": 0
        },
        {
            "id": 3,
            "title": "ТЦ",
            "text": "",
            "parent_id": 1,
            "part_id": null,
            "sort": null,
            "type": "category",
            "create_user": null,
            "create_date": null,
            "update_user": null,
            "update_date": null,
            "public": 0
        },
        {
            "id": 19,
            "title": "Предприятия (Нижний Новгород)",
            "text": "",
            "parent_id": 1,
            "part_id": 3,
            "sort": null,
            "type": "category",
            "create_user": null,
            "create_date": null,
            "update_user": null,
            "update_date": null,
            "public": 0
        }
    ]*/
}

const categoriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORIES: {
            return { ...state, categories: action.categories }
        }
        default:
            return state;
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORIES, categories})

export const getCategoriesThunkCreator = () => {
    return (dispatch) => {
        //debugger;
        categoriesAPI.getCategories().then(response => {
            console.log(response.data + "1");
            //debugger;
           dispatch(setCategories(response.data.categories));
        });
        //debugger;
        /*axios.get("http://109.73.14.239/api/categories")
            .then(response => {
                dispatch(setCategories(response.data));
            });*/


    }
}

export default categoriesReducer;