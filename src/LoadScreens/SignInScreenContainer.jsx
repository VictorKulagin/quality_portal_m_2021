import React, {useEffect} from 'react';
import {connect} from "react-redux"
import {getLoadScreenAuthThunkCreator, setStatusText, /*getLoadScreenAuthThunkCreatorNull*/ getLogoutScreenAuth} from "../redux/load-screen-reducer";
import SignInScreen from "./SignInScreen";


const SignInScreenContainer = (props) =>  {

    useEffect((grant_type, username, password, client_id, client_secret) => {
        debugger;
        if (props.route.params?.username && props.route.params?.password) {
            props.getLoadScreenAuthThunkCreator(grant_type, props.route.params.username, props.route.params.password, client_id, client_secret); /*props.route.params.user_email, props.route.params.password*/
        }
   }, [props.route.params?.username, props.route.params?.password] );
    debugger;


    useEffect(() => {
        props.getLogoutScreenAuth();
        //setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);

    }, [] );
    debugger;

    useEffect(() => {
        if(props.exit === true){
            setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);
        }
    }, [props.exit] );
    debugger;

    /*useEffect(() => {
        if(props.exit === true){
            setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);
        }
    }, [props.exit] );*/

debugger;
    return <SignInScreen {...props} />

};

//debugger;
let mapStateToProps = (state) => {
    //debugger
    return {
        grant_type: state.setLoadScreenAuthReducer.grant_type,
        username: state.setLoadScreenAuthReducer.username,
        password: state.setLoadScreenAuthReducer.password,
        client_id: state.setLoadScreenAuthReducer.client_id,
        client_secret: state.setLoadScreenAuthReducer.client_secret,
        access_token: state.setLoadScreenAuthReducer.access_token,
        status: state.setLoadScreenAuthReducer.status,
        exit: state.setLoadScreenAuthReducer.exit
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
    getLoadScreenAuthThunkCreator,
    /*getLoadScreenAuthThunkCreatorNull*/
    getLogoutScreenAuth
})(SignInScreenContainer);