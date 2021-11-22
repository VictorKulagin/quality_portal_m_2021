import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import { LinearGradient } from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CategoriesStackScreen from './../../App'
import {AuthContext} from "../common/context";
import CategoriesContainer from "../categories/CategoriesContainer";
import SignInScreenContainer from "./SignInScreenContainer";
import { YellowBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { AsyncStorage } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);


const SignInScreen = (props) => {

    /*const Redirect = {
        MaimPage(props) {
            setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);
        }
    }*/
    debugger;
    const [data, setData] = React.useState({check_textInputChange: false, secureTextEntry: true});

    debugger;
    /*const textInputChange = (val) => {
        if( val.length != 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }*/

    /*const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }*/
    debugger;
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    /*const loginHandle = (username, password) => {
        signIn(username, password);
    }*/

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    /*if(props.exit === true){
        setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);
    }*/

    /*const save = async() => {
        debugger;
        try {
            await AsyncStorage.setItem('key_user', username);
            await AsyncStorage.setItem('key_password', password);
            setTimeout(() => load(), 0);
        } catch (err) {
            alert(err);
        }
    }

    const load = async () => {
        debugger;
        try {
            let username = await AsyncStorage.getItem('key_user');
            let password = await AsyncStorage.getItem('key_password');

            if(username !== null && password !== null) {
                  (username);
                setPassword(password);

                setTimeout(() => props.navigation.navigate('SignInScreenContainer', {
                    username: username,
                    password: password
                }), 0);
            }
        } catch (err) {
            alert(err);
        }
    }

    const remove = async  () => {
        try {
            await AsyncStorage.removeItem('key_user')
            await AsyncStorage.removeItem('key_password')

        } catch (err) {
            alert(err)
        } finally {
            setUser();
            setPassword();
        }
    }

    useEffect(() => {
            load();
        if(!username && !password){
            remove();
        }
    }, []);*/



    debugger;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#eb2d93' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Добро пожаловать!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ваш Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        /*onChangeText={(val) => textInputChange(val)}*/
                        onChangeText={text => setUser(text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="pink"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ваш пароль"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        /*onChangeText={(val) => handlePasswordChange(val)}*/
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Text style={{color: '#009387', marginTop:15}}>Забыли пароль?</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{color: '#009387', marginTop:15}}>`${username} ${password}`</Text>
                </TouchableOpacity>


                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => props.navigation.navigate('SignInScreenContainer', {
                            username: username,
                            password: password
                        })}
                        //onPress={() => save()}
                    >
                        <LinearGradient
                            colors={['#eb2d93', '#964c7e']}
                            style={styles.signIn}
                        >

                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Войти в систему</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View>
                        <Text>
                            {(props.status && props.exit === false/*&& props.route.params?.username != undefined && props.route.params?.password != undefined*/ /* && props.access_token != null*/) ? props.navigation.replace('Предприятия') : "Не верный логин пароль"}
                            {/*(props?.access_token === null) ? props.navigation.replace('SignInScreenContainer') : []*/}
                        </Text>
                    </View>

                </View>
            </Animatable.View>
        </View>
    )
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eb2d93'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});