import React, {useEffect} from 'react';

import { YellowBox } from 'react-native'
import CheckEditing from "./CheckEditing";
import {connect} from "react-redux"
import {
    getCheckThunkCreatorEdition, getFilesThunkEditingAPI
} from "../../../../redux/сheck-editing-reducer";


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
        if(props.route.params?.formDataImg && props.route.params?.itemId && props.route.params?.checkId){
            debugger;
            props.getFilesThunkEditingAPI(props.route.params?.formDataImg, props.route.params?.itemId, props.route.params?.checkId);
            //console.log(props.route.params?.formDataImg)
        }
    }, [props.route.params?.formDataImg, props.route.params?.itemId, props.route.params?.checkId]);

    return <CheckEditing {...props} />

};

let mapStateToProps = (state) => {
    debugger;
    return {
        check: state.checkEditingReducer.check,
        results: state.checkEditingReducer.results,
        tree: state.checkEditingReducer.tree,
        //result: state.checkEditingReducer.result
    }
}


export default connect(mapStateToProps, {
    getCheckThunkCreatorEdition, getFilesThunkEditingAPI
})(CheckEditingContainer);

