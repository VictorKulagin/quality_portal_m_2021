import React from "react";
import {
    StyleSheet, Text, View,
    TouchableOpacity, Dimensions, ScrollView
} from "react-native";

const OPTIONS = ['0.5', '0.55', '0.6', '0.65', '0.7', '0.75', '0.8', '0.85', '0.9', '0.95', '1.0', '1.05', '1.10', '1.15', '1.20', '1.25', '1.30', '1.35', '1.40', '1.45', "1.50", "1.55", "1.60", "1.65", "1.70", "1.75", "1.80", "1.85", "1.90", "1.95"];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const  ModalPicker = (props) => {
    //debugger;
    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <View>
                    {!!item && <Text style={styles.text}>{item}</Text>}
                </View>
            </TouchableOpacity>
        )
    })
    //debugger;
    return (
        <>
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
                <ScrollView>{option}</ScrollView>
            </View>
        </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export {ModalPicker}