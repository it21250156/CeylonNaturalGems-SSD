import { useState } from "react"
import { useJewelleryesContext } from '../hooks/useJewelleryesContext'
import { Link } from "react-router-dom"

const JewelleryAddForm = () => {
    const {dispatch} = useJewelleryesContext()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [gender, setGender] = useState('')
    const [gemstone, setGemstone] = useState('')
    const [metal, setMetal] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const jewellery = {name, type, gender, gemstone, metal, description, price}

        const response = await fetch('/api/jewelleryes', {
            method: 'POST',
            body: JSON.stringify(jewellery),
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
            setGender('')
            setGemstone('')
            setMetal('')
            setDescription('')
            setPrice('')
            setError(null)
            setEmptyFields([])
            console.log('New jewellery Added', json)
            dispatch({type: 'CREATE_jewellery', payload: json})
            window.location.reload()

        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Jewellery</h3>

            <label>Jewellery Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error': ''}
            />

            <label>Jewellery Type: </label>
            <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error': ''}
            />

            <label>Gender: </label>
            <select  value={type} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select a type</option>
                <option value="Male">Men</option>
                <option value="Female">Women</option>
                className={emptyFields.includes('gender') ? 'error': ''}
            </select>

            <label>Gemstone: </label>
            <input type="radio" name="gemstone" value="Blue Sapphire" onChange={e=>setGemstone(e.target.value)}/>Blue Sapphire
            <input type="radio" name="gemstone" value="Pink Sapphire" onChange={e=>setGemstone(e.target.value)}/>Pink Sapphire
            <input type="radio" name="gemstone" value="Green Sapphire" onChange={e=>setGemstone(e.target.value)}/>Green Sapphire
            <input type="radio" name="gemstone" value="Emarald" onChange={e=>setGemstone(e.target.value)}/>Emarald
            <input type="radio" name="gemstone" value="Ruby" onChange={e=>setGemstone(e.target.value)}/>Ruby
            <input type="radio" name="gemstone" value="Moonstone" onChange={e=>setGemstone(e.target.value)}/>Moonstone

            <lable>Metal</lable>
            <input type="radio" name="metal" value="GOLD" onChange={e=>setMetal(e.target.value)}/>GOLD
            <input type="radio" name="metal" value="SILVER" onChange={e=>setMetal(e.target.value)}/>SILVER

            <label>Description: </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error': ''}
            />

            <label>Jewellery Price: </label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error': ''}
            />

            <br /><br />

            <label>Upload Images:</label>
            <input type="file" name="image" accept="image/jpg, image/jpeg, image/png"></input>

            <br /><br />
            <br /><br />

            <button>Add Jewellery</button>
            {error && <div className="error">{error}</div>}

            <Link to={'/JewelleryAdminDashboard'}>
                <button>Back to Home</button>
            </Link>
            
            
        </form>
    )
}

export default JewelleryAddForm