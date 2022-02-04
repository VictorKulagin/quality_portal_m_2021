import React, {useEffect} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Button, SafeAreaView, FlatList} from "react-native";

const MenuCreator = (props) => {

    //const MenuScreen = ({navigation}) => {
        /*const [menu, setMenu] = useState([
            { id: '1', title: 'Создать проверку' },
            { id: '2', title: 'Посмотреть историю проверок' },
            { id: '3', title: 'Посмотреть журнал поручений' },
            { id: '4', title: 'Редактировать проверочный список' }
        ])*/
    //}

    const onPress = () => console.log('111')

    useEffect(() =>{
        setTimeout(() => props.navigation.setOptions({ title: props.route.params.name.title }), 0);
    }, [])

   const buttons = [
        { id: '1', title: 'Создать проверку', onPress: onPress},
        { id: '2', title: 'Посмотреть историю проверок', onPress: onPress },
        /*{ id: '3', title: 'Посмотреть журнал поручений' },
        { id: '4', title: 'Редактировать проверочный список' }*/
    ];





    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={buttons}
                numColumns={2}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => {
                    debugger;

                    const Btn = () => {
                        /*switch (item.id) {
                            case 1: {
                                return () => "Создать проверку", {parent_id_: props.route.params.name.id}
                            }
                            case 2: {
                                return () => "Посмотреть историю проверок" , {parent_id_: props.route.params.name.id}
                            }
                            default:
                                return null;
                        }*/

                        //console.log(item.id);
                        if(item.id === '1'){
                            //props.navigation.navigate((item.id==2)?"Посмотреть историю проверок":"", {parent_id_: props.route.params.name.id})
                            //console.log(1);
                            props.navigation.navigate((item.id==1) ? "Создать проверку" : "", {
                                parent_id_: props.route.params.name.id
                            })
                        }else if(item.id === '2'){
                            //props.navigation.navigate((item.id==2)?"Посмотреть историю проверок":"", {parent_id_: props.route.params.name.id})
                            //console.log(2);
                            debugger;
                            props.navigation.navigate((item.id==2) ? "Посмотреть историю проверок" : "", {
                                parent_id_: props.route.params.name.id,
                                Page: 1,
                                pageSize: 15
                            })
                        }
                    }


                    return (
                        <TouchableOpacity
                            onPress={Btn}

                            /*onPress={() => props.navigation.navigate((item.id==2)?"Посмотреть историю проверок":"", {
                                parent_id_: props.route.params.name.id
                            })}*/


                            /*onPress={() => props.navigation.navigate((item.parent_id !== 3) ? "Меню создатель" : "Третья категория", {
                                name: item
                            })}*/
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


export default MenuCreator;