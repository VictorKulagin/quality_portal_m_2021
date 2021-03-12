import React, {useState} from 'react'
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
    Picker,
    Alert,
    Button
} from "react-native";
import {StyleSheet} from "react-native";
import {DataTable} from "react-native-paper";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EnterComments from '../CreateCheckEditing/Common/EnterComments'

import * as ImagePicker from 'expo-image-picker';

import EnterPictures from "./Common/EntetPictures";
import EnterCoefficientPicker from "./Common/EnterCoefficientPicker";
import FileGetContents from "./Common/FileGetContents/base64ToFile";
import file_get_contents from "./Common/FileGetContents/base64ToFile";
import base64ToFile from "./Common/FileGetContents/base64ToFile";


const CheckEditing = (props) => {

    function GetTreeItems() {

        const bs = React.useRef(null);
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
                debugger;
                const response = await fetch(base64);
                const blob = await response.blob();
                const namePhone = blob._data.name;
                const typeIm = blob._data.type


                const base64Phone = `data:${typeIm};base64,${result.base64}`;

                console.log({base64Phone});


                // base64ToFile(base64Phone, namePhone)
                // const base64ImageContent = base64Phone.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                // const arr = base64Phone.split(','),
                //     mime = arr[0].match(/:(.*?);/)[1],
                //     ext = arr[0].match(/:image\/(.*?);/)[1];
                //
                // const file = base64ToFile(base64Phone, 'filename.' + ext);

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

            // base64ToFile(base64, name)

            // const base64ImageContent = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            // const arr = base64.split(','),
            //     mime = arr[0].match(/:(.*?);/)[1],
            //     ext = arr[0].match(/:image\/(.*?);/)[1];

            // const file = base64ToFile(base64, 'filename.' + ext);
            console.log({base64});

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
            debugger;
            let resultLaunch = await ImagePicker.launchCameraAsync({
                // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // exif: true,
                // allowsEditing: true,
                // aspect: [4, 3],
                // quality: 0.5,
                // base64: true
                exif: true,
                allowsEditing: false,
                quality: 0.7,
                base64: true
            });
            debugger;

            //let base64 = result.uri;
            // console.log(resultLaunch.uri);

            let base64 = resultLaunch.uri

            console.log(resultLaunch);

            if ((Platform.OS === 'ios' || Platform.OS === 'android')) {
                debugger;
                const response = await fetch(base64);
                const blob = await response.blob();
                const namePhone = blob._data.name;
                const typeIm = blob._data.type
                debugger;

                const base64Phone = `data:${typeIm};base64,${resultLaunch.base64}`;
                // base64ToFile(base64Phone, namePhone)
                // const base64ImageContent = base64Phone.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                // const arr = base64Phone.split(','),
                //     mime = arr[0].match(/:(.*?);/)[1],
                //     ext = arr[0].match(/:image\/(.*?);/)[1];

                // const file = base64ToFile(base64Phone, 'filename.' + ext);
                debugger;

                const formData = new FormData();

                formData.append('file', base64Phone);
                formData.append('itemId', props.route.params.itemId);
                formData.append('checkId', props.route.params.checkId);
                debugger;

                return {
                    pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                        formData
                    })
                };

            }

            // base64ToFile(base64, name)
            //
            // const base64ImageContent = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            // const arr = base64.split(','),
            //     mime = arr[0].match(/:(.*?);/)[1],
            //     ext = arr[0].match(/:image\/(.*?);/)[1];

            // const file = base64ToFile(base64, 'filename.' + ext);

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





        const takePhotoFromCamera = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
            });
        }
        const choosePhotoFromLibrary = () => {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image);
            });
        }


        if (props.tree.children !== undefined) {
            const [valueText, setText] = useState('');

            const HandleInputChange = event => setText(event.nativeEvent.text);


            const renderInner = () => (
                <View style={styles.panel}>
                    {/*<View>
                        <Text> {'itemId '}{props.route.params.itemId} {'\\'} {'checkId '}{props.route.params.checkId} </Text>
                    </View>*/}
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.panelTitle}>Загрузить фото</Text>
                        <Text style={styles.panelSubtitle}>Выберете фотографии</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton} /*onPress={takePhotoFromCamera}*/
                                      onPress={pickImageAllow}>
                        <Text style={styles.panelButtonTitle}>Сфотографировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} /*onPress={choosePhotoFromLibrary}*/
                                      onPress={pickImage}>
                        <Text style={styles.panelButtonTitle}>Галерея</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                        <Text style={styles.panelButtonTitle}>Отменить</Text>
                    </TouchableOpacity>
                </View>
            );

            const renderHeader = () => (
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <View style={styles.panelHandle}/>
                    </View>
                </View>
            );

            const bs = React.createRef()
            const fall = new Animated.Value(1);
            debugger;


            return props.tree.children.map((value, index) => {
                return (
                    <>

                        {(value.name !== undefined) ? value.children.map((value2, index2) => {
                            return (
                                <>
                                    {(value2.id == props.route.params.itemId) ?

                                        <View>
                                            <View>
                                                {!!props.results[props.route.params.itemId].files &&
                                                <View>
                                                    <EnterPictures {...props}/>
                                                </View>
                                                }
                                                <View>
                                                    <Text
                                                        style={{paddingLeft: 10, paddingRight: 10}}>{value2.name}</Text>
                                                </View>
                                                <View style={{padding: 10}}>
                                                    <EnterComments {...props}/>
                                                </View>
                                                <View style={{padding: 10}}>
                                                    <EnterCoefficientPicker {...props}/>
                                                </View>
                                            </View>

                                            <BottomSheet
                                                ref={bs}
                                                snapPoints={[330, 0, 0]}
                                                renderContent={renderInner}
                                                renderHeader={renderHeader}
                                                initialSnap={1}
                                                callbackNode={fall}
                                                enabledGestureInteraction={true}
                                            />
                                            <Animated.View style={{
                                                margin: 0,
                                                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                                            }}>
                                                <View style={{alignContent: 'center'}}>
                                                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                                        <View /*style={{
                                                            height: 200,
                                                            borderRadius: 15,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}*/
                                                            style={styles.touchableOpacity}
                                                        >

                                                            <ImageBackground
                                                                source={
                                                                    {/*uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1200px-Approve_icon.svg.png'*/}
                                                                }
                                                                style={{height: 10, /*width: width*/}}
                                                                imageStyle={{borderRadius: 15}}
                                                            >
                                                                <View style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Icon name="camera" size={35} color="#ffffff"
                                                                          style={{
                                                                              opacity: 0.9,
                                                                              alignItems: 'center',
                                                                              justifyContent: 'center',
                                                                              //borderWidth: 1,
                                                                              borderColor: '#ffffff',
                                                                              borderRadius: 10,
                                                                          }}/>
                                                                </View>
                                                            </ImageBackground>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </Animated.View>
                                        </View>
                                        : []}
                                </>
                            )
                        }) : []}
                    </>
                )
            })
        }
        return null
    }

    return (
        <View style={styles.container}>
            <GetTreeItems/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchableOpacity: {
        //width: '100%',
        backgroundColor: '#eb2d93',
        alignSelf: 'stretch',
        borderRadius: 10,
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
        borderRadius: 10,
        backgroundColor: '#eb2d93',
        alignItems: 'center',
        marginTop: 10,
        textAlign: 'center'
    }
})

export default CheckEditing;
