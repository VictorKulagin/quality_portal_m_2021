import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Categories from "./Categories";
import {connect} from "react-redux"

import * as axios from "axios";
import {getCategoriesThunkCreator} from "../redux/categories-reducer";

/*import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";*/
debugger;
const CategoriesContainer = (props) =>  {
    debugger;
    useEffect(() => {
        //debugger;

        /*axios.get("http://109.73.14.239/api/categories")
            .then(response => {
                debugger;
                response.data();
            });*/
        props.getCategoriesThunkCreator();
    }, [] );

//debugger;
        return <Categories {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        categories: state.categoriesPage.categories
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
    getCategoriesThunkCreator
})(CategoriesContainer);