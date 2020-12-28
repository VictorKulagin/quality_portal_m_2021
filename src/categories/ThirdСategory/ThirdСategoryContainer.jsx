import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThirdCategory from "../ThirdСategory/ThirdСategory";
import {connect} from "react-redux"

import * as axios from "axios";
import {getThirdCategoriesThunkCreator} from "../../redux/third-category-reducer";

/*import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";*/
//debugger;
const ThirdCategoriesContainer = (props) =>  {
    //debugger;
    useEffect(() => {
        //debugger;

        /*axios.get("http://109.73.14.239/api/categories")
            .then(response => {
                debugger;
                response.data();
            });*/
        props.getThirdCategoriesThunkCreator(props.route.params.name.id);
    }, [] );

    //debugger;
    return <ThirdCategory {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        categories: state.thirdCategoriesReducer.categories
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
    getThirdCategoriesThunkCreator
})(ThirdCategoriesContainer);