import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SubCategories from "./SubCategory";
import Categories from "../Categories";
import {connect} from "react-redux"
import {getSubCategoriesThunkCreator} from "../../redux/sub-categories-reducer";
import SubCategory from "./SubCategory";

/*import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";*/
//debugger;

const SubCategoriesContainer = (props) =>  {
    //debugger;
    useEffect((parent_id) => {
        //debugger;
        props.getSubCategoriesThunkCreator(/*19*//*props.parent_id*/props.route.params.name.id);
    }, [] );

//debugger;
        return <SubCategories {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        categories: state.subCategoriesReducer.categories,
        parent_id: state.subCategoriesReducer.parent_id
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
    getSubCategoriesThunkCreator
})(SubCategoriesContainer);