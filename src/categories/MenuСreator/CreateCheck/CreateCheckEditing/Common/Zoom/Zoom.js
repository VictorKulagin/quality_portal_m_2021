import React, {useRef, useState} from "react";
import {
    Animated,
    PanResponder,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    LayoutAnimation,
    NativeModules,
    useWindowDimensions
} from "react-native"

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

function Zoom({renderImage}) {

    /*const { width: deviceWidth } = useWindowDimensions()*/
    /*const { height: deviceHeight } = useWindowDimensions()*/

    const [w, setW] = useState(450);
    const [h, setH] = useState(300);

    const pan = useRef(new Animated.ValueXY()).current;

    const _Max_onPress = () => {
        LayoutAnimation.spring();
        if(w < 650) {
            setW(w + 100);
            setH( h + 100);
        }
    }

    const _Min_onPress = () => {
        LayoutAnimation.spring();
        if(w > 450) {
            setW(w - 100);
            setH(h - 100);
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: pan.x, // x,y are Animated.Value
                dy: pan.y,
            },
        ]),
        onPanResponderRelease: () => {
            Animated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 } } // Back to zero

            ).start();
        },
    });
console.log(renderImage)
    return (
        <View style={styles.container}>
            <View>
                <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
                    {renderImage(w, h)}
                </Animated.View>
            </View>

            <SafeAreaView style={styles.parentView}>
                <TouchableOpacity onPress={_Max_onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={_Min_onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    },
    parentView: {
        //flex: 1,
        //backgroundColor: 'blue',

        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'black',
        //borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
    },
    buttonText: {
        color: '#ffffff',
        padding: 5,
        fontSize: 30
    }

});
export default Zoom