import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
