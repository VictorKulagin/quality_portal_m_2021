import React from 'react'
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
    Alert,
    SectionList,
    VirtualizedList, Image
} from "react-native";

//import {DataTable} from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import {LinearGradient} from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import {Dimensions} from "react-native";

const ViewCheckHistory = (props) => {
    const { width } = Dimensions.get('window');
    const { height } = Dimensions.get('window');

    function GetTreeItems() {
        debugger;
        if (props.model !== null) {
            return props.model.map((value, index) => {
                return <View key={Math.random().toString(36).substr(2, 9)} style={{ flexDirection: 'row', borderBottomWidth: 0.2, borderBottomColor: '#929292'}}>
                    <View style={{ width: width/6 }}>
                        <Text style={[styles.bgColorData, { fontSize: width <= 500 ? 12 : 16 }]}

                              onPress={() => props.navigation.navigate('Создать проверку', {
                                  parentId: value.company_id,
                                  checkId: value.id
                              })}

                        >{value.date}</Text>
                    </View>
                    <View style={{ width: width/4}}>
                        <Text style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>{value.create_user}</Text>
                    </View>
                    <View style={{ width: width/9}} >
                        <Text style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16, textAlign: 'center' }]}>{value.rating}</Text>
                    </View>
                    <View style={{ width: width/6}} >
                        <Text style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>{value.create_date}</Text>
                    </View>
                    <View style={{ width: width/5.5}} >
                        <Text style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16, textAlign: 'center' }]}>{value.status.replace(/<span[^>]+?[^>]+>|<\/span>/isg, '')}</Text>
                    </View>

                    <View style={{ width: width/9}} >
                        <TouchableOpacity onPress={() => props.navigation.navigate('Посмотреть историю проверок', {
                            IdView: value.id,
                            n: 1
                        })}>
                            <LinearGradient
                                colors={['#eb2d93', '#964c7e']}
                                style={ styles.signInDelete }
                            >
                                <MaterialIcons
                                    name="delete"
                                    color="#fff"
                                    size={30}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            })
        }
        return null
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#929292'}}>
                        <View style={{ width: width/6}}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>Дата проверки</Text>
                        </View>
                        <View style={{ width: width/4}}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>ФИО проверяющего</Text>
                        </View>
                        <View style={{ width: width/9}}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>Оценка</Text>
                        </View>
                        <View style={{ width: width/7}}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>Дата изменения</Text>
                        </View>
                        <View style={{ width: width/6 }}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16, textAlign: 'center' }]}>Статус</Text>
                        </View>
                        <View style={{ width: width/8.5 }}>
                            <Text  style={[styles.bgColor, { fontSize: width <= 500 ? 12 : 16 }]}>Удалить</Text>
                        </View>
                    </View>
                    <View style={{position: 'relative', width: width, height: height}}>
                        <GetTreeItems/>
                    </View>
                    {props.isFetching ?
                        <View style={{
                            //flex: 1,
                            //alignItems: 'center',
                            position: 'absolute',
                            top: height / 2,
                            left: width / 2,
                        }}>
                            <ActivityIndicator animating={true} color={Colors.pink500}/>
                        </View> : null
                    }
                    {/*</DataTable>*/}
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
        padding: 5,
        marginBottom: 0
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
    signInDelete: {

        padding: 1,
    },
    textSign: {
        fontSize: 22
    },
    textSignDelete: {
        fontSize: 15
    },
    tableWorld: {},
    bgColor: {
        //backgroundColor: '#ffffff',
    },
    bgColorData: {
        color: '#d63886',
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

export default React.memo(ViewCheckHistory);