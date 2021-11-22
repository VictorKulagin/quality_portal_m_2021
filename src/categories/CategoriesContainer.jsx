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
        /*if(props.paramToken === "null") {
            props.navigation.navigate("SignInScreenContainer")
        }else{*/
        props.getCategoriesThunkCreator();
       /* }*/


    }, [] );

     console.log("+ " + props.token + "  TokenCat");
    /*useEffect(() => {
        if(props.paramToken === "null") {
            props.navigation.navigate("SignInScreenContainer")
        }
    }, [props.paramToken]);*/

//debugger;
        return <Categories {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    return {
        categories: state.categoriesPage.categories,
        token: state.categoriesPage.token
        /*paramToken: state.categoriesPage.paramToken*/
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