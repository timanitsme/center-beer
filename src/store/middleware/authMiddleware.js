import {isRejectedWithValue} from "@reduxjs/toolkit";
import {centerBeerAuthApi} from "../services/centerBeerAuth.js";
import {initializeAuthState, logout, setIsLoading} from "../services/authSlice.js";

let isRefreshing = false;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

export const authMiddleware =
    ({ dispatch }) =>
        (next) =>
            async (action) => {
                if (isRejectedWithValue(action) && action.payload?.status === 401) {
                    if (action.meta?.arg?.endpointName === 'refreshTokenCookie') {
                        return next(action);
                    }

                    if (!isRefreshing && refreshAttempts < MAX_REFRESH_ATTEMPTS) {
                        isRefreshing = true;
                        //setIsRefreshing(true)
                        console.log("Trying to refresh")
                        try {
                            // Попытка обновить токен
                            const refreshResult = await dispatch(centerBeerAuthApi.endpoints.refreshTokenCookie.initiate());
                            if (refreshResult.error){
                                await dispatch(logout())
                                await dispatch(setIsLoading(false))
                                console.log("error while refresh")
                            }
                            else{
                                return dispatch(initializeAuthState(true))
                            }

                            /*if (action.meta?.arg) {
                                console.log('Action meta arg:', JSON.stringify(action.meta.arg));
                                const { endpointName, originalArgs } = action.meta.arg;
                                return dispatch(centerBeerAuthApi.endpoints[endpointName].initiate(originalArgs || {}, { forceRefetch: true }));
                            } else {
                                console.warn('Original arguments are not available');
                                return next(action);
                            }*/
                        } catch (error) {
                            console.error(`refresh error: ${error}`)
                            await dispatch(logout())

                        } finally {
                            isRefreshing = false;
                            //dispatch(setIsRefreshing(false))
                        }
                    } else {
                        // Ждём завершения обновления токена
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        if (action.meta?.arg) {
                            console.log('Action meta arg:', JSON.stringify(action.meta.arg));
                            const { endpointName, originalArgs } = action.meta.arg;
                            return dispatch(centerBeerAuthApi.endpoints[endpointName].initiate(originalArgs || {}, { forceRefetch: true }));
                        } else {
                            console.warn('Original arguments are not available');
                            return next(action);
                        }
                    }
                }

                return next(action);
            };

export default authMiddleware;