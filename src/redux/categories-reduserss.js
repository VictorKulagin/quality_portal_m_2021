const SET__CATEGORIES = 'SET__CATEGORIES';

const initialState = {
    category: {},
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
    ]
}

//debugger;
const categoriesReducerss = (state = initialState, action) => {

    switch(action.type) {
        case SET__CATEGORIES: {
             return { ...state, categories: [ ...state.categories, ...action.categories ]}
        }
        default:
            return state;
    }

}

export const set_CategoriesAC = (categories) => ({type: SET__CATEGORIES ,categories})

export default categoriesReducerss;