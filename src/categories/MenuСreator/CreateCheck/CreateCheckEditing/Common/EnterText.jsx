import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Platform, Picker, Alert, Button } from "react-native";
import {StyleSheet} from "react-native";
import {DataTable} from "react-native-paper";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import ReactNativePickerModule from "react-native-picker-module"


//import ImagePicker from 'react-native-image-crop-picker';

//import styles from "react-native-webview/lib/WebView.styles";
//import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImagePicker from 'expo-image-picker';
//import ReactNativePickerModule from "react-native-picker-module";
    const UselessTextInput = (props) => {
        return (
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                maxLength={400}
            />
        );
    }


const EnterText = (props) => {
            debugger;
            console.log(props);
            const [value, onChangeText] = React.useState((props.results[props.route.params.itemId].text) ? AbraCadabra() :  AbraCadabra2() );

            function AbraCadabra(){
              return (props.results[props.route.params.itemId].text) ? props.results[props.route.params.itemId].text.text : 'Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9'
            }
debugger;
            function AbraCadabra2(){
                 return (props.data.model && props.data.model.item_id === props.route.params.itemId ) ? props.data.model.text : "Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9"
            }
            return (
                <View
                    style={{
                        backgroundColor: value,
                        borderBottomColor: '#000000',
                        borderBottomWidth: 1,
                    }}>
                    <UselessTextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />

                    <TouchableOpacity style={styles.commandButton}
                                      onPress={
                                          () => props.navigation.push('Редактировать проверку', {
                                              value: value,
                                              itemId: props.route.params.itemId,
                                              checkId: props.route.params.checkId,
                                              //parentId: props.route.params.parentId
                                          })}
                    >
                        <Text style={{color: '#ffffff'}}>Отправить</Text>
                    </TouchableOpacity>
                </View>
            );
            return null;
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 800
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#eb2d93',
        alignItems: 'center',
        marginTop: 10,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#eb2d93',
        alignItems: 'center',
        marginTop: 10,
        textAlign: 'center'
    },

      baseText: {
        fontFamily: "Cochin"
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold"
      }

})


export default EnterText;