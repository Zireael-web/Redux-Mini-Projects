import store from '../../store';
import { useEffect } from 'react';

import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from './filtersSlice';
import { filterChanged } from '../heroesFilters/filtersSlice';
import { selectAll } from './filtersSlice';


import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const { filtersLoadingStatus, activeFilterId } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const filters = selectAll(store.getState())

    useEffect(() => {
        dispatch(fetchFilters())

        // eslint-disable-next-line
    }, []);

    const onHandleFilter = (e) => {
        e.preventDefault();
        const filterId = e.target.dataset.id
        console.log(filterId)
        dispatch(filterChanged(filterId))
    }

    const filtersButtons = () => {
        switch (filtersLoadingStatus) {
            case ('loading'): 
                return <Spinner/>
            case ('idle'): 
                return (
                    <>
                        {filters.map(filter => {
                            const btnClass = classNames('btn', filter.color, {
                                'active': filter.id === activeFilterId
                            });
                            return (
                                <button 
                                onClick={onHandleFilter}
                                data-id={filter.id}
                                className={btnClass}
                                >
                                    {filter.text}
                                </button>
                            )
                        })}
                    </>
                )
            case ('error'): 
                return <span>Произошла ошибка</span>
            default:
                return;
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersButtons()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;