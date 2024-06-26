import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritePlace {
    placeId: string;
    name: string;
    address: string;
}

interface FavoritesState {
    favorites: FavoritePlace[];
}

const initialState: FavoritesState = {
    favorites: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<FavoritePlace>) {
            state.favorites.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(fav => fav.placeId !== action.payload);
        }
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
