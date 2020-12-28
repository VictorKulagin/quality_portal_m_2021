import React from 'react';
import {TouchableOpacity, StyleSheet, Text, SectionList, SafeAreaView, FlatList, View} from 'react-native';
import Constants from "expo-constants";
//import { Actions } from 'react-native-router-flux';

//debugger;
let _Categories  = (props) => {

return (
    <View style={styles.item}>
        <Text style={styles.title}>_Categories</Text>
    </View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});


export default _Categories;