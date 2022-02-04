import React, {useEffect} from 'react';
import ViewCheckHistory from "./ViewCheckHistory";
import {connect} from "react-redux";
import {
    Image,
    View,
} from "react-native";
import {
    categoryName,
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
    debugger;
    const parent_id_ = props.route.params.parent_id_;
    //console.log(parent_id_);

    useEffect(() => {
        debugger;
        props.getViewCheckThunkHistory(parent_id_, props.route.params?.Page, props.route.params?.pageSize, props.route.params?.IdView);
    }, [parent_id_, props.route.params?.Page, props.route.params?.pageSize, props.route.params?.IdView] );

    useEffect(() =>{
        setTimeout(() => props.navigation.setOptions({ title: `Просмотреть историю проверок ${props.categoryName}` }), 0);
    });

    /*****-=Создать EndCheckTrue=-*****/

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
        isFetching: state.viewCheckHistoryReducer.isFetching,
        categoryName: state.viewCheckHistoryReducer.categoryName
    }
}

export default connect(mapStateToProps, {
    getViewCheckThunkHistory, getEndCheckThunk, getThunkToggleIsFetching
})(ViewCheckHistoryContainer);