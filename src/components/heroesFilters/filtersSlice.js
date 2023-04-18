import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'loading',
    activeFilterId: 1
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload
        },
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        filterChanged: (state, action) => {state.activeFilterId = +action.payload}
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetched,
    filtersFetching,
    filtersFetchingError,
    filterChanged
} = actions;