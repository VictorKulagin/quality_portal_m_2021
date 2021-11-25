import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    useWindowDimensions,
    SafeAreaView,
    StyleSheet, Dimensions, TouchableOpacity, Modal, Animated, Button
} from "react-native";

//import Modal from 'react-native-modal';

//import Zoom from './Zoom/Zoom'
import GridImage from './GridImage/GridImage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GestureHandlerRootView } from "react-native-gesture-handler";



import {PinchGestureHandler, PinchGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Zoom from "./Zoom/Zoom";

//import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';




debugger;

const AnimatedImage = Animated.createAnimatedComponent(Image);

const EnterPictures = (props) => {

    debugger;

    /*useEffect( () => {
        console.log('SYNC')
        console.log(props.results[props.route.params.itemId].files.length + "TEST");
    }, [props.results[props.route.params.itemId].files.length])*/

    const { width: deviceWidth } = useWindowDimensions()
    const { height: deviceHeight } = useWindowDimensions()

    console.log(deviceWidth + " deviceWidth");
    console.log(deviceHeight + " deviceHeight");

    const deviceWidth33 = deviceWidth * 33.3/100;
    const deviceHeight33 = deviceHeight * 33.3/100;

    console.log(deviceWidth33 + " deviceWidth33");
    console.log(deviceHeight33 + " deviceHeight33");


   const [modalWindow, setModalWindow] = useState(false);
   const [modalFile, setModalFile] = useState(() => null);
   function ScreenHeightPercentage (deviceHeight, percent = 20) {
           return deviceHeight * percent/200
   }

   function renderImage(width_, height_/*{ scale, translateX, translateY}*/) {
       return (

               <Animated.Image

                   source={{uri: "http://109.73.14.239/upload/part1/" + modalFile}}

                   style={[{
                       width: width_/*deviceWidth/0.9*/,
                       height: height_/*deviceHeight/2*/,
                       marginTop: ScreenHeightPercentage(deviceHeight),
                   }
                  ]}
               />

       )
   }

    debugger;
    if (props.results !== undefined && props.results[props.route.params.itemId].files !== undefined) {
        debugger;
        return (
            <>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            props.results[props.route.params.itemId].files.map((value, index) => (
                                <View>
                                    <Modal visible={modalWindow}>
                                        <SafeAreaView style={{flex: 1}}>
                                            <Icon  name="window-close" size={32} color='#eb2d93'
                                                   onPress={ () => setModalWindow(false) }
                                            />
                                            <Zoom
                                                renderImage={renderImage}
                                            />
                                        </SafeAreaView>
                                   </Modal>

                                    <Icon key={value.id} name="delete" size={32} color='#eb2d93'
                                          onPress={ () => props.navigation.navigate('Редактировать проверку', {
                                                  itemId: value.item_id,
                                                  checkId: value.check_id,
                                                  resultId: value.id
                                              })
                                          }
                                          style={{
                                              position: 'absolute',
                                              opacity: 0.8,
                                              right: 10,
                                              borderColor: '#eb2d93',
                                              //borderRadius: 12,
                                              zIndex: 10
                                          }}
                                    />

                                    <Icon key={Math.random().toString(36).substr(2, 9)} name="magnify-plus" size={32} color='#eb2d93'
                                          onPress={ () => {
                                              setModalWindow(true)
                                              setModalFile((actual) => actual = value.file_name)
                                          }}
                                          style={{
                                              position: 'absolute',
                                              opacity: 0.8,
                                              //right: 10,
                                              borderColor: '#eb2d93',
                                              //borderRadius: 12,
                                              top: '50%',
                                              left: '50%',
                                              transform: [
                                                  {translateX: -10},
                                                  {translateY: -10},
                                              ],
                                              zIndex: 10
                                          }}
                                    />

                                    <Image
                                            key={Math.random().toString(36).substr(2, 9)}
                                            source={{uri: "http://109.73.14.239/upload/part1/" + value.file_name}}
                                            style={{
                                                width: deviceWidth33-15,
                                                height: deviceWidth33-15,
                                                marginTop: '1%',
                                                marginBottom: '1%',
                                                marginRight: '1%',
                                                aspectRatio: 1,
                                            }}
                                        />
                                </View>
                                //      : []
                            ))
                        }

                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {},
    image: {resizeMode: 'cover'},
    pagination: {flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center'},
    pagingText: {color: '#eb2d93', margin: 3},
    pagingActiveText: {color: '#fff', margin: 3},
})


export default React.memo(EnterPictures);


