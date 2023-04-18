import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
    })  
    } else {
        return next(action);
    }
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: GetDefaultMiddleware => GetDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
    
})

export default store;
