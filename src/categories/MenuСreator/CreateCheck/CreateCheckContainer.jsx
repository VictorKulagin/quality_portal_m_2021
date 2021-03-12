import React, {useEffect} from 'react';
import CreateCheck from "./CreateCheck";
import {connect} from "react-redux"
import {
    getCreateCheckThunkCreator, getEndCheckThunk,
    getViewCreateCheckThunkCreatorText, getViewCreateCheckThunkHistoryText,
    getViewHistoryCheckThunkShow
} from "../../../redux/create-check-reducer";

{/*Убираеm WAR Recycle cykle*/}
import { YellowBox } from 'react-native'
import {getCoefficientThunkEditingAPI, getTextThunkEditingAPI} from "../../../redux/check-editing-reducer";
YellowBox.ignoreWarnings([
    'Require cycle:'
])

debugger;

const CreateCheckContainer = (props) => {
    debugger;
    //const parent_id_ = props.route.params.parent_id_;


    /*console.log(parent_id_);
    console.log(itemId);*/
    useEffect(() => {
        debugger;
        props.getCreateCheckThunkCreator(props.route.params.parent_id_);
    }, [props.route.params.parent_id_]);

    useEffect(() => {
        debugger;
        //props.route.params.parentId = null;
        if(props.route.params?.value && props.route.params?.checkId && props.route.params?.itemId){
            props.getViewCreateCheckThunkCreatorText(props.route.params?.value, props.route.params?.checkId, props.route.params?.checkId); /* checkId - номер проверки */
        }
    }, [props.route.params?.value, props.route.params?.checkId, props.route.params?.itemId]);

    useEffect(() => {
        debugger;
        //props.route.params.parentId = null;
        if(props.route.params?.value && props.route.params?.itemId && props.route.params?.checkId  && props.route.params?.parentId){
            props.getViewCreateCheckThunkHistoryText(props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId, props.route.params?.parentId); /* checkId - номер проверки */
        }
    }, [props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId, props.route.params?.parentId]);

    useEffect(() => {
        debugger;
        if(props.route.params?.parentId && props.route.params?.checkId){
            props.getViewHistoryCheckThunkShow(props.route.params?.parentId, props.route.params?.checkId); /* checkId - номер проверки */
        }
    }, [props.route.params?.parentId, props.route.params?.checkId]);


    useEffect(() => {
        debugger;
        if(props.route.params?.EndCheckTrue && props.route.params?.EndParentId && props.route.params?.EndCheckId){
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        } else if(props.route.params?.EndCheckTrue === false) {
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        }
    }, [props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId]);


    /**************************************/
    /*useEffect(() => {
        debugger;
        if(props.route.params?.value && props.route.params?.itemId && props.route.params?.checkId){
            debugger;
            props.getCoefficientThunkEditingAPI(props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId);
        }
    }, [props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId]);*/



    console.log({props:props})

    //props.check, props.check_id, props.getCreateCheckThunkCreator, props.navigation, props.parent_id, props.route, props.tree
    debugger;
        return <CreateCheck {...props} />
};

debugger;
let mapStateToProps = (state) => {
    debugger;
    return {
        check: state.createCheckReducer.check,
        tree: state.createCheckReducer.tree,
        results: state.createCheckReducer.results,
        /*model_: state.createCheckReducer.model_,*/
        model: state.createCheckReducer.model,
        text: state.createCheckReducer.text,

        parent_id: state.createCheckReducer.parent_id,
        check_id: state.createCheckReducer.check_id,
        id: state.createCheckReducer.id,
        alertendresult: state.createCheckReducer.alertendresult,

        //resultsE: state.checkEditingReducer.results,

    }
}

export default connect(mapStateToProps, {
    getCreateCheckThunkCreator, getViewCreateCheckThunkCreatorText, getViewHistoryCheckThunkShow, getViewCreateCheckThunkHistoryText, getEndCheckThunk, getCoefficientThunkEditingAPI
})(CreateCheckContainer);
