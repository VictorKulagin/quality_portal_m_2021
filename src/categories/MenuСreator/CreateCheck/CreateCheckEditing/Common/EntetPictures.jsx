import React, {useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image, StyleSheet, Dimensions
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EnterPictures = (props) => {
    const [active, setActive] = useState(0);
    const width = Dimensions.get('window').width;
    const height = width * 100 / 180;

    //console.log(active)
    const change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    if (props.results !== undefined && props.results[props.route.params.itemId].files !== undefined) {
        return (
            <>
                <View>
                    <ScrollView
                        pagingEnabled
                        horizontal
                        onScroll={change}
                        showsHorizontalScrollIndicator={false}
                        style={[styles.scroll, {width: width, height: height}]}>
                        {
                            props.results[props.route.params.itemId].files.map((value, index) => (

                                <Image
                                    key={index}
                                    source={{uri: "http://109.73.14.239/upload/part1/" + value.file_name}}
                                    style={[styles.image, {width: width, height: height}]}
                                />

                            ))
                        }
                    </ScrollView>
                    <View style={styles.pagination}>
                        {
                            props.results[props.route.params.itemId].files.map((value, index) => (
                                <Text key={index}
                                    style={index === active ? styles.pagingActiveText : styles.pagingText}><Icon
                                    name="brightness-1" size={15}/></Text>
                            ))
                        }
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {},
    image: {resizeMode: 'cover'},
    pagination: {flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center'},
    pagingText: {color: '#888', margin: 3},
    pagingActiveText: {color: '#fff', margin: 3},
})


export default EnterPictures;

