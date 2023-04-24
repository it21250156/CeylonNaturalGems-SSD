import { Link } from "react-router-dom"
import { useJewelleryesContext } from "../hooks/useJewelleryesContext"


const JewelleryDetails = ({jewellery}) => {

    const {dispatch} = useJewelleryesContext()

    const handleDelete = async () => {
        const response = await fetch('/api/jewelleryes/' + jewellery._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_JEWELLERY', payload: json})
            window.location.reload()
        }
    }

    const handleUpdate = async () => {
        const response = await fetch('/api/jewelleryes/' + jewellery._id, {
            method: 'PATCH'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'UPDATE_JEWELLERY', payload: json})
        }
    }

    return(
        <div className="jewellery-details">
            <h4>{jewellery.name}</h4>
            <p><strong>Type: </strong>{jewellery.type}</p>
            <p><strong>Gender: </strong>{jewellery.gender}</p>
            <p><strong>Gemstone: </strong>{jewellery.gemstone}</p>
            <p><strong>Metal: </strong>{jewellery.metal}</p>
            <p><strong>Description: </strong>{jewellery.description}</p>
            <p><strong>Price: $.</strong>{jewellery.price}/=</p>
            <p><strong>Added Date: </strong>{jewellery.createdAt}</p>
            <button onClick={handleDelete}>delete</button>
           
        
           <Link to = {`/UpdateJewelleryes/${jewellery._id}`}>
            <span>update</span>
            </Link>
        </div>
    )
}

export default JewelleryDetails