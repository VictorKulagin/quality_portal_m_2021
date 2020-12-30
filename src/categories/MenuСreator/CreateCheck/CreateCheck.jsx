import React, {useState} from 'react'
import {
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableHighlight,
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
    Alert,
    SectionList,
    VirtualizedList,
    ImageBackground
} from "react-native";
//import ScrollView from "react-native-web";
import { DataTable } from 'react-native-paper';
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import TextInput from "react-native-web/dist/exports/TextInput";
import RenderInnerCamera from "../../../common/RenderInnerCamera";
import CheckEditing from "./CreateCheckEditing/CheckEditing";
import Animated from "react-native-reanimated";
//import TextInput from "react-native-web";

const CreateCheck = (props) => {

    console.log(props.results);
    console.log("--------");
    console.log(props.text);
    console.log("--------");
debugger;
    function GetTreeText({id}){
            if (props.results !== undefined) {
                    return (
                        <>
                            <View >
                                <Text >{(props.results[id].text) ? props.results[id].text.text : []}</Text>
                            </View>
                        </>
                    )
            }
            return null
    }

function GetTreeItems()
    {
        if (props.tree.children !== undefined) {
            //const [valueText, setText] = useState('');

            //const HandleInputChange = event => setText(event.nativeEvent.text);

            ///console.log(props.data);

            return props.tree.children.map((value, index) => {
                return (
                    <>
                        <DataTable.Header style={styles.bgColor}>
                            <DataTable.Title numberOfLines={8}>
                                <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.name}</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        {(value.name !== undefined) ? value.children.map((value2, index2) => {
                            return (
                                <DataTable.Row key={index2} style={styles.dataTableRow}>
                                    <TouchableRipple style={[styles.dataTableCell, {flexGrow: 3}]}>
                                        <Text style={{ /*flexGrow: 1*/}}>{value2.name} {/*(props.model !== null && props.model.item_id == value2.id ) ? props.model.text : ""*/}</Text>
                                    </TouchableRipple>

                                    <View key={index2}>

                                        {/*<TextInput
                                            style={styles.input}
                                            placeholder = '(Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9)'
                                            onChange={HandleInputChange}
                                         />*/}

                                        {/*<TouchableOpacity
                                            onPress={() => props.navigation.navigate('Создать проверку', {
                                                value: valueText,
                                                itemId: value2.id,
                                                checkId: props.check.id,
                                                parentId: props.route.params.parentId
                                            })}
                                        >*/}
                                            {/*<MaterialIcons
                                                name="check"
                                                color="green"
                                                size={25}
                                            />*/}
                                        {/*</TouchableOpacity>*/}
                                        <GetTreeText id={value2.id}/>
                                    </View>
                                    <TouchableRipple style={styles.dataTableCell}>
                                        <View>
                                            {/*<Text>Фото</Text>*/}

                                            <Icon name="camera" size={35} color="#000"
                                            style={{
                                                 opacity: 0.7,
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 borderWidth: 1,
                                                 borderColor: '#000',
                                                 borderRadius: 10,
                                            }}
                                            onPress={() => props.navigation.navigate('Редактировать проверку', {
                                                itemId: value2.id,
                                                checkId: props.check.id,
                                                parentId: props.route.params.parentId
                                            })}/>

                                            {/*<Text onPress={() => props.navigation.navigate('Редактировать проверку', {
                                                itemId: value2.id,
                                                checkId: props.check.id,
                                                parentId: props.route.params.parentId
                                            })}>Редактировать</Text>*/}
                                            {/*<Text>{value2.id} {props.check.id} {props.route.params.parentId}</Text>*/}
                                        </View>
                                    </TouchableRipple>

                                    <TouchableRipple style={styles.dataTableCell}>
                                        <Text>1</Text>
                                    </TouchableRipple>
                                </DataTable.Row>
                            )
                        }) : ''}
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
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title><Text style={[styles.tableWorld, {fontSize: 16}]}>Информация о
                                проверке</Text></DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.tableWorld}>Дата проверки</Text></DataTable.Title>
                            <DataTable.Title>{props.check.date}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text style={styles.tableWorld}>Версия
                                проверочного списка</Text></DataTable.Title>
                            <DataTable.Title>{props.check.check_list_version}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text style={styles.tableWorld}>Дата
                                создания</Text></DataTable.Title>
                            <DataTable.Title>{props.check.create_date}{" | "}{props.check.create_user}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text
                                style={styles.tableWorld}>Статус</Text></DataTable.Title>
                            <DataTable.Title>{props.check.status_id}</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title><Text style={[styles.tableWorld, {fontSize: 16}]}>Результат проверки</Text></DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.tableWorld}>Дата проверки</Text></DataTable.Title>
                            <DataTable.Title>{props.check.date}</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>

                    <DataTable style={{paddingTop: 20}}>
                        <GetTreeItems/>
                    </DataTable>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
    // const name = props.tree.name
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
    textSign: {
        fontSize: 22
    },
    tableWorld: {
        // fontWeight: 'bold'
    },
    bgColor: {
        // fontWeight: 'bold',
        backgroundColor: '#b4b5b7',
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
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    /*modalContent: {
        flex: 1,
    }*/
});

export default CreateCheck;