import 'react-native-gesture-handler';
import React, { useEffect, lazy, Suspense } from 'react';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

//import stores, {persistor, store} from "./src/redux/redux-store"
import reducers from './src/redux/categories-reducer';
import {AppRegistry, Button, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import Categories from "./src/categories/Categories";
import CategoriesContainer from "./src/categories/CategoriesContainer";
import SubCategoriesContainer from "./src/categories/Subcategory/SubCategoriesContainer";
import MenuCreatorContainer from "./src/categories/MenuСreator/MenuCreatorContainer";
import CheckEditingContainer from "./src/categories/MenuСreator/CreateCheck/CreateCheckEditing/CheckEditingContainer"

import ThirdCategoriesContainer from "./src/categories/ThirdСategory/ThirdСategoryContainer";
//import CreateCheckContainer from "./src/categories/MenuСreator/CreateCheck/CreateCheckContainer";
import {Provider} from "react-redux";
import {connect} from "react-redux";
import Expo from 'expo';

import { PersistGate } from 'redux-persist/integration/react';

import {persistor, store} from "./src/redux/redux-store";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/LoadScreens/DrawerContent'

import { AuthContext } from './src/common/context'


import AsyncStorage from "@react-native-community/async-storage";

import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";

//import { store, persistor } from './src/redux/redux-store';

//const { store, persistor } = stores();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateCheckContainer from "./src/categories/MenuСreator/CreateCheck/CreateCheckContainer";
import Loading from "./src/Login/Loading";
import SplashScreen from "./src/LoadScreens/SplashScreen";
//import SignInScreen from "./src/LoadScreens/SignInScreen";

import SignInScreenContainer from "./src/LoadScreens/SignInScreenContainer";
import ViewCheckHistoryContainer from "./src/categories/MenuСreator/ViewCheckHistory/ViewCheckHistoryContainer";


//const CreateCheckContainer = React.lazy(() => import('./src/categories/MenuСreator/CreateCheck/CreateCheckContainer'));




const CategoriesStack = createStackNavigator();

const Drawer = createDrawerNavigator();

/*{const lazyCreateCheckContainer = () => {
    return <Suspense fallback={<View><Text>...Loading</Text></View>}>
        <CreateCheckContainer/>
    </Suspense>
}}*/

const CategoriesStackScreen = ({navigation}) => (
    <CategoriesStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#eb2d93'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>

   <CategoriesStack.Screen name="SplashScreen" component={SplashScreen} options={{
       title: 'SplashScreen',
       headerShown: false
   }}/>
   <CategoriesStack.Screen name="SignInScreenContainer" component={SignInScreenContainer} options={{
       title: 'SignInScreenContainer',
       headerShown: false
   }}/>
        {/*<CategoriesStack.Screen name="SignInScreen" component={SignInScreen} options={{
       title: 'SignInScreen',
       headerShown: false
   }}/>*/}
   <CategoriesStack.Screen name="Предприятия" component={CategoriesContainer} options={{
    title: 'Предприятия',
    headerLeft: () => (
    <Icon.Button name="menu" size={25}
    backgroundColor="#eb2d93" onPress={() => navigation.openDrawer()}></Icon.Button>
         )
    }} />

   <CategoriesStack.Screen name="Подкатегории" component={SubCategoriesContainer}/>
   <CategoriesStack.Screen name="Меню создатель" component={MenuCreatorContainer}/>
   <CategoriesStack.Screen name="Третья категория" component={ThirdCategoriesContainer}/>
   <CategoriesStack.Screen name="Создать проверку" component={CreateCheckContainer}/>
   <CategoriesStack.Screen name="Редактировать проверку" component={CheckEditingContainer}/>
   <CategoriesStack.Screen name="Посмотреть историю проверок" component={ViewCheckHistoryContainer}/>
   </CategoriesStack.Navigator>
);

const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Предприятия" component={CategoriesStackScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
//AppRegistry.registerComponent('App', () => App)
//AppRegistry.registerComponent('App', () => App)