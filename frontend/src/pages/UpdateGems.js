import React, {useEffect, useState} from "react";
import { useGemsContext } from "../hooks/useGemsContext"
import { useNavigate, useParams } from "react-router-dom"
import TextareaAutosize from 'react-textarea-autosize'
import '../CSS/GemAdmin.css';

import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

function UpdateGems(){

    const { logout } = useLogout();
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate('/');
  };

    const { _id } = useParams()
    const { gems, dispatch } = useGemsContext()
    const [gem, setGem] = useState({})

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [shape, setShape] = useState('')
    const [selectedShape, setSelectedShape] = useState(gem.shape)
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

        

        const response = await fetch(`/api/gems/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({

                name : name,
                type : type,
                shape : shape,
                size : size,
                color : color,
                quantity : quantity, 
                price : price,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        window.alert('Gem details were successfully updated!')

        nav('/GemAdminHome')

    }

    useEffect(() => {
        const fetchGems = async () => {

        const response = await fetch(`/api/gems/${_id}`)
        const json = await response.json()

        setGem(json)
        console.log(json)
        
        if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)}

        if(response.ok){
            setName(json.name)
            setType(json.type)
            setShape(json.shape)
            setSize(json.size)
            setColor(json.color)
            setQuantity(json.quantity)
            setPrice(json.price)
            setDescription(json.description)
            setError(null)
            setEmptyFields([])
            console.log(response)
            setSelectedShape(json.shape)
    }
    }
    fetchGems()
}, [])

    return(
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
        <div className="UpdateGems">
            

            <form className="create" onSubmit={handleSubmit}>
            <h3>Update Selected Gem</h3>

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
            <select id="shapeDropdown" value={selectedShape} onChange={(e) => {
                setSelectedShape(e.target.value);
                setShape(e.target.value);
            }}>
                <option value="">Select a shape</option>
                <option value="Round">Round</option>
                <option value="Oval">Oval</option>
                <option value="Square">Square</option>
            </select>


            <label>Gem Size (in kt): </label>
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

            <label>Gem Price: </label>
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
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error': ''}
            />
            <button>Update Gem</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div> 
        </>
    ) 
}

export default UpdateGems