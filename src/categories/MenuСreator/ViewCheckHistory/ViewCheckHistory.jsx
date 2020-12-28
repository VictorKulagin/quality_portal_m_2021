import React from 'react'
import {TouchableOpacity, ScrollView, View, Text, StyleSheet, Button, SafeAreaView, FlatList, Alert, SectionList, VirtualizedList} from "react-native";
//import ScrollView from "react-native-web";
import { DataTable } from 'react-native-paper';
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import {LinearGradient} from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";

const ViewCheckHistory = (props) => {

debugger;

console.log(props.model);
    debugger;
    function GetTreeItems()
    {
       if (props.model !== null) {
           return props.model.map((value, index) => {
               debugger;
               return <>
                   <DataTable.Header style={styles.bgColor}>
                       <DataTable.Title numberOfLines={8}>
                           <Text key={index} style={[styles.bgColor, {fontSize: 16}]}

                                 onPress={() => props.navigation.navigate('Создать проверку', {
                                     parentId: value.company_id,
                                     checkId: value.id
                                 })}

                           >{value.date}</Text>
                       </DataTable.Title>
                       <DataTable.Title numberOfLines={8}>
                           <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.create_user}</Text>
                       </DataTable.Title>
                       <DataTable.Title numberOfLines={8}>
                           <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.rating}</Text>
                       </DataTable.Title>
                       <DataTable.Title numberOfLines={8}>
                           <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.create_date}</Text>
                       </DataTable.Title>
                       <DataTable.Title numberOfLines={8}>
                           <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.status.replace(/<span[^>]+?[^>]+>|<\/span>/isg, '')}</Text>
                       </DataTable.Title>

                               <TouchableOpacity onPress={() => props.navigation.navigate('Посмотреть историю проверок', {
                                   IdView: value.id,
                                   n: 1
                               })}>
                                   <LinearGradient
                                       colors={['#eb2d93', '#964c7e']}
                                       style={styles.signInDelete}
                                   >
                                       <Text style={styles.textSignDelete}>Удалить</Text>
                                       <MaterialIcons
                                           name="navigate-next"
                                           color="#fff"
                                           size={20}
                                       />
                                   </LinearGradient>
                               </TouchableOpacity>

                     
                   </DataTable.Header>
               </>
            })
       }
        return null
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <DataTable style={{paddingTop: 20}}>

                        <DataTable.Header style={styles.bgColor}>
                            <DataTable.Title numberOfLines={8}>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>Дата проверки</Text>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>ФИО проверяющего</Text>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>Оценка</Text>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>Дата изменения</Text>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>Статус</Text>
                                <Text  style={[styles.bgColor, {fontSize: 16}]}>Удалить</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        <GetTreeItems/>
                    </DataTable>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
        // fontWeight: 'bold'
    },
    container: {
        //marginTop: StatusBar.currentHeight || 0,
        padding: 5,
        marginBottom: 40
    },
    signIn: {
        backgroundColor: '#ffedad',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,

        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    signInDelete: {

        padding: 1,
    },
    textSign: {
        fontSize: 22
    },
    textSignDelete: {
        fontSize: 15
    },
    tableWorld: {

    },
    bgColor: {

        backgroundColor: '#ffffff',
    },
    viewStatus: {
        width: '100%',
        height: 10
    },
    dataTableRow: {
        paddingHorizontal: 0,
    },
    dataTableCell: {
        paddingHorizontal: 16,
        paddingVertical: 10,

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'flex-end',

    },
    dataTableCellText: {
        // whiteSpace: 'pre-wrap'
        // ...(Platform.OS === 'web'
        //     ? {
        //         whiteSpace: 'pre-wrap',
        //         alignSelf: 'center',
        //     }
        //     : null),
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    right: {
        justifyContent: 'flex-end',
    },
});

export default ViewCheckHistory;