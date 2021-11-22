import React, {useEffect} from 'react';

import { YellowBox } from 'react-native'
import CheckEditing from "./CheckEditing";
import {connect} from "react-redux"
import {
    getCheckThunkCreatorEdition,
    GetCoefficients,
    getCoefficientThunkEditingAPI,
    getTextThunkEditingAPI,
    getFilesThunkEditingAPI, getClearTextThunkEditingAPI, getDelPictureThunkAPI
} from "../../../../redux/create-check-reducer";

//import { getDelPictureThunkAPI } from "../../../../redux/check-editing-reducer";
import CreateCheck from "../CreateCheck";
//import {DelPictureApi} from "../../../../api/api";
//import {getFilesThunkEditingAPI} from "../../../../redux/check-editing-reducer";


YellowBox.ignoreWarnings([
    'Require cycle:'
])

debugger;
const CheckEditingContainer = (props) => {

    useEffect(() => {
        debugger;
        if(props.route.params?.parentId && props.route.params?.itemId && props.route.params?.checkId){
            props.getCheckThunkCreatorEdition(props.route.params?.parentId, props.route.params?.itemId, props.route.params?.checkId);
        }
    }, [props.route.params?.parentId, props.route.params?.itemId, props.route.params?.checkId]);


    /*Картинка*/
    useEffect(() => {
        debugger;
        if(props.route.params?.formData){
            debugger;
            props.getFilesThunkEditingAPI(props.route.params?.formData);
        }
    }, [props.route.params?.formData]);

    useEffect(() => {
        console.log('useEffect getTextThunkEditingAPI')
        debugger;
        if(props.route.params?.valueText && props.route.params?.itemId && props.route.params?.checkId){ //value, itemId, checkId
            debugger;
            props.getTextThunkEditingAPI(props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId);
        }
    }, [props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId]);



    /***Clear_Text***/
    useEffect(() => {
        console.log('useEffect getTextThunkEditingAPI')
        debugger;
        if(props.route.params?.valueText === "" && props.route.params?.itemId && props.route.params?.checkId){ //value, itemId, checkId
            debugger;
            props.getClearTextThunkEditingAPI(props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId);
        }
    }, [props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId]);


    /***Delete_Pictur***/
    useEffect(() => {
        console.log('useEffect DelPictureApi')
        debugger;
        if( props.route.params?.itemId && props.route.params?.checkId && props.route.params?.resultId /*&& props.route.params?.fileLength*/ ){ //value, itemId, checkId
            debugger;
            props.getDelPictureThunkAPI(props.route.params?.itemId, props.route.params?.checkId, props.route.params?.resultId);
            console.log('DelPictureApi + 1');
        }
    }, [props.route.params?.resultId, props.route.params?.itemId , props.route.params?.checkId/*, props.route.params?.fileLength*/]);


    useEffect(() => {
        debugger;
        if(props.route.params?.value && props.route.params?.itemId && props.route.params?.checkId){ //value, itemId, checkId
            debugger;
            props.getCoefficientThunkEditingAPI(props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId);
        }
    }, [props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId]);


    console.log(props);
    debugger
    return  <CheckEditing {...props} />


};

let mapStateToProps = (state, props) => {
    debugger;
    console.log(props.route.params?.itemId)
    console.log(state.createCheckReducer.results)
    return {
        check: state.checkEditingReducer.check,
        results: state.createCheckReducer.results,
        //results: state.checkEditingReducer.results,
        tree: state.checkEditingReducer.tree,
        data: state.checkEditingReducer.data,
        config: state.checkEditingReducer.config,
        getResult: state.createCheckReducer.getResult,
        isFetching: state.createCheckReducer.isFetching,
        filesLength:  state.createCheckReducer.results[props.route.params?.itemId].files?.length,
    }
}


export default connect(mapStateToProps, {
    getCheckThunkCreatorEdition, getFilesThunkEditingAPI, getTextThunkEditingAPI, getClearTextThunkEditingAPI, getDelPictureThunkAPI, getCoefficientThunkEditingAPI,GetCoefficients
})(CheckEditingContainer);

