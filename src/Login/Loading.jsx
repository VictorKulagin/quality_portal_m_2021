import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
//import {Actions} from 'react-native-router-flux';

import Logo from '../../images/Lоgo.png'

const switchtoAuth = () => {
    //Actions.replace('auth');
}

const Loading = () => {
    debugger;
    const LogoAnime = useRef(new Animated.Value(0)).current;
    const LogoText = useRef(new Animated.Value(0)).current;
    const Loading = useRef(false).current;

    debugger;
    useEffect(() => {
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
            }).start(),

            Animated.timing(LogoText, {
                toValue: 1,
                duration: 8000,
            }).start(() => {
                //const [Loading, setLoading] = useState(true);

                setTimeout(switchtoAuth, 8000)
            })
        ]);
    },[]);

    debugger;
    return (
        <View style={styles.container}>
           <Animated.View style={{
               opacity: LogoAnime,
               top: LogoAnime.interpolate({
                   inputRange: [0, 1],
                   outputRange: [80, 1]
               })
           }}>
               <Image source={Logo} style={{width: 230, height: 225}}/>
           </Animated.View>
        <Animated.View style={{opacity: LogoText}}>
          <Text style={styles.logoText}> LoadingScene</Text>
        </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eb2d93',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoText: {
        color: '#ffffff',
        //fontFamily: 'GoogleSans-Bold',
        fontSize: 30,
        marginTop: 30,
        fontWeight: '300'
    }
});

export default Loading