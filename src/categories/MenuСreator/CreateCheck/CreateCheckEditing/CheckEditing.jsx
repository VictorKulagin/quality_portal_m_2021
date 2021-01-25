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
import  EnterText from '../CreateCheckEditing/Common/EnterText'

//import ImagePicker from 'react-native-image-crop-picker';

//import styles from "react-native-webview/lib/WebView.styles";
//import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImagePicker from 'expo-image-picker';
//import ReactNativePickerModule from "react-native-picker-module";


const CheckEditing = (props) => {




    debugger;
    function EnterCoefficient () {
        debugger;
        const [selectedValue, setSelectedValue] = useState("1");

        const pickerActivity = (selectedValue) =>{
            setSelectedValue(selectedValue)
            alert(selectedValue);
            props.navigation.navigate('Редактировать проверку', {
                value: selectedValue,
                itemId: props.route.params.itemId,
                checkId: props.route.params.checkId
            })
        }

        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => pickerActivity(itemValue)}
                >
                    <Picker.Item label="0.5" value="0.5" />
                    <Picker.Item label="0.55" value="0.55" />
                    <Picker.Item label="0.6" value="0.6" />
                    <Picker.Item label="0.65" value="0.65" />
                    <Picker.Item label="0.7" value="0.7" />
                    <Picker.Item label="0.75" value="0.75" />
                    <Picker.Item label="0.8" value="0.8" />
                    <Picker.Item label="0.85" value="0.85" />
                    <Picker.Item label="0.9" value="0.9" />
                    <Picker.Item label="0.95" value="0.95" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="1.1" value="1.1" />
                    <Picker.Item label="1.2" value="1.2" />
                    <Picker.Item label="1.3" value="1.3" />
                    <Picker.Item label="1.4" value="1.4" />
                    <Picker.Item label="1.5" value="1.5" />
                    <Picker.Item label="1.6" value="1.6" />
                    <Picker.Item label="1.7" value="1.7" />
                    <Picker.Item label="1.8" value="1.8" />
                    <Picker.Item label="1.9" value="1.9" />
                    <Picker.Item label="2" value="2" />
                </Picker>
            </View>
        );

        return null;
    }






    function GetTreeItems() {
        //const bs = React.createRef();

        const bs = React.useRef(null);
        const fall = new Animated.Value(1);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                // mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                // aspect: [4, 3],
                // quality: 1,
                // base64: false

                exif: true,
                allowsEditing: false,
                quality: 0.7,
                base64: true
            });

            //let localUri = result.uri;
            let base64 = result.uri;
            // let filename = base64.split('/').pop();
            //
            // let match = /\.(\w+)$/.exec(filename);
            // let type = match ? `image/${match[1]}` : `image`;

            // function dataURItoBlob(dataURI) {
            //     if(typeof dataURI !== 'string'){
            //         throw new Error('Invalid argument: dataURI must be a string');
            //     }
            //     dataURI = dataURI.split(',');
            //     var type = dataURI[0].split(':')[1].split(';')[0],
            //         byteString = atob(dataURI[1]),
            //         byteStringLength = byteString.length,
            //         arrayBuffer = new ArrayBuffer(byteStringLength),
            //         intArray = new Uint8Array(arrayBuffer);
            //     for (var i = 0; i < byteStringLength; i++) {
            //         intArray[i] = byteString.charCodeAt(i);
            //     }
            //     return new Blob([intArray], {
            //         type: type
            //     });
            // }
            //
            // var blob = dataURItoBlob(result.uri);

            // let result = await ImagePicker.launchCameraAsync({
            //     allowsEditing: true,
            //     aspect: [4, 3],
            // });

            // console.log({result});
            // console.log({blob});
            // console.log({base64: result.base64});

            // let localUri = result.uri;
            // let filename = localUri.split('/').pop();
            //
            // // Infer the type of the image
            // let match = /\.(\w+)$/.exec(filename);
            // let type = match ? `image/${match[1]}` : `image`;

            // // Upload the image using the fetch and FormData APIs
            // let formData = new FormData();
            // // Assume "photo" is the name of the form field the server expects
            // formData.append('photo', { uri: localUri, name: filename, type });


            // console.log(result);

            function base64ToFile(base64, name)
            {
                mime = mime || '';
                var arr = base64.split(','),
                    mime = arr[0].match(/:(.*?);/)[1];

                base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

                console.log({mime});

                const sliceSize = 1024;
                const byteChars = window.atob(base64);
                const byteArrays = [];

                for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                    const slice = byteChars.slice(offset, offset + sliceSize);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new File(byteArrays, name,  {type: mime});
                // return new Blob(byteArrays, {type: mime});
                // return byteArrays;
            }

            function dataURLtoFile(dataurl, filename) {

                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                console.log({arr});

                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, {type:mime});
            }

            const base64ImageContent = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

            console.log({base64});
            console.log({base64ImageContent});

            const file = base64ToFile(base64, '1.jpeg');
            // const file = dataURLtoFile(base64, '1.jpg');

            const formData = new FormData();
            formData.append('file', file);
            formData.append('itemId', props.route.params.itemId);
            formData.append('checkId', props.route.params.checkId);

            return {
                pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                    formData
                })
            };

            // return {
            //     pickImageChoose: props.navigation.navigate('Редактировать проверку', {
            //         // formDataImg: result.uri,
            //         //formDataImg: {uri: localUri, name: filename, type},
            //         formDataImg: {uri: base64ToBlob, name: filename, type},
            //         itemId: props.route.params.itemId,
            //         checkId: props.route.params.checkId
            //     })
            // };

            /*if (!result.cancelled) {
                setImage(result.uri);
            }*/
        };

        const pickImageAllow = async () => {

            let resultLaunch = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(resultLaunch);

            /*if (!result.cancelled) {
                setImage(result.uri);
            }*/

        };

        /*const takePhotoFromCamera = () => {
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
        }*/

        if (props.tree.children !== undefined) {
            const [valueText, setText] = useState('');

            const HandleInputChange = event => setText(event.nativeEvent.text);

            ///console.log(props.data);
            const renderInner = () => (
                <View style={styles.panel}>
                    <View>
                        <Text> {'itemId '}{props.route.params.itemId} {'\\'} {'checkId '}{props.route.params.checkId} </Text>
                    </View>
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

            return props.tree.children.map((value, index) => {
                return (
                    <>
                        {/*<DataTable.Header style={styles.bgColor}>
                            <DataTable.Title numberOfLines={8}>
                                <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.name}</Text>
                            </DataTable.Title>
                        </DataTable.Header>*/}

                        {(value.name !== undefined) ? value.children.map((value2, index2) => {
                            return (
                                <>
                                    {(value2.id == props.route.params.itemId) ?
                                        <View style={styles.container}>

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
                                                margin: 20,
                                                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                                            }}>
                                                <View style={{alignContent: 'center'}}>
                                                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                                        <View style={{
                                                            height: 200,
                                                            width: 260,
                                                            borderRadius: 15,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            <ImageBackground
                                                                source={{
                                                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1200px-Approve_icon.svg.png'
                                                                }}
                                                                style={{height: 100, width: 100}}
                                                                imageStyle={{borderRadius: 15}}
                                                            >
                                                                <View style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Icon name="camera" size={35} color="#fff" style={{
                                                                        opacity: 0.7,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderWidth: 1,
                                                                        borderColor: '#fff',
                                                                        borderRadius: 10,
                                                                    }}/>
                                                                </View>
                                                            </ImageBackground>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                {/*<Text>
                                                    {value2.name}
                                                </Text>
                                                <View style={styles.action}>
                                                    <FontAwesome name="edit" size={35}/>
                                                    <TextInput
                                                        style={[styles.TextInput, {}]}
                                                        placeholder='(Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9)'
                                                        placeholderTextColor="#666666"
                                                        autoCorrect={false}
                                                        onChange={HandleInputChange}
                                                    />*/}

                                                <EnterText {...props}/>
                                                <View>
                                                    {/*<Text>{'value'}{' : '}{valueText}{'/'}{'itemId'}{' : '}{value2.id}{'/'}{'checkId'}{' : '}{props.check.id}</Text>*/}
                                                    {/*props.results.data.model.text*/}
                                                </View>
                                                <View style={{ margin: 40 }}>
                                                    <EnterCoefficient/>
                                                    <Text>1111</Text>
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
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <DataTable style={{paddingTop: 20}}>
                        <GetTreeItems/>
                    </DataTable>
                </ScrollView>
            </SafeAreaView>
        </View>
    )

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

})

export default CheckEditing;
