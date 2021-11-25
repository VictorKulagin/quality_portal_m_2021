import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SubCategories from "./SubCategory";
import Categories from "../Categories";
import {connect} from "react-redux"
import {getSubCategoriesThunkCreator} from "../../redux/sub-categories-reducer";
import SubCategory from "./SubCategory";


const SubCategoriesContainer = (props) =>  {
    useEffect((parent_id) => {
        //debugger;
        props.getSubCategoriesThunkCreator(/*19*//*props.parent_id*/props.route.params.name.id);
    }, [] );


    useEffect(() =>{
        setTimeout(() => props.navigation.setOptions({ title: props.route.params.name.title }), 0);
    }, [])

//debugger;
        return <SubCategories {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        categories: state.subCategoriesReducer.categories,
        parent_id: state.subCategoriesReducer.parent_id
    }
}

export default connect(mapStateToProps, {
    getSubCategoriesThunkCreator
})(SubCategoriesContainer);