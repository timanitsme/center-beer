import {configureStore} from "@reduxjs/toolkit";
import {centerBeerApi} from "./services/centerBeer";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import {centerBeerAuthApi} from "./services/centerBeerAuth.js";


export const store = configureStore({
    reducer: {
        [centerBeerApi.reducerPath]: centerBeerApi.reducer,
        [centerBeerAuthApi.reducerPath]: centerBeerAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(centerBeerApi.middleware).concat(centerBeerAuthApi.middleware),
})

setupListeners(store.dispatch)