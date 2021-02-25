import {CreateCheckAPI} from "../api/api";
import {DataEditingAPI} from "../api/api";


const CREATE_DATA_CHECK = 'CREATE_DATA_CHECK';
const IMG_DATA = 'IMG_DATA';
const TEXT_DATA = 'TEXT_DATA';
const COEFFICIENT_CHANGE = 'COEFFICIENT_CHANGE';


debugger;
let initialState = {
    check: [],
    results: [],
    tree: [],
    data: [],
    config: []
}

const checkEditingReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case CREATE_DATA_CHECK: {
            return { ...state,  ...action.check, ...action.results, ...action.tree }
        }
        case IMG_DATA: {
            debugger;
            let newResults = state.results;
            let item_id = action.results.data.files[0].item_id;
            //console.log(action.results.data.files[0].item_id + ' Idfiles');
            let item_results = {...newResults[item_id], files: action.results.data.files};

            newResults = {...newResults, [item_id]: item_results}

            return { ...state,  results: newResults/*[11241].files*/ }
    }
        case TEXT_DATA: {
debugger;
            let newResults = state.results;
            let item_id = action.results.data.model.item_id;
            let item_results = {...newResults[item_id], text: action.results.data.model};

            newResults = {...newResults, [item_id]: item_results}

            return { ...state,  results: newResults/*[11241].files*/ }
        }
        case COEFFICIENT_CHANGE: {
            debugger;
            let newResults = state.results;
            let item_id = JSON.parse(action.results.config.data);
            let item_results = {...newResults[item_id.itemId], coefficient: action.results.data.model};

            newResults = {...newResults, [item_id.itemId]: item_results}

            return { ...state,  results: newResults/*[11241].files*/ }

            //console.log(item_id.itemId + " SSS");

            //console.log(typeof(newResults));
            /*newResults = JSON.parse(newResults);
            console.log(typeof(newResults));*/
            //let item_results_ = {...newResults[item_id.itemId]};



            //console.log(item_results_.coefficient.value + " " + item_id.value + " SSS 0");

            //item_results_.coefficient.value = item_id.value;

            //let item_results = {...newResults[item_id.itemId]};

            //console.log(JSON.stringify(item_results) + " SSS 1");

            //newResults = {...newResults, [item_id.itemId]: item_results}

            //console.log(JSON.stringify(newResults) + " SSS 2");

            //return { ...state,  results: newResults/*[11241].files*/ }
        }
        default:
            return state;
    }
}

export const setCreateDataCheckEditing = (check, results, tree) => ({type: CREATE_DATA_CHECK, check, results, tree})
export const setImgDataCheckEditing = (results) => ({type: IMG_DATA, results})
export const setTextDataCheckEditing = (results) => ({type: TEXT_DATA, results})
export const setCoefficientChangeCheckEditing = (results) => ({type: COEFFICIENT_CHANGE, results})

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

export const getFilesThunkEditingAPI = (formData/*, itemId, checkId*/) => {
    return (dispatch) => {
        debugger;

        DataEditingAPI.AddFile(formData/*, itemId, checkId*/).then(response => {
            //console.log(response.data);
            debugger;
            //dispatch(setCreateDataCheckEditing(response.data));



            dispatch(setImgDataCheckEditing(response));
            debugger;
        });
    }
}

export const getTextThunkEditingAPI = (valueText, itemId, checkId) => {
    console.log('before return');

    return (dispatch) => {
        debugger;
        console.log('before send');

        DataEditingAPI.AddText(valueText, itemId, checkId).then(response => {

            //
            // console.log(initialState);
            // console.log({data: response.data});
            //console.log(response.data);
            debugger;
            //dispatch(setCreateDataCheckEditing(response.data));
            dispatch(setTextDataCheckEditing(response));
            debugger;
        });
    }
}

export const getCoefficientThunkEditingAPI = (selectedValue, itemId, checkId) =>  {
    return (dispatch) => {
        debugger;

        DataEditingAPI.ChangeCoefficient(selectedValue, itemId, checkId).then(response => {
            //console.log(response.data);
            debugger;
            //dispatch(setCreateDataCheckEditing(response.data));
            dispatch(setCoefficientChangeCheckEditing(response));
            debugger;
        });
    }
}

export default checkEditingReducer;