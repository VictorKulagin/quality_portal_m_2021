 /***********/
import {CreateCheckAPI, DelPictureApi} from "../api/api";


/***********/
import {DataEditingAPI} from "../api/api";

/*****--CREATE_DATA_CHECK--******/
const CREATE_DATA_CHECK = 'CREATE_DATA_CHECK';

/*****-IMG_DATA-******/
//const IMG_DATA = 'IMG_DATA';


/*****TEXT_DATA******/
//const TEXT_DATA = 'TEXT_DATA';
/***********/
//const COEFFICIENT_CHANGE = 'COEFFICIENT_CHANGE';

 /*****-DELETE_PICTURE-******/
 //const DELETE_PICTURE = 'DELETE_PICTURE';


debugger;
let initialState = {
    check: [],
    /***********/
    results: [],
    tree: [],
    data: [],
    config: []
}

const checkEditingReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        /*****--CREATE_DATA_CHECK--******/
        case CREATE_DATA_CHECK: {
            return { ...state,  ...action.check, ...action.results, ...action.tree }
        }
        /*****-IMG_DATA-******/
       /*case IMG_DATA: {
            debugger;
            let newResults = state.results;
            let item_id = action.results.files[0].item_id;

           if(!newResults[item_id].files){
              console.log("none");
               let item_results = {...newResults[item_id], files: action.results.files}
               newResults = {...newResults, [item_id]: item_results}
               return { ...state,  results: newResults }
           } else {
               let item_results = {
                   ...newResults[item_id],
                   files: [...newResults[item_id].files, action.results.files[0]]
               };
               newResults = {...newResults, [item_id]: item_results}
               return { ...state,  results: newResults }
           }
        }*/

        /*****TEXT_DATA******/
        /*case TEXT_DATA: {
            debugger;
            let newResults = state.results;
            let item_id = action.results.data.model.item_id;
            let item_results = {...newResults[item_id], text: action.results.data.model};

            newResults = {...newResults, [item_id]: item_results}

            return { ...state,  results: newResults }
        }*/
        /***********/
       /* case COEFFICIENT_CHANGE: {
            debugger;
            let newResults = state.results;
            let item_id = JSON.parse(action.results.config.data);
            let item_results = {...newResults[item_id.itemId], coefficient: action.results.data.model};

            newResults = {...newResults, [item_id.itemId]: item_results}

            console.log(newResults + " SSS");
            return { ...state,  results: newResults }

        }*/

        /*case DELETE_PICTURE: {
            let newResultsDel = state.results;

            let itemId = action.results.data.model.itemId;
            let id = action.results.data.model.id;
            if (newResultsDel[itemId].files) {
                let files = newResultsDel[itemId].files;
                files.map((value, index) => {
                    console.log(value);
                    if (value.id === id) {
                        const indexId = index;
                        files.splice(indexId, 1);
                        let item_results = {
                            ...newResultsDel[itemId]//,
                        };
                        const item_results2 = item_results;
                        newResultsDel = {...newResultsDel, [itemId]: item_results}
                        return {...state, results: newResultsDel}
                    }
                })
            }
        }*/

        default:
            return state;
    }
}
/*****--CREATE_DATA_CHECK--******/
export const setCreateDataCheckEditing = (check, results, tree) => ({type: CREATE_DATA_CHECK, check, results, tree})

 /***-DEL_IMG-***/
/*export const setDelPicture = (results) => ({ type: DELETE_PICTURE, results})*/
/*****-IMG_DATA-******/
//export const setImgDataCheckEditing = (results) => ({type: IMG_DATA, results})

/*****TEXT_DATA******/
//export const setTextDataCheckEditing = (results) => ({type: TEXT_DATA, results})
/***********/
//export const setCoefficientChangeCheckEditing = (results) => ({type: COEFFICIENT_CHANGE, results})

debugger;
/*****--CREATE_DATA_CHECK--******/
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

 /*****-DEL_PICTURE-******/
 /*export const getDelPictureThunkAPI = (itemId, checkId, resultId) => {
     return (dispatch) => {
         debugger;
         DelPictureApi.DelPicture(itemId, checkId, resultId).then(response => {
             dispatch(setDelPicture(response));
         });
     }
 }*/

/*****-IMG_DATA-******/
/*export const getFilesThunkEditingAPI = (formData) => {
    return (dispatch) => {
        debugger;

        DataEditingAPI.AddFile(formData).then(response => {
            debugger;
            dispatch(setImgDataCheckEditing(response.data));
            debugger;
        });
    }
}*/

/*****TEXT_DATA******/
/*export const getTextThunkEditingAPI = (valueText, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        DataEditingAPI.AddText(valueText, itemId, checkId).then(response => {
            debugger;
            dispatch(setTextDataCheckEditing(response));
            debugger;
        });
    }
}*/

/***********/
/*export const getCoefficientThunkEditingAPI = (selectedValue, itemId, checkId) =>  {
    return (dispatch) => {
        debugger;

        DataEditingAPI.ChangeCoefficient(selectedValue, itemId, checkId).then(response => {
            console.log(response.data);
            debugger;

            dispatch(setCoefficientChangeCheckEditing(response));
            debugger;
        });
    }
}*/

export default checkEditingReducer;