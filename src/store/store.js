import {configureStore} from "@reduxjs/toolkit";
import {centerBeerApi} from "./services/centerBeer";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import {centerBeerAuthApi} from "./services/centerBeerAuth.js";
import {logoutMiddleware} from "./services/authSlice.js";
import authMiddleware from "./middleware/authMiddleware.js";
import authReducer from "./services/authSlice.js"


export const store = configureStore({
    reducer: {
        [centerBeerApi.reducerPath]: centerBeerApi.reducer,
        [centerBeerAuthApi.reducerPath]: centerBeerAuthApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(centerBeerApi.middleware).concat(centerBeerAuthApi.middleware).concat(authMiddleware).concat(logoutMiddleware),
})

setupListeners(store.dispatch)