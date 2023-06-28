import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import usersReducer from "./redux/getListadoUsers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
}

const rootReducer = combineReducers({
    users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]

});