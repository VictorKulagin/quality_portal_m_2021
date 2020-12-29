import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import {DataTable} from "react-native-paper";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import ImagePicker from 'react-native-image-crop-picker';

//import styles from "react-native-webview/lib/WebView.styles";
//import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImagePicker from 'expo-image-picker';

const CheckEditing = (props) => {

    debugger;
    function EnterText () {
        debugger;
        /*if (props.results[props.route.params.itemId].text !== undefined) {
            return (
                <>
                    <View>
                        <Text>{props.results[props.route.params.itemId].text.text}</Text>
                    </View>
                </>
            )
        }*/
        if (props.data.result === "success" && props.data.model.item_id === props.route.params.itemId) {
            return (
                <>
                    <View>
                        <Text>{ props.data.model.text }</Text>
                    </View>
                </>
            )
        } else {
            return (
                <>
                    <View>
                        <Text>{(props.results[props.route.params.itemId].text) ? props.results[props.route.params.itemId].text.text : []}</Text>
                    </View>
                </>
            )
        }

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

            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

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


            return {
                pickImageChoose: props.navigation.navigate('Редактировать проверку', {
                    // formDataImg: result.uri,
                    formDataImg: {uri: localUri, name: filename, type},
                    itemId: props.route.params.itemId,
                    checkId: props.route.params.checkId
                })
            };

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
                                                <Text>
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
                                                    />
                                                </View>
                                                <EnterText/>
                                                <View>
                                                    {/*<Text>{'value'}{' : '}{valueText}{'/'}{'itemId'}{' : '}{value2.id}{'/'}{'checkId'}{' : '}{props.check.id}</Text>*/}
                                                    {/*props.results.data.model.text*/}
                                                </View>



                                                <TouchableOpacity style={styles.commandButton}
                                                                  onPress={() => props.navigation.navigate('Редактировать проверку', {
                                                                      value: valueText,
                                                                      itemId: value2.id,
                                                                      checkId: props.check.id,

                                                                      //parentId: props.route.params.parentId
                                                                  })}
                                                >
                                                    <Text style={{color: '#ffffff'}}>Отправить</Text>
                                                </TouchableOpacity>
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
