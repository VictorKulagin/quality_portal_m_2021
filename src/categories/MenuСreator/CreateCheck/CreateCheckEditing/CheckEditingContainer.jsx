import React, {useEffect} from 'react';

import { YellowBox } from 'react-native'
import CheckEditing from "./CheckEditing";
import {connect} from "react-redux"
import {
    getCheckThunkCreatorEdition, getCoefficientThunkEditingAPI, getFilesThunkEditingAPI, getTextThunkEditingAPI
} from "../../../../redux/check-editing-reducer";
import CreateCheck from "../CreateCheck";


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

    useEffect(() => {
        debugger;
        if(props.route.params?.formData /*&& props.route.params?.itemId && props.route.params?.checkId*/){
            debugger;
            props.getFilesThunkEditingAPI(props.route.params?.formData/*, props.route.params?.itemId, props.route.params?.checkId*/);
            //console.log(props.route.params?.formDataImg)
        }
    }, [props.route.params?.formData/*, props.route.params?.itemId, props.route.params?.checkId*/]);

    useEffect(() => {
        console.log('useEffect getTextThunkEditingAPI')
        debugger;
        if(props.route.params?.valueText && props.route.params?.itemId && props.route.params?.checkId){ //value, itemId, checkId
            debugger;
            props.getTextThunkEditingAPI(props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId);
            //console.log(props.route.params?.formDataImg)
        }
    }, [props.route.params?.valueText, props.route.params?.itemId, props.route.params?.checkId]);

    useEffect(() => {
        debugger;
        if(props.route.params?.value && props.route.params?.itemId && props.route.params?.checkId){ //value, itemId, checkId
            debugger;
            props.getCoefficientThunkEditingAPI(props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId);
            //console.log(props.route.params?.formDataImg)
        }
    }, [props.route.params?.value, props.route.params?.itemId, props.route.params?.checkId]);

    console.log(props);
    debugger
    return  <CheckEditing {...props} />


};

let mapStateToProps = (state) => {
    debugger;
    return {
        check: state.checkEditingReducer.check,
        results: state.checkEditingReducer.results,
        tree: state.checkEditingReducer.tree,
        data: state.checkEditingReducer.data,
        config: state.checkEditingReducer.config
        //result: state.checkEditingReducer.result
    }
}


export default connect(mapStateToProps, {
    getCheckThunkCreatorEdition, getFilesThunkEditingAPI, getTextThunkEditingAPI, getCoefficientThunkEditingAPI
})(CheckEditingContainer);

