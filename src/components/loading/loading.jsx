import loading from '../../assets/loading.png'
import './loading.css'

const Loading = ({top, left}) => {
    return (
        <>
            <img src={loading} alt={"page is loading"} className={"loading-img"} style={{zIndex: '3', top: `${top}%`, left: `${left}%`}}/>
            <div className={"modal-backdrop"} style={{zIndex: '2'}}></div>
        </>
    )
}

export default Loading