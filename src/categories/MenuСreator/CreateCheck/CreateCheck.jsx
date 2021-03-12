import React, {useState, useMemo} from 'react'

//import '../../../common/grid.css'; //Import here your file style

import {FlatGrid, SectionGrid} from 'react-native-super-grid';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Alert
} from "react-native";

import {DataTable} from 'react-native-paper';
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
//import { NavigationActions } from 'react-navigation';

const CreateCheck = (props) => {

    const isFocused = useIsFocused();



    /*const doubleEnterCoefficientResult = useMemo(() => {
        return EnterCoefficientResult()
    }, [])*/

    function GetTreeText({id}) {

        //console.log(`${props.results[id].text} "TEXT"`);
        if (props.results !== undefined && props.results.length !== 0 && props.results[id].text !== undefined) {

            return (
                <>
                    <View style={{width: OptionCellComment}}>
                        <Text>{(props.results[id].text) ? props.results[id].text.text : []}</Text>
                    </View>
                </>
            )
        } else {
            return (
                <>
                    <View style={{width: OptionCellComment}}>
                        <Text>{"Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9"}</Text>
                    </View>
                </>
            )
        }
        return null
    }



    function GetTreeItems() {

        if (props.tree.children !== undefined) {


            //const [valueText, setText] = useState('');
            //const HandleInputChange = event => setText(event.nativeEvent.text);
            ///console.log(props.data);

            return props.tree.children.map((value, index) => {
                debugger;
                return (
                    <>
                        <DataTable.Header style={styles.bgColor}>
                            <DataTable.Title numberOfLines={8}>
                                <Text key={index} style={[styles.bgColor, {fontSize: 16}]}>{value.name}</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        {(value.name !== undefined) ? value.children.map((value2, index2) => {
                            return (
                                <DataTable.Row style={styles.dataTableRow}>
                                    <TouchableRipple style={{width: OptionCellDescription}}>
                                        <Text
                                            style={{ /*flexGrow: 1*/}}> {value2.name} {/*(props.model !== null && props.model.item_id == value2.id ) ? props.model.text : ""*/}</Text>
                                    </TouchableRipple>

                                    <View key={index2}>
                                        <GetTreeText id={value2.id}/>
                                    </View>
                                    <TouchableRipple style={{width: CameraCellDescription, justifyContent: 'center'}}>
                                        <View>
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

                                        </View>
                                    </TouchableRipple>

                                    <TouchableRipple
                                        style={{width: CoefficientCellDescription, justifyContent: 'center'}}>
                                        <Text style={{textAlign: 'center'}}
                                            onPress={() => props.navigation.navigate('Редактировать проверку', {
                                                itemId: value2.id,
                                                checkId: props.check.id,
                                                parentId: props.route.params.parentId
                                        })}>{/*props.results[11241].coefficient.value*/EnterCoefficientResult(value2.id)/*isFocused ? EnterCoefficientResult(value2.id) : EnterCoefficientResult(value2.id)*/}</Text>

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

    const EnterCoefficientResult = (id) => {
        debugger;
        if (props.results.length !== 0) {

                if (props.results[id].coefficient !== undefined) {
                    if(props.check.id === props.results[id].coefficient.check_id){
                    console.log(`${id} : ${props.results[id].coefficient.value} : RES`)
                    return props.results[id].coefficient.value;
                }
            }
        }
        return null
    }

    const EndCheckTrue = () => {
        // const even = (element) => element < 1;

        if (props.results.length !== 0) {
            for (let key in props.results) {

                if(props.results[key].coefficient !== undefined){
                    if(props.results.hasOwnProperty(key)){
                        console.log(`${key} : ${props.results[key].coefficient.value}`)
                    }
                }

                if(props.results[key].text !== undefined){
                    if(props.results.hasOwnProperty(key)){
                        console.log(`${key} : ${props.results[key].text.text}`)
                    }
                }

                function coefficientR() {
                    if (props.results[key].coefficient.value < 1) {
                        console.log(false)
                        return false;
                    } else {
                        console.log(true)
                        return true;
                    }
                }

                function textR() {
                    if (props.results[key].text === undefined) {
                        console.log(false)
                        return false;
                    } else {
                        console.log(true)
                        return true;
                    }
                }

                if (coefficientR() === false && textR() === false) {
                    if (props.tree.children !== undefined) {
                        props.tree.children.map((value, index) => {
                            if (value.name !== undefined) {
                                value.children.map((value2, index2) => {
                                    if (value2.id == key) {
                                        console.log(value2.name + " 11111");
                                        Alert.alert(value2.name);
                                        console.log(false);
                                        return false;
                                    }
                                })
                            }
                        })
                    }
                }
                if (coefficientR() === false && textR() === false) {
                    console.log(false + 'EndCheckTrue')
                    return false;
                }
            }
        }
        return true;
    }

    const AlertEndCheckTrue = (bool) => {
        if(bool !== 'success'){

            if (props.results.length !== 0) {
                for (let key in props.results) {

                    function coefficientR() {
                        if (props.results[key].coefficient.value < 1) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    function textR() {
                        if (props.results[key].text === undefined) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    if (coefficientR() === false && textR() === false) {
                        if (props.tree.children !== undefined) {
                            props.tree.children.map((value, index) => {
                                if (value.name !== undefined) {
                                    value.children.map((value2, index2) => {
                                        if (value2.id == key) {
                                            //console.log(value2.name + " 11111");
                                            console.log(value2.name);
                                            return Alert.alert(value2.name);
                                            //console.log(false);
                                            //return false;
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }
        return null;
    }

    function EndCheck() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Создать проверку', {
                        EndCheckTrue: EndCheckTrue(),
                        EndCheckId: props.check.id,
                        EndParentId: (props.route.params.parentId !== undefined) ? props.route.params.parentId : props.route.params.parent_id_ })}
                        style={styles.touchableOpacity}>

                        <Text style={styles.touchableOpacityText}>Завершить проверку</Text>
                        <Text>{`${(props.route.params.parentId !== undefined) ? props.route.params.parentId : props.route.params.parent_id_}  ${props.check.id}`}</Text>

                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.touchableOpacityNotes}>
                        При нажатии завершить проверку: автоотчет на почту: Техническому директору, Заместителю директора, Административному директору,
                    </Text>
                </View>
            </View>
        )
        return null
    }


    const padding = 10;
    const deviceWidth = Dimensions.get('window').width;
    const OptionCellDescription = (deviceWidth / 2) - (padding * 4);
    const OptionCellComment = (deviceWidth / 2.2) - (padding * 4);
    const CameraCellDescription = (deviceWidth / 13.1) - (padding * 4);
    const CoefficientCellDescription = (deviceWidth / 10) - (padding * 4);

    console.log(OptionCellDescription);
    console.log(CameraCellDescription);
    console.log(EndCheckTrue());

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text style={[styles.tableWorld, {fontSize: 16}]}>Информация о проверке</Text>
                            </DataTable.Title>
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



                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.tableWorld}>Дата проверки</Text></DataTable.Title>
                            <DataTable.Title>{props.check.id}</DataTable.Title>
                        </DataTable.Header>



                    </DataTable>

                    <DataTable style={{paddingTop: 20}}>
                        <GetTreeItems/>
                        <EndCheck/>
                        {/*<EndCheckTrue/>*/}
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
        //padding: 5,
        //marginBottom: 40
    },
    signIn: {
        backgroundColor: '#ffedad',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,

        shadowOffset: {height: 1, width: 1}, // IOS
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
        //paddingHorizontal: 0,
        //width: CreateCheck.deviceWidth
        flex: 1,
        flexDirection: 'row'
    },
    dataTableCellDescription: {
        //paddingHorizontal: 16,
        //paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellDescription
        //width: (Dimensions.get('window').width / 8) - (10 * 4)
        //alignItems: 'flex-start',
        //justifyContent: 'flex-end',
    },
    dataTableCellComment: {
        //paddingHorizontal: 16,
        //paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellComment
        //alignItems: 'flex-start',
        //justifyContent: 'flex-end',
    },
    dataTableCellPhoto: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellComment
        //alignItems: 'flex-start',
        //justifyContent: 'flex-end',
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

    touchableOpacity: {
        //width: '100%',
        backgroundColor: '#eb2d93',
        alignSelf: 'stretch',
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25,
        marginBottom: 10
    },
    touchableOpacityText: {
        color:'#ffffff',
        textAlign:'center',
        fontSize:20
    },
    touchableOpacityNotes: {
        //width: '100%',
        backgroundColor: '#f1b9d7',

        borderTopColor: '#eb2d93',
        borderLeftColor: '#eb2d93',
        borderRightColor: '#eb2d93',
        borderBottomColor: '#eb2d93',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        alignSelf: 'stretch',
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10,
        //marginTop: 25,
        marginBottom: 25
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


    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 100,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    }


});

export default CreateCheck;