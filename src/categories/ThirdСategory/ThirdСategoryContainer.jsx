import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThirdCategory from "../ThirdСategory/ThirdСategory";
import {connect} from "react-redux"

import * as axios from "axios";
import {getThirdCategoriesThunkCreator} from "../../redux/third-category-reducer";


const ThirdCategoriesContainer = (props) =>  {

    useEffect(() => {
        /*axios.get("http://109.73.14.239/api/categories")
            .then(response => {
                debugger;
                response.data();
            });*/
        props.getThirdCategoriesThunkCreator(props.route.params.name.id);
    }, [] );


    useEffect(() =>{
        setTimeout(() => props.navigation.setOptions({ title: "ТЦ " + props.route.params.name.title }), 0);
    }, [])

    //debugger;
    return <ThirdCategory {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        categories: state.thirdCategoriesReducer.categories
    }
}

export default connect(mapStateToProps, {
    getThirdCategoriesThunkCreator
})(ThirdCategoriesContainer);