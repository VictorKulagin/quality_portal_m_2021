import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Form, Item, Input, Body, CheckBox, Button} from 'native-base';
import {Field, reduxForm} from "redux-form";

import handleSubmit from "redux-form/lib/handleSubmit";
import InputText from "../common/InputText";
import {connect} from "react-redux"
import {login} from "../redux/auth-reducer";
//import {Actions} from "react-native-router-flux";
import { StackActions } from '@react-navigation/native';
import Categories from "../categories/Categories";



const AuthForm = (props) => {
    debugger;
    const renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }
    debugger;
    const onSubmit = (values) => {
        console.log(values.username);
        console.log(values.password);

        props.login(values.username, values.password);
        if(values.username){
            <Categories/>
        } else {
            alert("pass");
        }

    }

    const { handleSubmit } = props
    debugger;
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.middle}>
                <Text style={styles.textContainer}>You are redy to go</Text>

                <View style={styles.formArea}>
                    <Text style={[styles.textContainer, styles.signin]}>Sign in</Text>

                    <Form style={styles.mainForm} onSubmit={props.handleSubmit}>
                        <Item style={styles.formItems}>
                            <Field
                                placeholder="Username"
                                name={"username"}
                                component={renderTextInput}
                                style={{ fontSize: 12 }} />
                                <Text></Text>
                        </Item>
                        <Item style={styles.formItems}>
                            <Field
                                placeholder="Password"
                                name={"password"}
                                secureTextEntry={true}
                                component={renderTextInput}
                                style={{ fontSize: 12 }} />
                        </Item>
                        <View style={styles.loginAs}>
                            <Text style={styles.loginText}>Login as</Text>
                            <CheckBox checked={true} />
                            <Body>
                               <Text style={styles.cboxText}>Admin</Text>

                            </Body>
                            <CheckBox checked={false} />
                            <Body>
                                <Text style={styles.cboxText}>User</Text>
                            </Body>
                            <CheckBox checked={false} />
                        </View>

                        <View style={styles.Buttom}>
                            <Button block style={styles.mainBtn} onPress={handleSubmit(onSubmit)}>
                                <Text style={styles.btnText}>Submit</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </View>
            <View style={styles.bottom}></View>
        </View>
    );
}

const validate = (values) => {
    const errors = {};
    if(!values.username) {
        errors.username = "Name is required"
    }
    return errors;
}

export default connect(null, {login})(reduxForm({
    form: 'auth',
    validate
})(AuthForm))

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
    },
    top: {
        position: 'relative',
        backgroundColor: '#eb2d93',
        paddingRight: 12.7,
        paddingLeft: 12.7,
        height: 250
    },
    middle: {
      width: '100%',
      height: '100%',
      flex: 1,
      position: 'absolute',
      zIndex: 2,
      backgroundColor: 'transparent',
      paddingLeft: 26.3,
      paddingRight: 26.3,
    },
    bottom: {
      position: 'relative',
      height: '100%',
      paddingRight: 12.7,
      paddingLeft: 12.7,
      backgroundColor: '#eb2d93',
    },
    textContainer: {
        color: '#fcfdff',
        fontSize: 24,
        marginBottom: 30,
        position: 'relative',
        top: '20%',
        alignSelf: 'center',
    },
    formArea: {
       alignSelf: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        top: '20%',
        paddingBottom: 40,
        borderRadius: 10,
    },
    signin: {
        top: 0,
        color: '#2d3057',
        margin: 15
    },
    formItems: {
        marginTop: 15,
        borderBottomColor: '#2d3057'
    },
    Input: {
        //fontFamily: 'Poppins-Bold',
        fontSize: 12
    },
    loginAs: {
       marginTop: 15,
       display: 'flex',
       flexDirection: 'row',
       marginBottom: 20,
       alignItems: 'center',
       paddingLeft: 46.6,
    },
    loginText: {
        color: '#2d3057',
        fontSize: 10,
        fontWeight: 'bold',
    },
    cboxText: {
        fontSize: 10
    },
    Button: {
        padding: 30.8,
        borderRadius: 5,
    },
    mainBtn: {
        backgroundColor: '#108aa8',
        fontSize: 12,
    },
    btnText: {
        color: '#2D3057',
        fontSize: 12
    }
})

//export default Auth;
