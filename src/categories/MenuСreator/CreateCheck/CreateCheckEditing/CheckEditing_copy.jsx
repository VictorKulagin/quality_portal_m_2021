import React, {useState} from 'react'
import {View, Image, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Dimensions, Platform, Picker, Alert, Button } from "react-native";
import {StyleSheet} from "react-native";
import {DataTable} from "react-native-paper";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  EnterComments from '../CreateCheckEditing/Common/EnterComments'



//import ImagePicker from 'react-native-image-crop-picker';

//import styles from "react-native-webview/lib/WebView.styles";
//import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImagePicker from 'expo-image-picker';
import EnterCoefficient from "./Common/EnterCoefficient";
//import ReactNativePickerModule from "react-native-picker-module";
//import Gallery from 'react-native-gallery';




const CheckEditing = (props) => {

    const width = Dimensions.get('window').width;
    const height = width * 100 / 180;
    console.log(width + " | " + height);

    function EnterPictures() {
        const [active, setActive] = useState(0);
        console.log(active);
        const change = ({nativeEvent}) => {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide !== active){
                setActive(slide);
            }
        }
        if(props.results !== undefined && props.results[props.route.params.itemId].files !== undefined)
        {
                return (
                    <>
                        <View >
                            <ScrollView
                                pagingEnabled
                                horizontal
                                onScroll={change}
                                showsHorizontalScrollIndicator={false}
                                style={[styles.scroll, { width: width, height: height }]}>
                            {
                                props.results[props.route.params.itemId].files.map((value, index) => (

                                    <Image
                                        key={index}
                                        source={{uri: "http://109.73.14.239/upload/part1/" + value.file_name}}
                                        style={[styles.image, { width: width, height: height }]}
                                    />

                                ))
                            }
                            </ScrollView>
                            <View style={styles.pagination}>
                                {
                                    props.results[props.route.params.itemId].files.map((value, index) => (
                                        <Text key={index} style={index === active ? styles.pagingActiveText : styles.pagingText}><Icon name="brightness-1" size={15}/></Text>
                                    ))
                                }
                            </View>
                        </View>
                    </>
                )
        }
    }



    function GetTreeItems() {
        //const bs = React.createRef();

        const bs = React.useRef(null);
        const fall = new Animated.Value(1);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                exif: true,
                allowsEditing: false,
                quality: 0.7,
                base64: true
            });
            let base64 = result.uri;

            function base64ToFile(base64, name) {
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

                return new File(byteArrays, name, {type: mime});

            }
            function dataURLtoFile(dataurl, filename) {

                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                console.log({arr});

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, {type: mime});
            }
            const base64ImageContent = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

            console.log({base64});
            console.log({base64ImageContent});

            const file = base64ToFile(base64, '1.png');

            const formData = new FormData();
            formData.append('file', file);
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
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log(resultLaunch);
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
debugger;



            return props.tree.children.map((value, index) => {
                return (
                    <>

                        {(value.name !== undefined) ? value.children.map((value2, index2) => {
                            return (
                                <>
                                    {(value2.id == props.route.params.itemId) ?
                                        <View style={[styles.containerSlider, { width: width, height: height }]}>

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
                                                        <View style={{
                                                            height: 100,
                                                            width: width,
                                                            borderRadius: 15,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>

                                                            <ImageBackground
                                                                source={{
                                                                    //uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1200px-Approve_icon.svg.png'
                                                                }}
                                                                style={{ height: 50, width: width }}
                                                                imageStyle={{borderRadius: 15}}
                                                            >
                                                                <View style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Icon name="camera" size={55} color="#000" style={{
                                                                        opacity: 0.7,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderWidth: 1,
                                                                        borderColor: '#000',
                                                                        borderRadius: 10,
                                                                    }}/>
                                                                </View>
                                                            </ImageBackground>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </Animated.View>


                                            <View>
                                                <View>
                                                    <EnterPictures />
                                                </View>
                                                <View>
                                                    <Text>{value2.name}</Text>
                                                </View>
                                                <View style={{padding: 20}}>
                                                    <EnterComments {...props}/>
                                                </View>
                                            </View>

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
        height: 1024
    },
    containerSlider: {
        marginTop: 0,
    },
    scroll: {},
    image: { resizeMode: 'cover' },
    pagination: {flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center'},
    pagingText: {color: '#888', margin: 3},
    pagingActiveText: {color: '#fff', margin: 3},
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
