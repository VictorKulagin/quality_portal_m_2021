import React from 'react';
import {
    TouchableOpacity,
    Button,
    StyleSheet,
    Text,
    SectionList,
    SafeAreaView,
    FlatList,
    View,
    StatusBar
} from 'react-native';
import Constants from "expo-constants";
//import { Actions } from 'react-native-router-flux';


debugger;

const Categories = (props) => {
    debugger;
    //if(props.paramToken === "null") {
        //props.navigation.navigate("SignInScreenContainer");
        //console.log("null===");
    //}

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.categories}
                numColumns={2}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => {
                    //debugger;
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Подкатегории", {
                                name: item
                            })}
                            style={[styles.signIn, {
                                //borderColor: '#eb2d93',
                                borderWidth: 0,
                                marginTop: 5,
                                marginRight: 5,
                                width: '50%',
                                height: 180,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 0,
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#ffffff',
                            }]}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight || 0,

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginBottom: 40
    },
    signIn: {
        backgroundColor: '#eb2d93',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,

        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    textSign: {
        fontSize: 22
    },
});

export default Categories;