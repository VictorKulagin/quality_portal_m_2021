import React, {useState, useEffect} from 'react';
import {
    StyleSheet, Text, View,
    Modal, TouchableOpacity, SafeAreaView
} from 'react-native';

import {ModalPicker} from './InsideEnterCoefficientPicker/ModalPicker'
import {Button} from "react-native-paper";


const EnterCoefficientPicker = (props) => {
    debugger;
    const [chooseData, setchooseData] = useState(props.results[props.route.params.itemId].coefficient ? props.results[props.route.params.itemId].coefficient.value : 'Select Item...');
    const [isModalVisible, setisModalVisible] = useState(false);

    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }

    const setData = (option) => {
        props.navigation.navigate('Редактировать проверку', {
            value: option,
            itemId: props.route.params.itemId,
            checkId: props.route.params.checkId})
    }

    /*const setData2 = (option) => {
        props.navigation.navigate('Создать проверку', {
            parentId:  props.route.params.parentId,
            checkId: props.route.params.checkId
        })
    }*/


    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
                style={styles.touchableOpacity}
            >
                {!!chooseData &&
                <Text style={styles.text}>{chooseData}</Text>
                }
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={()=>changeModalVisibility(false)}
            >
                <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                />
            </Modal>

        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1
    },
    text: {
        marginVertical: 8,
        fontSize: 25,
        textAlign: 'center',
        color: '#ffffff'
    },
    touchableOpacity: {
        width: '100%',
        backgroundColor: '#eb2d93',
        alignSelf: 'stretch',
        borderRadius: 10,
    }
});


export default EnterCoefficientPicker;