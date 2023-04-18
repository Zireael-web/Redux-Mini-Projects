import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'loading',
    activeFilterId: 1
}

export const fetchFilters = createAsyncThunk(
    'heroes/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
);

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
        filterChanged: {
            reducer: (state, action) => {state.activeFilterId = action.payload},
            prepare: (id) => {return{payload: +id}}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filterChanged
} = actions;