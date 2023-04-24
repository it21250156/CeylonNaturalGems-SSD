import { useState } from "react"
import { useGemsContext } from '../hooks/useGemsContext'
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'
import '../CSS/GemAdmin.css';

const GemAddForm = () => {

    const {dispatch} = useGemsContext()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [shape, setShape] = useState('')
    const [selectedShape, setSelectedShape] = useState('');
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const gem = {name, type, shape, size, color, quantity, price, description}

        const response = await fetch('/api/gems', {
            method: 'POST',
            body: JSON.stringify(gem),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setName('')
            setType('')
            setShape('')
            setSize('')
            setColor('')
            setQuantity('')
            setPrice('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            window.alert('Gem was successfully added to the database!')
            console.log('New Gem Added', json)
            dispatch({type: 'CREATE_GEM', payload: json})
        }

        nav('/GemAdminHome')
    }
        
        
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Gem</h3>

            <label>Gem Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error': ''}
            />

            <label>Gem Type: </label>
            <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error': ''}
            />

            <label>Gem Shape: </label>
            <select id="shapeDropdown" value={selectedShape} defaultValue="" onChange={(e) => {
                setSelectedShape(e.target.value);
                setShape(e.target.value);
            }}>
                <option value="">Select a shape</option>
                <option value="Round">Round</option>
                <option value="Oval">Oval</option>
                <option value="Square">Square</option>
            </select>
            
            <label>Gem Size (in ct): </label>
            <input
                type="number"
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className={emptyFields.includes('size') ? 'error': ''}
            />
            
            <label>Gem Color: </label>
            <input
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                className={emptyFields.includes('color') ? 'error': ''}
            />

            <label>Gem Quantity: </label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className={emptyFields.includes('quantity') ? 'error': ''}
            />

            <label>Gem Price: (in Rs)</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error': ''}
            />
            
            <label>Gem Description: </label>
            <TextareaAutosize
                minRows={3}
                maxRows={6}
                id="gemDesc"
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('desc') ? 'error': ''}
            />
            
            <button className="addGemButton">Add Gem</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GemAddForm