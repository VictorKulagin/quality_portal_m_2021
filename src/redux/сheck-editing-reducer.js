import {CreateCheckAPI} from "../api/api";
import {DataEditingAPI} from "../api/api";


const CREATE_DATA_CHECK = 'CREATE_DATA_CHECK';
const IMG_DATA = 'IMG_DATA';
const TEXT_DATA = 'TEXT_DATA';


debugger;
let initialState = {
    check: [],
    results: [],
    tree: [],
    data: []
}

const checkEditingReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case CREATE_DATA_CHECK: {
            return { ...state,  ...action.check, ...action.results, ...action.tree }
        }
        case IMG_DATA: {
            return { ...state,  results: action.results/*[11241].files*/ }
        }
        case TEXT_DATA: {
            return { ...state,  ...action.data/*[11241].files*/ }
        }
        default:
            return state;
    }
}

export const setCreateDataCheckEditing = (check, results, tree) => ({type: CREATE_DATA_CHECK, check, results, tree})
export const setImgDataCheckEditing = (results) => ({type: IMG_DATA, results})
export const setTextDataCheckEditing = (data) => ({type: TEXT_DATA, data})

debugger;
export const getCheckThunkCreatorEdition = (parentId, itemId, checkId) => {
    return (dispatch) => {
            debugger;
                CreateCheckAPI.ViewCheck(parentId, checkId).then(response => {
                    console.log(response.data);
                    debugger;
                    dispatch(setCreateDataCheckEditing(response.data));
                    debugger;
                    /*if(value && itemId && checkId){
                        CreateCheckAPI.AddText(value, itemId, checkId).then(response => {
                            dispatch(setAddTextValue(response.data));
                        })
                    }*/
                });


    }
}

export const getFilesThunkEditingAPI = (formDataImg, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        DataEditingAPI.AddFile(formDataImg, itemId, checkId).then(response => {
            //console.log(response.data);
            debugger;
            //dispatch(setCreateDataCheckEditing(response.data));
            dispatch(setImgDataCheckEditing(response));
            debugger;
        });
    }
}

export const getTextThunkEditingAPI = (value, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        DataEditingAPI.AddText(value, itemId, checkId).then(response => {
            //console.log(response.data);
            debugger;
            //dispatch(setCreateDataCheckEditing(response.data));
            dispatch(setTextDataCheckEditing(response));
            debugger;
        });
    }
}

export default checkEditingReducer;