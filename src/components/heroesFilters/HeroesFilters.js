import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, filtersFetching, filtersFetchingError, filterChanged } from '../../actions';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const { request } = useHttp();
    const { filters, filtersLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

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
                            return (
                                <button 
                                onClick={onHandleFilter}
                                data-id={filter.id}
                                className={`btn ${filter.color}`}
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