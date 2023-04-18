import { createAction } from "@reduxjs/toolkit";
import { heroesFetched, heroesFetching, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}
export const filtersFetching = createAction('FILTERS_FETCHING');
export const filtersFetched = createAction('FILTERS_FETCHED');
export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');

export const filterChanged = (id) => {
    return {
        type: 'FILTER_CHANGED',
        payload: +id
    }
}
/* export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
} */





