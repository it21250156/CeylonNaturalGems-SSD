import react,{useEffect, useState} from 'react'
import { useJewelleryesContext } from '../hooks/useJewelleryesContext'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateJewellery() {

    const { _id } = useParams()
    const { jewelleryes, dispatch } = useJewelleryesContext()
    const [jewellery, setJewellery] = useState({})

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [gender, setGender] = useState('')
    const [gemstone, setGemstone] = useState('')
    const [metal, setMetal] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const nav = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/jewelleryes/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({

                name: name, 
                type: type, 
                gender: gender, 
                gemstone: gemstone, 
                metal: metal, 
                description: description, 
                price: price,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        nav('/JewelleryAdminDashboard')


    }

    useEffect(() => {
        const fetchJewelleryes = async () => {

            const response = await fetch(`/api/jewelleryes/${_id}`)
            const json = await response.json()

            setJewellery(json)
            console.log(json)

            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
            if (response.ok) {


                setName(json.name)
                setType(json.type)
                setGender(json.gender)
                setGemstone(json.gemstone)
                setMetal(json.metal)
                setDescription(json.description)
                setPrice(json.price)
                setError(null)
                setEmptyFields([])
                console.log(response)

            }


        }

        fetchJewelleryes()
    }, [])

    return (
        <div className="Updatejewellery">
            {/* {JSON.stringify(jewellery)} */}

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


                <button type="submit" >Update Jewellery</button>
                {error && <div className="error">{error}</div>}

            </form>

        </div>

    )


}

export default UpdateJewellery