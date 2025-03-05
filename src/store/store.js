import {configureStore} from "@reduxjs/toolkit";
import {centerBeerApi} from "./services/centerBeer";
import {setupListeners} from "@reduxjs/toolkit/query/react";


export const store = configureStore({
    reducer: {
        [centerBeerApi.reducerPath]: centerBeerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(centerBeerApi.middleware),
})

setupListeners(store.dispatch)