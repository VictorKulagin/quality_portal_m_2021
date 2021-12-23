import React, {useState} from 'react'

import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";

import {DataTable} from 'react-native-paper';
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';

import EndCheckTrue from "./CreateCheckEditing/Common/EndCheckTrue/EndCheckTrue";

const CreateCheck = (props) => {

    debugger;
    const padding = 10;
    const deviceWidth = Dimensions.get('window').width;
    const OptionCellDescription = (deviceWidth / 2) - (padding * 4);
    const OptionCellComment = (deviceWidth / 2.2) - (padding * 4);
    const CameraCellDescription = (deviceWidth / 13.1) - (padding * 4);
    const CoefficientCellDescription = (deviceWidth / 5) - (padding * 4);

    console.log(deviceWidth);


    const [search, setSearch] = useState(/*props.textInput*/'');

    const imputRef = React.useRef();

    debugger;
    console.log(imputRef + "ref");

    console.log(search);

    const isFocused = useIsFocused();


    let onPostChange = () => {
        let text = props.textInput;
        return text;
    }

    function GetTreeText({id}) {

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
                    <View style={{width: OptionCellComment, marginTop: 5}}>
                        <Text>{/*"Текст замечания к пункту проверки Обязателен при оценке 0.5-0.9"*/}</Text>
                    </View>
                </>
            )
        }
        return null
    }


    const searchFilter = (searchText) => {

        console.log(searchText);
        if(searchText) {
            setTimeout(() => props.navigation.navigate('Создать проверку', {
                TextInputSearch: searchText,
            }), 0)

                setTimeout(() => props.navigation.navigate('Создать проверку', {
                    parentIdSearch: props.route.params.parentId,
                    checkIdSearch: props.check.id,
                }), 0)

            console.log('SEARCH');
            let Tree = props.tree?.children;

            const text = searchText;

            let count = 0;
            Tree.map((category) => {
                category.children = category.children.map((item) => {
                    const itemTree = item.name ?
                        item.name.toUpperCase()
                        : ''.toUpperCase();

                    //return itemTree.indexOf(text.toUpperCase()) > -1;

                    if (itemTree.indexOf(text.toUpperCase()) > -1 !== true) {
                        item.hide = true;
                        // Object.defineProperty(item, 'hide', {
                        //     value: false,
                        //     enumerable: true,
                        //     ///configurable: true
                        // })
                        // console.log(item);
                    } else {
                        item.hide = false;
                        category.count = count++;
                        //count++;
                        // Object.defineProperty(item, 'hide', {
                        //     value: true,
                        //     enumerable: true,
                        //     ///configurable: true
                        // })
                        // console.log(item);
                    }
                    return item;
                });
                 console.log(category + "category" + count) ;
                 if(category.count) {
                     category.hide = false;
                 } else {
                     category.hide = true;
                 }

                // console.log(items ? category : []);
                return category;
            });
        }
    }

    const resetFilter = () => {
        setTimeout(() => props.navigation.navigate('Создать проверку', {
            parentIdSearch: props.route.params.parentId,
            checkIdSearch: props.check.id,
        }), 0)
        let Tree = props.tree?.children;
        Tree.map((category) => {
            category.children = category.children.map((item) => {
debugger;
                if (item.hide && item.hide === true) {
                    debugger;
                    item.hide = false;
                }
                return item;
            });
            console.log(category + "category") ;
            if(category.hide && category.hide === true) {
                category.hide = false;
            }
            debugger;
            return category;
        });
    }


 /**Функция скрыть кнопку Завершить Проверку**/
    /*function countCategoryHide (){
        let Tree = props.tree?.children;
        debugger;
        let count = 0;
        if(Tree !== undefined){
            Tree.map((category) => {
                console.log(category.hide);
                if(category.hide === true){
                    count++;
                } else {
                    return 0;
                }
            });
            return count;
        }
    }*/

    //debugger;
    //const constCountCategoryHide = countCategoryHide()
    //console.log( constCountCategoryHide + " countCategory");

    debugger;
    /*console.log(searchFilter() + " searchFilter");*/

    debugger;
    //console.log(props.tree + " props.Tree");

    function Seach() {
        return (<View>
                        <View>
                            <TextInput
                                //ref={imputRef}
                                style={[styles.textInputStyle, {position: 'relative'}]}
                                //value={props.textInput}
                                placeholder="Введите текст"
                                //underlineColorAndroid="transparent"
                                /*onChangeText={props.textInput}
                                defaultValue={'text'}*/
                                onSubmitEditing={(searchText) => {searchFilter(searchText.nativeEvent.text)}}
                                //onSubmitEditing={searchFilter(props.textInput)}
                                /*onChangeText={props.textInput}
                                defaultValue={props.textInput}*/
                            />
                            <View style={{ position: 'absolute', left: deviceWidth-40, paddingTop: 10 }}>
                                <Icon name="close" size={35} color="#000"
                                      style={{
                                          opacity: 0.7,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          position: 'relative'
                                      }}
                                      onPress={() => resetFilter()}
                                />
                            </View>
                        </View>
            </View>)
        return null
    }

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('initText');

    const toggleModal = (id, check_id) => {
        setModalVisible(!isModalVisible);
        tendence(id, check_id);
    };

    const tendence = (value, value2) => {
        return value;
    }

    const handleClick = (e, value) => {
        return value
    }

    function GetTreeItems () {
        if (props.tree?.children !== undefined) {
            return props.tree?.children.map((value, index) => {

                return (
                    <View key={Math.random().toString(36).substr(2, 9)}>

                        <NameTitle name={value.name} hide={value.hide} index={index}/>


                        {(value.name !== undefined /*&& !value.hide*/) ? value.children.map((value2, index2) => {
                            if (!value2.hide) {
                                return (
                                    <DataTable.Row key={Math.random().toString(36).substr(2, 10)} style={styles.dataTableRow}>
                                        <TouchableRipple style={{width: OptionCellDescription}}>
                                            <Text style={{ /*flexGrow: 1*/ marginBottom: 5, marginTop: 5}}>
                                                {value2.name}
                                            </Text>
                                        </TouchableRipple>

                                        <View>
                                            <GetTreeText id={value2.id}/>
                                        </View>

                                        <TouchableRipple style={{width: CameraCellDescription, justifyContent: 'center'}}>
                                            <View>
                                                <View style={{position: 'absolute', top: -10, right: 25}}>
                                                    <Text style={{fontWeight: 'bold'}}>{props.results[value2.id]?.files ? props.results[value2.id]?.files.length : []}</Text>
                                                </View>
                                                <Icon name="camera" size={35} color="#000"
                                                      style={{
                                                          opacity: 0.7,
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                          position: 'relative'
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
                                                  })}
                                            >{ EnterCoefficientResult(value2.id) }</Text>
                                        </TouchableRipple>

                                    </DataTable.Row>
                                )
                            }
                        }) : []}

                        <AllCoeffForPats getResult={props.getResult} hide={value.hide} valueId={props?.getResult?.data.categories[value.id]}/>

                    </View>
                )
            })
        }
        return null
    }


    const NameTitle = ({name, hide, index}) => {
        if(name !== undefined && hide === false) {
            return (
                <DataTable.Header key={index} style={styles.bgColor}>
                    <DataTable.Title numberOfLines={8}>
                        <Text style={[styles.bgColor, {fontSize: 16}]}>{ name }</Text>
                    </DataTable.Title>
                </DataTable.Header>
            )
        } else  {
            return null;
        }
    }


    const AllCoeffForPats = ({getResult, hide, valueId}) => {
        if(valueId !== undefined && hide === false) {
            return(
                <DataTable.Header>
                    <DataTable.Title numberOfLines={8}>
                        <Text style={[styles.bgColorCoefficient, {fontSize: 16}]}>{ getResult !== undefined && valueId ? `Коэффициент за раздел: ${valueId.toFixed(2)}` : '0' }</Text>
                    </DataTable.Title>
                </DataTable.Header>
            )
        } else {
            return null;
        }
    }

    const EnterCoefficientResult = (id) => {
        if (props.results.length !== 0) {
            if (props.results[id]?.coefficient !== undefined) {
                if(props.check.id === props.results[id].coefficient.check_id){
                    return props.results[id].coefficient.value;
                }
            }
        }
        return null
    }

    function EndCheck(search) {
        debugger;
        console.log(search);
         //if(constCountCategoryHide === 0) {
            return (
                <View>
                    <View>
                        <DataTable.Header style={styles.touchableOpacitySection}>
                            <DataTable.Title numberOfLines={8}>
                                <Text
                                    style={[styles.bgColorCoefficient, {fontSize: 16}]}>{props.getResult !== undefined ? `Коэффициент за проверку: ${props.getResult.data.common?.toFixed(2)}` : '0'}</Text>
                            </DataTable.Title>
                        </DataTable.Header>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Создать проверку', {
                            EndCheckTrue: EndCheckTrue(props),
                            EndCheckId: props.check.id,
                            EndParentId: (props.route.params.parentId !== undefined) ? props.route.params.parentId : props.route.params.parent_id_
                        })}
                                          style={styles.touchableOpacity}>

                            <Text style={styles.touchableOpacityText}>Завершить проверку</Text>
                            {/*{props.alertendresult !== undefined && props.alertendresult.result === 'success' ? props.navigation.navigate('Предприятия'
                         ) : []}*/}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.touchableOpacityNotes}>
                            При нажатии завершить проверку: автоотчет на почту: Техническому директору, Заместителю
                            директора, Административному директору,
                        </Text>
                    </View>
                </View>
            )
       //}
        return null
    }





    //debugger;
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
                            <DataTable.Title>{props.check?.date}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text style={styles.tableWorld}>Версия
                                проверочного списка</Text></DataTable.Title>
                            <DataTable.Title>{props.check?.check_list_version}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text style={styles.tableWorld}>Дата
                                создания</Text></DataTable.Title>
                            <DataTable.Title>{props.check?.create_date}{" | "}{props.check?.create_user}</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title style={styles.tableWorld}><Text
                                style={styles.tableWorld}>Статус</Text></DataTable.Title>
                            <DataTable.Title>{props.check?.status_id}</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title><Text style={[styles.tableWorld, {fontSize: 16}]}>Результат проверки</Text></DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.tableWorld}>Дата проверки</Text></DataTable.Title>
                            <DataTable.Title>{props.check?.date}</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>
                    <DataTable style={{paddingTop: 20}}>
                        <Seach/>
                        <GetTreeItems/>
                        <EndCheck/>
                        {/*<EndCheckTrue/>*/}
                        {/*GetTreeItems*/}
                    </DataTable>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
    },
    container: {
        //marginTop: StatusBar.currentHeight || 0,
        //padding: 5,
        //marginBottom: 40
    },
    containerModal: {
        flex: 1
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
    bgColorCoefficient: {
        // fontWeight: 'bold',
        color: '#000000',
    },
    viewStatus: {
        width: '100%',
        height: 10
    },
    dataTableRow: {
        flex: 1,
        flexDirection: 'row'
    },
    dataTableCellDescription: {
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellDescription
    },
    dataTableCellComment: {
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellComment
    },
    dataTableCellPhoto: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        width: CreateCheck.OptionCellComment
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
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    touchableOpacitySection: {
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        borderRadius: 0,
        paddingBottom: 10,
        //paddingTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        //marginBottom: 10
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
        borderRadius: 0,
        textAlign: 'center',
        alignSelf: 'stretch',
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10,
        //marginTop: 25,
        marginBottom: 25
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
    },

    textInputStyle: {
        height: 50,
        width: Dimensions.get('window').width,
        borderWidth: 1,
        paddingLeft: 20,
        marginTop: 1,
        marginBottom: 20,
        borderColor: '#eb2d93',
        backgroundColor: 'white'
    }


});

export default React.memo(CreateCheck);