import React, {useState, useEffect} from 'react';
import {
    StyleSheet, Text, View,
    Modal, TouchableOpacity, SafeAreaView
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalPicker} from './InsideEnterCoefficientPicker/ModalPicker'

const EnterCoefficientPicker = (props) => {
    const [chooseData, setchooseData] = useState('Select Item...');
    const [isModalVisible, setisModalVisible] = useState(false);

    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }
    const setData = (option) => {
        setchooseData(option)
    }
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
                style={styles.touchableOpacity}
            >
                <Text style={styles.text}>{chooseData}</Text>
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
        flex: 1,
        padding: 20
    },
    text: {
        marginVertical: 20,
        fontSize: 25
    },
    touchableOpacity: {
        backgroundColor: 'orange',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginHorizontal: 20
    }
});


export default EnterCoefficientPicker;