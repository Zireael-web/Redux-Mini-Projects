import { useDispatch, useSelector} from 'react-redux';
import { heroDeleted } from '../../actions';


const HeroesListItem = ({id, name, description, element}) => {

    const heroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();

    const onClickDelete = () => {
        const heroesWithoutDeleted = heroes.filter(item => item.id !== id)
        console.log(heroesWithoutDeleted)
        dispatch(heroDeleted(heroesWithoutDeleted))

        fetch("http://localhost:3001/heroes/" + id, {
            method: 'DELETE'
        })
    }

    let elementClassName;

    switch (element) {
        case 2:
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 3:
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 4:
            elementClassName = 'bg-success bg-gradient';
            break;
        case 5:
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button 
                    type="button" 
                    className="btn-close btn-close" 
                    aria-label="Close"
                    onClick={onClickDelete}
                >
                </button>
            </span>
        </li>
    )
}

export default HeroesListItem;