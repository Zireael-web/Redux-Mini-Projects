import './HeroesList.scss'

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {

    const {
        data: heroes = [],  
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilterId = useSelector(state => state.filters.activeFilterId)
     
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilterId === 1) {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilterId)
        } 

        // eslint-disable-next-line
    }, [heroes, activeFilterId]);


    const onDelete = useCallback((id) => {
        deleteHero(id)
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Spinner style={{marginTop: '55px'}}/>;
    } else if (isError) {
        return <h5 className="text-center">Ошибка загрузки</h5>
    }

    const renderItems = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center">Героев пока нет</h5>
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