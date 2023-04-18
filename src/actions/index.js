import { heroesFetched, heroesFetching, heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetched, filtersFetching, filtersFetchingError } from '../components/heroesFilters/filtersSlice';

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

export const filterChanged = (id) => {
    return {
        type: 'FILTER_CHANGED',
        payload: +id
    }
}




