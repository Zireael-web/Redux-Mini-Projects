import './HeroesAddForm.scss'

import { useHttp } from '../../hooks/http.hook';
import { useState, useEffect } from 'react';

import { v4 as uidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, filtersFetching, filtersFetchingError } from '../../actions';
import { heroAdded } from '../../actions';

import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {heroes, filters, filtersLoadingStatus} = useSelector(state => state)
    const dispatch = useDispatch();
    const { request } = useHttp();
    
    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onSubmitHanlder = (e) => {
        e.preventDefault();

        const newHero = {
            id: uidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        }
        const heroesWithAdded = [...heroes, newHero]

        dispatch(heroAdded(heroesWithAdded))

        fetch("http://localhost:3001/heroes", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHero)
        })

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const filtersInSelect = () => {
        switch (filtersLoadingStatus) {
            case ('loading'): 
                return <Spinner style={{marginTop: '35px'}}/>
            case ('idle'): 
                return (
                    <>
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                            <select 
                                required
                                onChange={(e) => setHeroElement(e.target.value)}
                                value={heroElement}
                                className="form-select" 
                                id="element" 
                                name="element"
                                placeholder="Я владею элементом..."
                                >
                                
                                {filters.map(filter => {
                                    return (
                                        (filter.name !== 'all') ? <option value={filter.name}>{filter.text}</option>
                                        : <option value="" disabled selected>Список элементов</option>
                                    )
                                })}
                            </select> 
                    </>
                )
            case ('error'): 
                return <span>Произошла ошибка</span>
            default:
                return;
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHanlder}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    minLength={2}
                    onChange={(e) => setHeroName(e.target.value)}
                    value={heroName}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    minLength={4}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    value={heroDescription}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                {filtersInSelect()}
            </div>

            <button 
            type="submit" 
            className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;