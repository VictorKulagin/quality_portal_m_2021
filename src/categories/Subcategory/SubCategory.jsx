import React, {useEffect} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Button, SafeAreaView, FlatList, Alert} from "react-native";


const SubCategory = (props) => {

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

                        onPress={() => props.navigation.navigate((item.parent_id !== 3) ? "Меню создатель" : "Третья категория", {
                            name: item,
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
                            borderColor: 'white',

                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#ffffff',
                        }]}>{item.title}</Text>
                    </TouchableOpacity>
                )
                //Alert.alert(props.parent_id);
            }}
        />
    </SafeAreaView>

    )
}


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


export default SubCategory;