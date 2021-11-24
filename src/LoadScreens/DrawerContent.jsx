import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Drawer,
    Text,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignInScreenContainer from "./SignInScreenContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DrawerContent(props) {

    const remove = async  () => {
        try {
            await AsyncStorage.removeItem('key_user')
            await AsyncStorage.removeItem('key_password')

            if(props.username !== null && props.password !== null) {
                setTimeout(() => props.navigation.navigate('SignInScreenContainer'), 0);
            }

        } catch (err) {
            alert(err)
        } finally {
            //setUser();
            //setPassword();
        }
    }

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <Text>Main Content</Text>
                </View>
                <View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="logout"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Выйти"
                            onPress={() => props.navigation.navigate('SignInScreenContainer')}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Выйти"
                    onPress={() => remove()}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});