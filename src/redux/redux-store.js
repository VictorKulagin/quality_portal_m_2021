import {applyMiddleware, combineReducers, createStore} from "redux";
import categoriesReducer from "./categories-reducer";
import _categoriesReducer from "./categories-reduserss";
import subCategoriesReducer from "./sub-categories-reducer";
import menuCreatorReducer from "./menu-creator-reducer";
import thirdCategoriesReducer from "./third-category-reducer";
import createCheckReducer from "./create-check-reducer";
import setLoadScreenAuthReducer from "./load-screen-reducer"
import viewCheckHistoryReducer from "./view-check-history-reducer"
//import { composeWithDevToos } from 'react-native-view-shot';
import { reducer as formReducer } from 'redux-form';
//import AsyncStorage from '@react-native-community/async-storage';
//import { AsyncStorage } from 'react-native';

//import { persistStore, persistReducer } from 'redux-persist';

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMigrate, persistStore, persistReducer } from "redux-persist";



import thunkMiddleware from "redux-thunk";
import checkEditingReducer from "./check-editing-reducer";



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["authReducer"]
}

debugger;
let reducers = combineReducers({
    categoriesPage: categoriesReducer,
    subCategoriesReducer: subCategoriesReducer,
    menuCreatorReducer: menuCreatorReducer,
    thirdCategoriesReducer: thirdCategoriesReducer,
    createCheckReducer: createCheckReducer,
    setLoadScreenAuthReducer: setLoadScreenAuthReducer,
    viewCheckHistoryReducer: viewCheckHistoryReducer,
    checkEditingReducer: checkEditingReducer,
    form: formReducer,
    _categoriesPage: _categoriesReducer
});



//let store = createStore(reducers);

window.store = store;

//export default store;

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export { store, persistor };
/*export default () => {
    let store = createStore(persistedReducer, {}, applyMiddleware(thunkMiddleware))
    let persistor = persistStore(store)
    return { store, persistor }
}*/