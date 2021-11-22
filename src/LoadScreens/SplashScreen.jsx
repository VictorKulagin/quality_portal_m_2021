import React, {useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Button,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    /***Автоматический переход***/
    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        debugger;
        try {
                setTimeout(() => navigation.navigate('SignInScreenContainer'), 2000);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    //duration="8500"
                source={require('../../assets/Lоgo.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>Где мы там победа!</Text>
                <Text style={styles.text}>Войти с помощью аккаунта!</Text>
                {/*<View>
                    <Button
                        onPress={() => navigation.navigate('SignInScreenContainer')}
                        title="Press Me"
                        color="#841584"
                    />
                </View>*/}
                {/*<View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.replace('SignInScreenContainer')}>
                        <LinearGradient
                            colors={['#eb2d93', '#964c7e']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Начать</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>*/}
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eb2d93'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});