import store from '../../store';
import './HeroesAddForm.scss'

import { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useCreateHeroMutation } from '../../api/apiSlice';

import { v4 as uidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from '../heroesFilters/filtersSlice';
import { selectAll } from '../heroesFilters/filtersSlice';


import Spinner from '../spinner/Spinner';
    
const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const [createHero] = useCreateHeroMutation();

    const {filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const filters = selectAll(store.getState())
    
    useEffect(() => {
        dispatch(fetchFilters())

        // eslint-disable-next-line
    }, []);

    const onSubmitHanlder = (e) => {
        e.preventDefault();

        const newHero = {
            id: uidv4(),
            name: heroName,
            description: heroDescription,
            element: filters.find(item => item.name === heroElement).id
        }

        createHero(newHero).unwrap();

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const filtersInSelect = (filters, status) => {
        switch (status) {
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
                            <option value="" disabled selected>Список элементов</option>
                            {filters.map(filter => {
                            return (
                                (filter.name !== 'all') ? <option value={filter.name}>{filter.text}</option>
                                : null
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
                {filtersInSelect(filters, filtersLoadingStatus)}
            </div>

            <button 
            type="submit" 
            className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;