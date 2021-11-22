import React, {useEffect, useState} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Text,
    SafeAreaView,
    Picker
} from "react-native";
import {StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const UselessTextInput = (props) => {
    return (

        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={500}
            style={styles.enterInput}
            onSubmitEditing={Keyboard.dismiss}
            numberOfLines={4}
        />

    );
}

const EnterComments = (props) => {
    if (JSON.stringify(props.results) !== "{}" && props.results !== undefined) {
        const [valueText, onChangeText] = React.useState(Notes); //() => {return}

        function Notes() {
            return props.results[props.route.params.itemId].text !== undefined ? props.results[props.route.params.itemId].text.text : []
        }

        /*useEffect(() => {
            Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.addListener("keyboardDidHide", _keyboardDidHide);


            return () => {
                Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
                Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
            };
        }, []);*/

        /*const [keyboardStatus, setKeyboardStatus] = useState(undefined);
        const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
        const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");*/

        const {container, redView, blueView} = styles;
        const buttonDisabled = 'disabled';
        return (
            <SafeAreaView style={container}>
                <View style={blueView}>
                    <TouchableOpacity style={styles.commandButtonHidden}
                                      disabled={valueText.length === 0 ? buttonDisabled : ''}
                                      onPress={
                                          () => props.navigation.push('Редактировать проверку', {
                                              valueText: "",
                                              itemId: props.route.params.itemId,
                                              checkId: props.route.params.checkId,
                                          })}
                    >
                        <Icon name="delete" size={28} color="#ffffff"
                              style={{
                                  opacity: 0.9,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderColor: '#ffffff',
                                  borderRadius: 0,
                              }}/>
                    </TouchableOpacity>
                </View>


                <View style={redView}>
                    <UselessTextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={text => {
                            onChangeText(text)
                        }}
                        value={valueText}
                        placeholder='Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9'
                    />
                </View>

                <View style={blueView}>
                    <TouchableOpacity style={styles.commandButtonHidden}
                                      disabled={valueText.length === 0 ? buttonDisabled : ''}
                                      onPress={
                                          () => props.navigation.navigate('Редактировать проверку', {
                                              valueText: valueText,
                                              itemId: props.route.params.itemId,
                                              checkId: props.route.params.checkId,
                                          })}
                    >
                        <Icon name="send" size={28} color="#ffffff"
                              style={{
                                  opacity: 0.9,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  //borderWidth: 1,
                                  borderColor: '#ffffff',
                                  borderRadius: 0,
                              }}/>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
        return null;
    } else {
        return null;
    }

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    redView: {
        width: '65%',
        padding: 1
    },
    blueView: {
        width: '15%',
        paddingTop: 20,
        paddingBottom: 21,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 0,
        backgroundColor: '#eb2d93',
        alignItems: 'flex-start',
    },
    textInput: {
        paddingLeft: 10,
        color: '#05375a',
    },
    commandButton: {
        padding: 15,
        borderRadius: 0,
        backgroundColor: '#eb2d93',
        alignItems: 'center',
        marginTop: 90,
        display: 'none'
    },
    commandButtonHidden: {
        backgroundColor: '#eb2d93',
        alignItems: 'flex-start',

    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
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
        borderRadius: 0,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
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
        borderRadius: 0,
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
    },
    enterInput: {
        color: '#000',
        borderColor: '#eb2d93',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 0,
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 2
    }

})

export default React.memo(EnterComments);