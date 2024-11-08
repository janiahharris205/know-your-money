import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your root reducer

const store = configureStore({
    //set up the store with the root reducer
    reducer: rootReducer,
    //enable Redux DevTools only in development mode for better debugging
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools
});

//export the store
export default store;