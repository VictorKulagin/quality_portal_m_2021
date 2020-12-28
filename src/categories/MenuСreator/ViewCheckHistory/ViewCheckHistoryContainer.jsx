import React, {useEffect} from 'react';
import ViewCheckHistory from "./ViewCheckHistory";
import {connect} from "react-redux"
import {getViewCheckThunkHistory, setDeleteViewCheckHistory} from "../../../redux/view-check-history-reducer";

{/*Убираеm WAR Recycle cykle*/}
import { YellowBox } from 'react-native'
import {ViewCheckHistoryAPI} from "../../../api/api";
YellowBox.ignoreWarnings([
    'Require cycle:'
])

debugger;

const ViewCheckHistoryContainer = (props) => {
    debugger;
    const parent_id_ = props.route.params.parent_id_;
    console.log(parent_id_);

    useEffect(() => {
        debugger;
        props.getViewCheckThunkHistory(parent_id_, props.route.params.IdView);
    }, [props.route.params.IdView] );



    debugger;
    return <ViewCheckHistory {...props} />
};

debugger;
let mapStateToProps = (state) => {
    debugger;
    return {
        result: state.viewCheckHistoryReducer.result,
        model: state.viewCheckHistoryReducer.model,
        id: state.viewCheckHistoryReducer.id

    }
}

export default connect(mapStateToProps, {
    getViewCheckThunkHistory
})(ViewCheckHistoryContainer);