import {CreateCheckAPI, EndCheckAPI} from "../api/api";


const ID_CHECK = 'ID_CHECK';
const PARENT_ID_CHECK = 'PARENT_ID_CHECK';
const VIEW_CHECK_ID = 'VIEW_CHECK_ID';

const CREATE_DATA_CHECK = 'CREATE_DATA_CHECK';
const ADD_TEXT_VALUE = 'ADD_TEXT_VALUE';

const  END_CHECK = 'END_CHECK';
const  ALERT_END_CHECK = 'ALERT_END_CHECK'

//const RESULTS_ADD_TEXT = 'RESULTS_ADD_TEXT';
//const CREATE_DATA_TREE = 'CREATE_DATA_TREE';

const  SHOW_RESULTS = 'SHOW_RESULTS';

debugger;
let initialState = {

    tree: [],
    results: [],
    check: [],

    result: [],

    alertendresult: {},

    parent_id_: null,
    id: null,
    model: []

}

const createCheckReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case ID_CHECK: {
            return { ...state, check: { ...action.check.check }, tree: { ...action.check.tree } }
        }
        case PARENT_ID_CHECK: {
            return { ...state,  ...action.result, check: { ...action.check } }
        }
        case VIEW_CHECK_ID: {
            return { ...state,  ...action.id, ...action.parent_id }
        }
        case CREATE_DATA_CHECK: {
            return { ...state,  ...action.check }
        }
        case SHOW_RESULTS: {
            return { ...state, /*...action.model,*/ ...action.results}
        }
        case ADD_TEXT_VALUE: {
            return { ...state, /*...action.model,*/ ...action.model}
        }

        case END_CHECK: {
            return { ...state, /*...action.model,*/ alertendresult: action.alertendresult}
        }
        case ALERT_END_CHECK: {
            return { ...state, alertendresult: action.alertendresult.result = false}
        }
        /*case CREATE_DATA_TREE: {
            return { ...state, ...action.tree} }
        }*/
        default:
            return state;
    }
}

debugger;

export const setCreateCheck = (check, tree) => ({type: ID_CHECK, check, tree})
export const setParentId = (result, check) => ({type: PARENT_ID_CHECK, result, check})
export const setCheckIdCheck = (id, parent_id) => ({type: VIEW_CHECK_ID, id, parent_id})
export const setCreateDataCheck = (check, tree) => ({type: CREATE_DATA_CHECK, check, tree})
export const setAddTextValue = (model, results) => ({type: ADD_TEXT_VALUE, model})

export const setShowResults = (/*model ,*/results) => ({type: SHOW_RESULTS, /*model,*/ results})

export const setEndCheckResults = (/*model ,*/alertendresult) => ({type: END_CHECK, /*model,*/ alertendresult})
export const setAlertEndCheckResults = (/*model ,*/alertendresult) => ({type: ALERT_END_CHECK, /*model,*/ alertendresult})

//export const setAddResult = (results) => ({type: RESULTS_ADD_TEXT, results})
//export const setCreateDataTree = (tree) => ({type: CREATE_DATA_TREE, tree})

export const getCreateCheckThunkCreator = (setParentId/*, value, itemId, checkId*/) => {
    return (dispatch) => {
        debugger;
        CreateCheckAPI.CreateCheck(setParentId).then(response => {
            console.log(response.data);

            debugger;
            if(response.status == 200) {
                debugger;
                console.log(response.data.check.check_list_id);
                CreateCheckAPI.ViewCheck(response.data.check.company_id, response.data.check.id).then(response => {
                    console.log(response.data);
                    debugger;
                    dispatch(setCreateDataCheck(response.data));
                    debugger;
                    /*if(value && itemId && checkId){
                        CreateCheckAPI.AddText(value, itemId, checkId).then(response => {
                            dispatch(setAddTextValue(response.data));
                        })
                    }*/
                });
            }
        });
    }
}

export const getViewCreateCheckThunkCreatorText  = (value, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        if(value && itemId && checkId){
            CreateCheckAPI.AddText(value, itemId, checkId).then(response => {
                dispatch(setAddTextValue(response.data.model));
            })
        }
    }
}

export const getViewCreateCheckThunkHistoryText = (value, itemId, checkId, parentId) => {
    return (dispatch) => {
        debugger;
        if(value && itemId && checkId){
            CreateCheckAPI.AddText(value, itemId, checkId).then(response => {
                dispatch(setAddTextValue(response.data.model));
                if(parentId && checkId) {
                    CreateCheckAPI.ShowResults(parentId, checkId).then(response => {
                        dispatch(setShowResults(response.data));
                    })
                }
            })
        }
    }
}

export const getViewHistoryCheckThunkShow = (parentId, checkId) => {
    return (dispatch) => {
        debugger;
        if(parentId && checkId){
            CreateCheckAPI.ShowResults(parentId, checkId).then(response => {
                dispatch(setShowResults(response.data));
            })
        }
    }
}

export const getEndCheckThunk = (EndCheckTrue, EndParentId, EndCheckId) => {
    return (dispatch) => {
        debugger;
        if(EndCheckTrue === true){
            EndCheckAPI.EndCheckAPI(EndParentId, EndCheckId).then(response => {
                dispatch(setEndCheckResults(response.data));
            })
        } else if(EndCheckTrue === false) {
            debugger;
            console.log("Result");
            EndCheckAPI.EndCheckAPI(EndParentId = false, EndCheckId = false ).then(response => {
                dispatch(setEndCheckResults(response.data));
            })
        }

    }
}



export default createCheckReducer;