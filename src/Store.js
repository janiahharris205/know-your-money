// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './Reducers';

// const initialState = {};

// const middleware = [thunk];

// const composeEnhancers = composeWithDevTools({
// });

// const store = createStore(rootReducer, initialState, composeEnhancers(
//     applyMiddleware(...middleware)
// ));

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your root reducer

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools
});

export default store;