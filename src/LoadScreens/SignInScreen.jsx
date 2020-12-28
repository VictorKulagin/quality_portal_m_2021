import React, { useState } from 'react';
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
YellowBox.ignoreWarnings(['Remote debugger']);


const SignInScreen = (props) => {

    debugger;
    const [data, setData] = React.useState({
        /*username: '',
        password: '',*/
        check_textInputChange: false,
        secureTextEntry: true
    });

    //const { signIn } = React.useContext(AuthContext);
    debugger;
    const textInputChange = (val) => {
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
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

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

    /*const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
      <View>
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => onChangeText(text)}
              value={value}
          />
          <Text>{value}</Text>
      </View>

  );*/
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



                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        //onPress={() => {loginHandle( data.username, data.password)}}
                        onPress={() => props.navigation.navigate('SignInScreenContainer', {
                        //onPress={() => props.navigation.navigate('Предприятия', {
                            username: username,
                            password: password
                        })}
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

                    <Text>{username} {password}</Text>

                    <Text>{(props.status) ? props.navigation.replace('Предприятия') : "Не верный логин пароль"}</Text>
                    {/*<TouchableOpacity
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#eb2d93',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                   >
                       <Text style={[styles.textSign, {
                           color: '#eb2d93'
                       }]}>Зарегистрироваться</Text>
                   </TouchableOpacity>*/}
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