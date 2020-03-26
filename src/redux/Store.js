import thunk from "redux-thunk";
import {createStore , applyMiddleware} from "redux";
import RootReducer from "./reducers/RootReducer";
import storage from 'redux-persist/es/storage';
import { persistReducer,persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    whitelist: ['user'],
    storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(persistedReducer , applyMiddleware(thunk))

export const persistor = persistStore(store);



export default store;