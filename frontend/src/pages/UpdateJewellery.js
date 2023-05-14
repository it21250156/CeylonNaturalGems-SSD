import react,{useEffect, useState} from 'react'
import { useJewelleryesContext } from '../hooks/useJewelleryesContext'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthContext } from "../hooks/useAuthContext"

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

function UpdateJewellery() {

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };

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
        <>
      <header>
      <div>
        <div className="background">
          <div className="headerNameDiv">
            <h1 className="headerName">Ceylon Natural Gems</h1>
          </div>
        </div>

        <nav>
          <div className="navprofileDiv">
              <div className="navEmal">
                <span>
                  Hello Admin
                </span>
                <button onClick={handleClick}>Log out</button>
              </div>
          </div>

          <ul>
            <li>
              <Link to={'/adminHome'}>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
        <div className="Updatejewellery">
            {/* {JSON.stringify(jewellery)} */}

        <form className="create" onSubmit={handleSubmit}>
        <h3>Update Jewellery</h3>
      <div className="jewinputbox">
        <label className="jewAddlabel">Jewellery Name: </label>
        <div className='jewInput'>
        <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error': ''}
        />

        <label className="jewAddlabel">Jewellery Type: </label>
        <input
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className={emptyFields.includes('type') ? 'error': ''}
        />

        <label className="jewAddlabel">Gender: </label>
        <select name="gender" onChange={e=>setGender(e.target.value)}>
          <option value="">Select a gender</option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
        </select>


        <label className="jewAddlabel">Gemstone: </label>
        <select name="gemstone" onChange={e=>setGemstone(e.target.value)}>
          <option value="">Select a gemstone</option>
          <option value="Blue Sapphire">Blue Sapphire</option>
          <option value="Pink Sapphire">Pink Sapphire</option>
          <option value="Green Sapphire">Green Sapphire</option>
          <option value="Emarald">Emarald</option>
          <option value="Ruby">Ruby</option>
          <option value="Moonstone">Moonstone</option>
        </select>

        <label className="jewAddlabel">Metal: </label>
        <select name="metal" onChange={e=>setMetal(e.target.value)}>
          <option value="">Select a metal</option>
          <option value="GOLD">GOLD</option>
          <option value="SILVER">SILVER</option>
        </select>


        <label className="jewAddlabel">Description: </label>
        <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error': ''}
        />

        <label className="jewAddlabel">Jewellery Price: </label>
        <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={emptyFields.includes('price') ? 'error': ''}
        />
        </div>

                <br /><br />

                <label className="jewAddlabel">Upload Images:</label>
                <input type="file" name="image" accept="image/jpg, image/jpeg, image/png"></input>
      </div>
                <br /><br />
                <br /><br />


                <button type="submit" >Update Jewellery</button>
                {error && <div className="error">{error}</div>}

            </form>

        </div>
        </>
    )


}

export default UpdateJewellery