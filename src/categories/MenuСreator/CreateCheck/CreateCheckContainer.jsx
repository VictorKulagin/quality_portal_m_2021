import React, {useEffect} from 'react';
import CreateCheck from "./CreateCheck";
import {connect} from "react-redux"
import {
    GetCoefficients,
    getCreateCheckThunkCreator, getEndCheckThunk,
    getViewCreateCheckThunkCreatorText, getViewCreateCheckThunkHistoryText,
    getViewHistoryCheckThunkShow, getSearchTextThunkCreator, getResetStateCheckThunkCreator, getInputTextThunkCreator
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

    useEffect(() => {
        debugger;
        props.getCreateCheckThunkCreator(props.route.params.parent_id_);
    }, [props.route.params.parent_id_]);


    useEffect(() => {
        debugger;
        if(props.route.params?.parentIdSearch && props.route.params?.checkIdSearch /*&& props.route.params?.searchText*/){
            debugger;
            props.getSearchTextThunkCreator(props.route.params?.parentIdSearch, props.route.params?.checkIdSearch /*&& props.route.params?.searchText*/);
        }
    }, [props.route.params?.parentIdSearch, props.route.params?.checkIdSearch/*, props.route.params?.searchText*/]);


    useEffect(() => {
        debugger;
        if(props.route.params?.TextInputSearch){
            debugger;
            props.getInputTextThunkCreator(props.route.params?.TextInputSearch);
        }
    }, [props.route.params?.TextInputSearch]);


    useEffect(() => {
        debugger
        if(props.route.params?.value && props.route.params?.checkId && props.route.params?.itemId){
            props.getViewCreateCheckThunkCreatorText(props.route.params?.value, props.route.params?.checkId, props.route.params?.checkId); /* checkId - номер проверки */
        }
    }, [props.route.params?.value, props.route.params?.checkId, props.route.params?.itemId]);

    useEffect(() => {
        debugger
        if(props.route.params?.value && props.route.params?.itemId && props.route.params?.checkId  && props.route.params?.parentId){
            props.getViewCreateCheckThunkHistoryText(props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId, props.route.params?.parentId); /* checkId - номер проверки */
        }
    }, [props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId, props.route.params?.parentId]);

    useEffect(() => {
        debugger
        if(props.route.params?.parentId && props.route.params?.checkId){
            props.getViewHistoryCheckThunkShow(props.route.params?.parentId, props.route.params?.checkId); /* checkId - номер проверки */
        }
    }, [props.route.params?.parentId, props.route.params?.checkId]);

/*****-=Создать EndCheckTrue=-*****/
    useEffect(() => {
        debugger
        if(props.route.params?.EndCheckTrue && props.route.params?.EndParentId && props.route.params?.EndCheckId){
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        } else if(props.route.params?.EndCheckTrue === false) {
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        }
    }, [props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId]);

    useEffect(() => {
        debugger
        if(props.route.params?.checkId){
            props.GetCoefficients(props.route.params?.checkId);
        }
    }, [props.route.params?.checkId]);

    useEffect(() =>{
        setTimeout(() => props.navigation.setOptions({ title: `Создать проверку ${ props.check?.company_id }` }), 0);
    })


        return <CreateCheck {...props} />
};


let mapStateToProps = (state) => {
    debugger;
    return {
        check: state.createCheckReducer.check,
        tree: state.createCheckReducer.tree,
        results: state.createCheckReducer.results,
        model: state.createCheckReducer.model,
        text: state.createCheckReducer.text,
        searchText: state.createCheckReducer.searchText,
        textInput: state.createCheckReducer.textInput,

        parent_id: state.createCheckReducer.parent_id,
        check_id: state.createCheckReducer.check_id,
        id: state.createCheckReducer.id,
        alertendresult: state.createCheckReducer.alertendresult,
        getResult: state.createCheckReducer.getResult,
    }
}

export default connect(mapStateToProps, {
    getCreateCheckThunkCreator, getViewCreateCheckThunkCreatorText, getViewHistoryCheckThunkShow, getViewCreateCheckThunkHistoryText, getEndCheckThunk, getCoefficientThunkEditingAPI, GetCoefficients, getSearchTextThunkCreator, getResetStateCheckThunkCreator, getInputTextThunkCreator
})(CreateCheckContainer);
