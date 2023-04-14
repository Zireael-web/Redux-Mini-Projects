
const Spinner = ({style}) => {
    return (
        <div className="spinner-border mx-auto" style={style} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;