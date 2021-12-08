/***********/
import {CreateCheckAPI, DataEditingAPI, DelPictureApi, EndCheckAPI} from "../api/api";

//import {setImgDataCheckEditing} from "./check-editing-reducer";



const ID_CHECK = 'ID_CHECK';
const PARENT_ID_CHECK = 'PARENT_ID_CHECK';
const VIEW_CHECK_ID = 'VIEW_CHECK_ID';

const CREATE_DATA_CHECK = 'CREATE_DATA_CHECK';
const ADD_TEXT_VALUE = 'ADD_TEXT_VALUE';

const  END_CHECK = 'END_CHECK';
const  ALERT_END_CHECK = 'ALERT_END_CHECK';
/***********/
const COEFFICIENT_CHANGE = 'COEFFICIENT_CHANGE';
/**********/
const GET_COEFFICIENT = 'GET_COEFFICIENT';



const SEARCH_TEXT = 'SEARCH_TEXT';




/*****TEXT_DATA******/
const TEXT_DATA = 'TEXT_DATA';

/*****CLEAR_TEXT_DATA******/
const CLEAR_TEXT_DATA = 'CLEAR_TEXT_DATA';

/*****-IMG_DATA-******/
const IMG_DATA = 'IMG_DATA';

/*****-DELETE_PICTURE-******/
const DELETE_PICTURE = 'DELETE_PICTURE';




//const RESULTS_ADD_TEXT = 'RESULTS_ADD_TEXT';
//const CREATE_DATA_TREE = 'CREATE_DATA_TREE';

const  SHOW_RESULTS = 'SHOW_RESULTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

debugger;
let initialState = {

    tree: [],
    results: [],
    check: [],

    searchText: "",

    result: [],

    alertendresult: {},

    parent_id_: null,
    id: null,
    model: [],
    files: null,
    isFetching: false

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
            return { ...state, ...action.results}
        }
        case ADD_TEXT_VALUE: {
            return { ...state, ...action.model}
        }
        case GET_COEFFICIENT: {
            debugger;
            return { ...state, ...action}
        }
        case SEARCH_TEXT: {
            debugger;
            let Tree = state?.tree.children;
            console.log(Tree + " Наш");

            function filterArray(array, text) {
                if(array){
                    array.map((category) => {
                        let items = category.children.filter((item) => {
                            const itemTree =  item.name ?
                                item.name.toUpperCase()
                            : ''.toUpperCase();
                            return itemTree.indexOf(text.toUpperCase()) > -1;
                        });
                        category.children = items;
                        //arr.filter((category) => { return category !== undefined });
                        //console.log(category.children.length + "length");
                        console.log(category.children.length);
                        if(category.children.length === 0){
                            console.log( category + 'noname');
                            delete category.name;
                            delete category.id;
                        }
                        return items ? category : null;
                    });
                }

                debugger;
                //arr = arr.filter((category) => { return category.children.length !== 0 });
                //arr = arr.filter((category) => { return category !== undefined });



                 /*const newArray = [];
                 debugger;
                 if(array){
                     for (let i = 0; i < array.length; i++) {
                        for (let j in array[i].children) {
                             if(array[i].children[j].name.indexOf(text) > - 1 === true){
                                 newArray.push({name: array[i].children[j].name, id: array[i].children[j].id});
                                 debugger;
                             }
                        }
                     }
                     return newArray;
                 }*/
           }

            /*const newFilterArray = filterArray(Tree, action.searchText);
            const children = newFilterArray;
            const  tree = {
                children: {
                    name: "Результат поиска",
                    ...children
                }
            }*/

            //debugger;
            //const j="";
            const newFilterArray = filterArray(Tree, action.searchText);
            console.log(newFilterArray);

            //let arr = [];
            // if(action.searchText=== ""){}

            return {...state, a: action.searchText};

            /*let newTree = Tree.filter((item) => {
                console.log(item);
                const itemTree = item.tree.children ?
                    item.tree.children.toUpperCase()
                    : ''.toUpperCase();
                const textTree = action.searchText.toUpperCase();
                return itemTree.indexOf(textTree) > - 1;
            });*/

             //return { ...state, ...action.searchText}
        }
        /***********/
        case COEFFICIENT_CHANGE: {
            debugger;
            let newResults = state.results;
            let item_id = JSON.parse(action.results.config.data);
            let item_results = {...newResults[item_id.itemId], coefficient: action.results.data.model};

            newResults = {...newResults, [item_id.itemId]: item_results}

            console.log(newResults + " SSS");
            return { ...state,  results: newResults/*[11241].files*/ }
        }


        /*****TEXT_DATA******/
        case TEXT_DATA: {
            debugger;
            let newResults = state.results;
            let item_id = action.results.data.model.item_id;
            let item_results = {...newResults[item_id], text: action.results.data.model};

            newResults = {...newResults, [item_id]: item_results}

            return { ...state,  results: newResults/*[11241].files*/ }
        }

        /*****CLEAR_TEXT_DATA*****/
        case CLEAR_TEXT_DATA: {
            let newResults = state.results;
            let string_item_id = action.results.config.data;
            string_item_id.split(',');
            let mass_item_id = string_item_id.split(',');
            let _item_id = mass_item_id[1].split(':')
            let item_results = {...newResults[_item_id[1]], text: action.results.data.model};

            delete item_results.text;

            newResults = {...newResults, [_item_id[1]]: item_results}
            return {...state, results: newResults}
        }

        case IMG_DATA: {
            debugger;
            let newResults = state.results;
            if(action.results.files !== undefined) {
                let item_id = action.results.files[0].item_id;

                if (!newResults[item_id].files) {
                    console.log("none");
                    let item_results = {...newResults[item_id], files: action.results.files}
                    newResults = {...newResults, [item_id]: item_results}
                    return {...state, results: newResults}
                } else {
                    let item_results = {
                        ...newResults[item_id],
                        files: [...newResults[item_id].files, action.results.files[0]]
                    };
                    newResults = {...newResults, [item_id]: item_results}
                    return {...state, results: newResults}
                }
            }
        }

        /****DELETE_PICTURE****/
        case DELETE_PICTURE: {
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
                        console.log(newResultsDel);
                        return {...state, results: newResultsDel}
                    }
                })
            }
        }

        case END_CHECK: {
            return { ...state, alertendresult: action.alertendresult}
        }
        case ALERT_END_CHECK: {
            return { ...state, alertendresult: action.alertendresult.result = false}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
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




export const setSearchDescription = (searchText) => ({type: SEARCH_TEXT, searchText})



export const setShowResults = (/*model ,*/results) => ({type: SHOW_RESULTS, /*model,*/ results})

export const setEndCheckResults = (/*model ,*/alertendresult) => ({type: END_CHECK, /*model,*/ alertendresult})
export const setAlertEndCheckResults = (/*model ,*/alertendresult) => ({type: ALERT_END_CHECK, /*model,*/ alertendresult})

/*****--CREATE_DATA_CHECK--******/
export const setCreateDataCheckEditing = (check, results, tree) => ({type: CREATE_DATA_CHECK, check, results, tree})
/***********/
export const setCoefficientChangeCheckEditing = (results) => ({type: COEFFICIENT_CHANGE, results})
/*****TEXT_DATA******/
export const setTextDataCheckEditing = (results) => ({type: TEXT_DATA, results})
/*****CLEAR_TEXT_DATA******/
export const setClearTextDataCheckEditing = (results) => ({type: CLEAR_TEXT_DATA, results})
/*****-IMG_DATA-******/
//export const setImgDataCheckEditing = (results) => ({type: IMG_DATA, results})
export const setImgDataCheckEditing = (results) => ({type: IMG_DATA, results})

export const setGetCoefficient = (getResult) => ({type: GET_COEFFICIENT, getResult})

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
/***-DEL_IMG-***/
export const setDelPicture = (results) => ({ type: DELETE_PICTURE, results})

export const getCreateCheckThunkCreator = (setParentId) => {
    return (dispatch) => {
        CreateCheckAPI.CreateCheck(setParentId).then(response => {
            dispatch(toggleIsFetching(true));
            debugger;
            if(response.status == 200) {
                debugger;
                CreateCheckAPI.ViewCheck(response.data.check.company_id, response.data.check.id).then(response => {
                    debugger;
                    dispatch(setCreateDataCheck(response.data));
                    dispatch(toggleIsFetching(false));
                });
            }
        });
    }
}

export const getSearchTextThunkCreator = (searchText) => {

    return (dispatch) => {

            dispatch(setSearchDescription(searchText));

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


/******=-getEndCheckThunk-=******/
export const getEndCheckThunk = (EndCheckTrue, EndParentId, EndCheckId) => {
    return (dispatch) => {
        debugger;
        if(EndCheckTrue === true){
            EndCheckAPI.EndCheckAPI(EndParentId, EndCheckId).then(response => {
                dispatch(setEndCheckResults(response.data));
            })
        } else if(EndCheckTrue === false) {
            EndCheckAPI.EndCheckAPI(EndParentId = false, EndCheckId = false ).then(response => {
                dispatch(setEndCheckResults(response.data));
            })
        }

    }
}

/*****--CREATE_DATA_CHECK--******/
export const getCheckThunkCreatorEdition = (parentId, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        dispatch(toggleIsFetching(true));
        CreateCheckAPI.ViewCheck(parentId, checkId).then(response => {
            debugger;
            dispatch(setCreateDataCheckEditing(response.data));
            dispatch(toggleIsFetching(false));
        });
    }
}

/*****TEXT_DATA******/
export const getTextThunkEditingAPI = (valueText, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        DataEditingAPI.AddText(valueText, itemId, checkId).then(response => {
            dispatch(setTextDataCheckEditing(response));
        });
    }
}

/*****CLEAR_TEXT_DATA******/
export const getClearTextThunkEditingAPI = (valueText, itemId, checkId) => {
    return (dispatch) => {
        debugger;
        DataEditingAPI.AddText(valueText, itemId, checkId).then(response => {
            dispatch(setClearTextDataCheckEditing(response));
        });
    }
}

export const getFilesThunkEditingAPI = (formData) => {
    return (dispatch) => {
        debugger;

        DataEditingAPI.AddFile(formData).then(response => {
            debugger;
            dispatch(setImgDataCheckEditing(response.data));
            debugger;
        });
    }
}
/*****-DEL_PICTURE-******/
export const getDelPictureThunkAPI = (itemId, checkId, resultId) => {
    return (dispatch) => {
        debugger;
        DelPictureApi.DelPicture(itemId, checkId, resultId).then(response => {
            dispatch(setDelPicture(response));
        });
    }
}

const FunctionGetCoefficientsPerSection = (checkId, dispatch) => {
    DataEditingAPI.GetCoefficients(checkId).then(response => {
        debugger;
        dispatch(setGetCoefficient(response));
    });
}
/***********/
export const getCoefficientThunkEditingAPI = (selectedValue, itemId, checkId) =>  {
    return (dispatch) => {
        DataEditingAPI.ChangeCoefficient(selectedValue, itemId, checkId).then(response => {
            dispatch(setCoefficientChangeCheckEditing(response));
            if(checkId){
                FunctionGetCoefficientsPerSection(checkId, dispatch);
            }
        });
    }
}

export const GetCoefficients = (checkId) => {
    return (dispatch) => {
        debugger;
        FunctionGetCoefficientsPerSection(checkId, dispatch);
    }
}

export default createCheckReducer;