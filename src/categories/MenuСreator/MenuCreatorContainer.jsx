import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuCreator from "./MenuCreator";
import Categories from "../Categories";
import {connect} from "react-redux"
import {getCheckThunkCreator} from "../../redux/menu-creator-reducer";


/*import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";*/
//debugger;

const MenuCreatorContainer = (props) =>  {
    //debugger;
    useEffect((parent_id) => {
        debugger;
        props.getCheckThunkCreator(/*19*//*props.parent_id*/props.route.params.name.id);
    }, [] );

//debugger;
    return <MenuCreator {...props} />

};

debugger;
let mapStateToProps = (state) => {
    debugger
    return {
        result: state.menuCreatorReducer.result,
        check: state.menuCreatorReducer.check
        //CategoriesStackScreen: CategoriesStackScreen
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (categories) => {
            dispatch(setCategoriesAC(categories));
        }
    }
}*/



export default connect(mapStateToProps, {
    getCheckThunkCreator
})(MenuCreator);