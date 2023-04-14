import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilterId} = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const renderItems = (arr, id) => {
        console.log(arr, id)
            if (arr.length === 0) {
                return <h5 className="text-center mt-5">Героев пока нет</h5>
            }
    
            if (id === 1) {
                return arr.map(({id, ...props}) => {
                        return <HeroesListItem key={id} id={id} {...props}/>
                    })
            } else {
                const sortedArr = arr.filter(hero => hero.element === id);
                console.log(sortedArr)

                return sortedArr.map(({id, ...props}) => {
                    return <HeroesListItem key={id} id={id} {...props}/>
                })
            }
        // eslint-disable-next-line
    };
    
    if (heroesLoadingStatus === "loading") {
        return <Spinner style={{marginTop: '55px'}}/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const elements = renderItems(heroes, +activeFilterId)

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;