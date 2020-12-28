import React from 'react';
import _Categories from "./_Categories";
import {connect} from "react-redux";
import {set_CategoriesAC} from "../redux/categories-reduserss";
//debugger;
const mapStateToProps = (state) => {
    return {
       categories: state._categoriesPage.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_Categories: (categories) => {
            dispatch(set_CategoriesAC(categories));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Categories);