const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'loading',
    activeFilterId: 1
}   

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilterId === 1 ? 
                                action.payload : 
                                action.payload.filter(item => item.element === state.activeFilterId),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }


        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }


        case 'HERO_ADDED':
            let newHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilterId === 1 ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilterId)    
            }
        case 'HERO_DELETED':
            const filteredHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: filteredHeroList,
                filteredHeroes: state.activeFilterId === 1 ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilterId)
            }


        case 'FILTER_CHANGED': 
            return {
                ...state,
                activeFilterId: action.payload,
                filteredHeroes: action.payload === 1 ? 
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }

            
        default: return state
        }
        
}


export default reducer;