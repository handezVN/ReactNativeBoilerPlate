import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalSlice, { globalType } from './globalSlice';
// import usersSaga from '../screens/UsersScreen/saga';
// group all reducers in a single reducer object
export type globalStore  = {
    global : globalType,
}
const reducers = {
    global: globalSlice,
};

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// create/configure store
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    // devTools: process.env.NODE_ENV !== 'production'
});

// run sagas in sagaMiddleware after mounting it in the store
// sagaMiddleware.run(usersSaga);

export default store;