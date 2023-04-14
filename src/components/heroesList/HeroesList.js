import './HeroesList.scss'

import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useCallback } from 'react';


const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err))
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner style={{marginTop: '55px'}}/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderItems = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
    
        return arr.map(({id, ...props}) => {
            return (
            <CSSTransition 
            key={id}
            timeout={500}
            classNames="hero">
            <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
            </CSSTransition>
        )
        })  
        // eslint-disable-next-line
    };
    
    

    const elements = renderItems(filteredHeroes)

    return (
        <ul>
            <TransitionGroup component="ul">
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;