import React, {useEffect} from 'react';
import ViewCheckHistory from "./ViewCheckHistory";
import {connect} from "react-redux";
import {
    Image,
    View,
} from "react-native";
import {
    getEndCheckThunk, getThunkToggleIsFetching,
    getViewCheckThunkHistory,
    setDeleteViewCheckHistory
} from "../../../redux/view-check-history-reducer";

{/*Убираеm WAR Recycle cykle*/}
import { YellowBox } from 'react-native'
import {ViewCheckHistoryAPI} from "../../../api/api";
import {getViewCreateCheckThunkHistoryText} from "../../../redux/create-check-reducer";
YellowBox.ignoreWarnings([
    'Require cycle:'
])

//debugger;

const ViewCheckHistoryContainer = (props) => {
    //debugger;
    const parent_id_ = props.route.params.parent_id_;
    console.log(parent_id_);

    useEffect(() => {
        //debugger;
        //getThunkToggleIsFetching(true);
        props.getViewCheckThunkHistory(parent_id_, props.route.params.IdView);
    }, [props.route.params.IdView] );

    /*****-=Создать EndCheckTrue=-*****/
    //debugger;
    /*useEffect(() => {
        debugger;
        if(props.route.params?.EndCheckTrue && props.route.params?.EndParentId && props.route.params?.EndCheckId){
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        } else if(props.route.params?.EndCheckTrue === false) {
            props.getEndCheckThunk(props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId);
        }
    }, [props.route.params?.EndCheckTrue, props.route.params?.EndParentId, props.route.params?.EndCheckId]);*/


    //debugger;
    return (
        <>
            <ViewCheckHistory {...props} />
        </>
    )
};

//debugger;
let mapStateToProps = (state) => {
    //debugger;
    return {
        result: state.viewCheckHistoryReducer.result,
        model: state.viewCheckHistoryReducer.model,
        id: state.viewCheckHistoryReducer.id,
        results: state.checkEditingReducer.results,
        isFetching: state.viewCheckHistoryReducer.isFetching
    }
}

export default connect(mapStateToProps, {
    getViewCheckThunkHistory, getEndCheckThunk, getThunkToggleIsFetching
})(ViewCheckHistoryContainer);