import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Platform,
    Picker, SafeAreaView, ScrollView, Modal, TouchableHighlight/*, StatusBar*/
} from "react-native";
import {StyleSheet} from "react-native";
import {ActivityIndicator, Colors, DataTable} from "react-native-paper";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EnterComments from '../CreateCheckEditing/Common/EnterComments'

import * as ImagePicker from 'expo-image-picker';

import EnterPictures from "./Common/EntetPictures";
import EnterCoefficientPicker from "./Common/EnterCoefficientPicker";
import {ModalPicker} from "./Common/InsideEnterCoefficientPicker/ModalPicker";


const CheckEditing = (props) => {

    debugger;
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const changeModalVisibility = (bool) => {
        setIsModalVisible2(bool)
    }

    const {width} = Dimensions.get('window');
    const {height} = Dimensions.get('window');

    function GetTreeItems() {
        const bs = React.createRef(null);
        const fall = new Animated.Value(1);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                exif: true,
                allowsEditing: false,
                quality: 0.7,
                base64: true

            });

            console.log(result);

            let base64 = result.uri;

            /*Define OS*/
            if ((Platform.OS === 'ios' || Platform.OS === 'android')) {
                const response = await fetch(base64);
                const blob = await response.blob();
                const namePhone = blob._data.name;
                const typeIm = blob._data.type


                const base64Phone = `data:${typeIm};base64,${result.base64}`;

                const formData = new FormData();

                formData.append('file', base64Phone);
                formData.append('itemId', props.route.params.itemId);
                formData.append('checkId', props.route.params.checkId);

                return {
                    pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                        formData
                    })
                };

            }

            const formData = new FormData();
            formData.append('file', base64);
            formData.append('itemId', props.route.params.itemId);
            formData.append('checkId', props.route.params.checkId);

            return {
                pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                    formData
                })
            };

        };

        const pickImageAllow = async () => {
            let resultLaunch = await ImagePicker.launchCameraAsync({
                exif: true,
                allowsEditing: false,
                quality: 0.7,
                base64: true
            });
            let base64 = resultLaunch.uri

            if ((Platform.OS === 'ios' || Platform.OS === 'android')) {
                const response = await fetch(base64);
                const blob = await response.blob();
                const namePhone = blob._data.name;
                const typeIm = blob._data.type

                const base64Phone = `data:${typeIm};base64,${resultLaunch.base64}`;
                const formData = new FormData();

                formData.append('file', base64Phone);
                formData.append('itemId', props.route.params.itemId);
                formData.append('checkId', props.route.params.checkId);

                return {
                    pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                        formData
                    })
                };

            }

            const formData = new FormData();
            formData.append('file', base64);
            formData.append('itemId', props.route.params.itemId);
            formData.append('checkId', props.route.params.checkId);

            return {
                pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                    formData
                })
            };

        };

        if (props.tree.children !== undefined) {
            const [valueText, setText] = useState('');
            const HandleInputChange = event => setText(event.nativeEvent.text);
            /*const renderInner = () => (
                <View style={styles.panel}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.panelTitle}>Загрузить фото</Text>
                        <Text style={styles.panelSubtitle}>Выберете фотографии</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton}
                                      onPress={pickImageAllow}>
                        <Text style={styles.panelButtonTitle}>Сфотографировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}
                                      onPress={pickImage}>
                        <Text style={styles.panelButtonTitle}>Галерея</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                        <Text style={styles.panelButtonTitle}>Отменить</Text>
                    </TouchableOpacity>
                </View>
            );*/

            const renderHeader = () => (
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <View style={styles.panelHandle}/>
                    </View>
                </View>
            );

            const bs = React.createRef()
            const fall = new Animated.Value(1);

            return props.tree.children.map((value, index) => {
                return (
                    <View key={Math.random().toString(36).substr(2, 9)}>
                        {(value.name !== undefined) ? value.children.map((value2, index2) => {

                            return (
                                <View key={Math.random().toString(36).substr(2, 9)}>
                                    {(value2.id == props.route.params.itemId) ?
                                        <View>
                                            <View>
                                                <Text /*numberOfLines={2}*/
                                                    style={{
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        paddingBottom: '0.5%',
                                                        paddingTop: '1%'
                                                    }}>{value2.name}</Text>
                                            </View>
                                            {/*!!props.results[props.route.params.itemId].files &&*/

                                            <View style={{
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingBottom: '1%',
                                                paddingTop: '1%',
                                            }}>
                                                <EnterPictures {...props}/>
                                            </View>
                                            }
                                            {
                                                props.results[props.route.params.itemId].files === undefined &&
                                                <View style={{alignItems: 'center'}}>
                                                    <MaterialIcons
                                                        name="no-photography"
                                                        color="#fff"
                                                        size={280}
                                                    />
                                                </View>
                                            }
                                            <View style={{
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingBottom: '10%',
                                                paddingTop: '1%'
                                            }}>
                                                <EnterComments {...props}/>
                                            </View>


                                            <View style={{
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingBottom: '10%',
                                                paddingTop: '1%',
                                            }}>
                                                <EnterCoefficientPicker {...props}/>
                                            </View>

                                            {/*<BottomSheet
                                                ref={bs}
                                                snapPoints={[530, '-10%', 0, 0]}
                                                renderContent={renderInner}
                                                renderHeader={renderHeader}
                                                initialSnap={1}
                                                callbackNode={fall}
                                                enabledGestureInteraction={true}
                                            />*/}
                                            <Animated.View style={{
                                                margin: 0,
                                                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                                            }}>



                                                {/*<View style={{alignContent: 'center'}}>
                                                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                                        <View style={styles.touchableOpacity}>
                                                            <ImageBackground
                                                                source={
                                                                    {}
                                                                }
                                                                style={{height: 25}}
                                                                imageStyle={{borderRadius: 0}}
                                                            >
                                                                <View style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Icon name="camera" size={45} color="#ffffff"
                                                                          style={{
                                                                              opacity: 0.9,
                                                                              alignItems: 'center',
                                                                              justifyContent: 'center',
                                                                              borderColor: '#ffffff',
                                                                              borderRadius: 0,
                                                                          }}/>
                                                                </View>
                                                            </ImageBackground>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>*/}


                                                <SafeAreaView style={styles.containerButt}>
                                                   <TouchableOpacity
                                                    onPress={() => changeModalVisibility(true)}
                                                    style={styles.touchableOpacityButt}
                                                   >
                                                       <View style={styles.touchableOpacity}>
                                                           <ImageBackground
                                                               source={
                                                                   {}
                                                               }
                                                               style={{height: 25}}
                                                               imageStyle={{borderRadius: 0}}
                                                           >
                                                               <View style={{
                                                                   flex: 1,
                                                                   justifyContent: 'center',
                                                                   alignItems: 'center'
                                                               }}>
                                                                   <Icon name="camera" size={45} color="#ffffff"
                                                                         style={{
                                                                             opacity: 0.9,
                                                                             alignItems: 'center',
                                                                             justifyContent: 'center',
                                                                             borderColor: '#ffffff',
                                                                             borderRadius: 0,
                                                                         }}/>
                                                               </View>
                                                           </ImageBackground>
                                                       </View>
                                                   </TouchableOpacity>
                                                    <Modal
                                                        transparent={true}
                                                        animationType='fade'
                                                        visible={isModalVisible2}
                                                        onRequestClose={() => changeModalVisibility(false)}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => changeModalVisibility(false)}
                                                            style={styles.containerButt}
                                                        >
                                                            <View style={[styles.modal, {width: width - 20, height: height/2}]}>
                                                                <ScrollView>
                                                                    <View style={styles.panel}>
                                                                        <View style={{alignItems: 'center'}}>
                                                                            <Text style={styles.panelTitle}>Загрузить фото</Text>
                                                                            <Text style={styles.panelSubtitle}>Выберете фотографии</Text>
                                                                        </View>
                                                                        <TouchableOpacity style={styles.panelButton}
                                                                                          onPress={pickImageAllow}>
                                                                            <Text style={styles.panelButtonTitle}>Сфотографировать</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity style={styles.panelButton}
                                                                                          onPress={pickImage}>
                                                                            <Text style={styles.panelButtonTitle}>Галерея</Text>
                                                                        </TouchableOpacity>
                                                                        {/*<TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                                                                            <Text style={styles.panelButtonTitle}>Отменить</Text>
                                                                        </TouchableOpacity>*/}
                                                                    </View>
                                                                </ScrollView>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </Modal>
                                                </SafeAreaView>

                                            </Animated.View>
                                        </View>
                                        : []}
                                </View>
                            )
                        }) : []}
                    </View>
                )
            })
        }
        return null
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <GetTreeItems/>
                <View>
                    {props.isFetching ?
                        <View style={{
                            position: 'absolute',
                            top: -height / 1.8,
                            left: width / 2,
                        }}>
                            <ActivityIndicator animating={true} color={Colors.pink500}/>
                        </View> : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    /*container: {
        flex: 1,
    },*/
    container: {
        flex: 1,
        width: '100%'
        /*paddingTop: StatusBar.currentHeight,*/
    },

    /**ButtCamera**/
    containerButt: {
      flex: 1,
      //backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      //padding: 20
    },
    touchableOpacityButt: {
        //backgroundColor: 'orange',
        alignSelf: 'stretch',
        //paddingHorizontal: 20
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start'
    },
    text: {
      marginVertical: 20,
      fontSize: 25
    },
    /**EndButtCamera**/

    scrollView: {
        /*backgroundColor: 'pink',*/
        marginHorizontal: 5,
    },
    touchableOpacity: {
        backgroundColor: '#eb2d93',
        alignSelf: 'stretch',
        borderRadius: 0,
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    containerSlider: {
        marginTop: 0,
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
        padding: 40,
        backgroundColor: '#FFFFFF',
        paddingTop: 60,
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
    /*Modal Window*/

    centeredView: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default CheckEditing;