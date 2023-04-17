export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}


export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}




export const filtersFetching = () => {
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
}




export const heroDeleted = (heroes) => {
    return {
        type: 'HERO_DELETED',
        payload: heroes
    }
}

export const heroAdded = (heroes) => {
    return {
        type: 'HERO_ADDED',
        payload: heroes
    }
}




export const filterChanged = (id) => {
    return {
        type: 'FILTER_CHANGED',
        payload: +id
    }
}

/* export const filterChanged = (id) => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: 'FILTER_CHANGED',
            payload: +id
        })
    }, 150)
} */



