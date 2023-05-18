import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  TextareaAutosize  from 'react-textarea-autosize';
import { useJewelleryesContext } from '../hooks/useJewelleryesContext';



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

        const emptyFields= []

        if(name === ''){
          emptyFields.push('name')
        }
      
        if(type === ''){
          emptyFields.push('type')
        }
      
        if(gender === ''){
          emptyFields.push('gender')
        }
      
        if(metal === ''){
          emptyFields.push('metal')
        }
      
        if(description === ''){
          emptyFields.push('description')
        }

        if(gemstone === ''){
            emptyFields.push('gemstone')
          }
      
        if(price === ''){
          emptyFields.push('price')
        }
        
        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields)
            setError('Please fill in all required fields.')
            return
        }

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
            }

            if(response.ok){
                setName('')
                setType('')
                setGender('')
                setMetal('')
                setGemstone('')
                setDescription('')
                setPrice('')
                setError(null)
                setEmptyFields([])
                window.alert('Jewelleres was successfully add to the database!')
                console.log('New jewellery Added', json)
                dispatch({type: 'CREATE_jewellery', payload: json})
                

            }
        navigator('/JewelleryAdminDashbord')
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Jewellery</h3>

            <hr className="jewhr"></hr>
        <div className="jewinputbox">
            <label className="jewAddlabel">Jewellery Name: </label>
            <div className='jewInput'>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                //className="jewInput"
                className={emptyFields.includes('name') ? 'error': ''}
            />
            {emptyFields.includes('name') && <div className="error">Please enter a name.</div>}

            <label className="jewAddlabel">Jewellery Type: </label>
            <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                //className="jewInput"
                 className={emptyFields.includes('type') ? 'error': ''}
            />
             {emptyFields.includes('type') && <div className="error">Please enter a type.</div>}


            <label className="jewAddlabel">Gender: </label>
            <select className="jewdropdown" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select a Gender</option>
                <option value="Male">Men</option>
                <option value="Female">Women</option>
                    className={emptyFields.includes('gender') ? 'error': ''}
            </select>
            {emptyFields.includes('gender') && <div className="error">Please enter a gender.</div>}
             
            <label className="jewAddlabel">Metal</label>
            <select className="jewdropdown" name="metal" onChange={e=>setMetal(e.target.value)}>
            <option value="">Select a Metal</option>    
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
            className={emptyFields.includes('metal') ? 'error': ''}
            </select>
            {emptyFields.includes('Metal') && <div className="error">Please selecta metal.</div>}

            <label className="jewAddlabel">Gemstone: </label>
            <select className="jewdropdown" name="gemstone" onChange={e=>setGemstone(e.target.value)}>
            <option value="">Select a Gemstone</option>    
            <option value="Blue Sapphire">Blue Sapphire</option>
            <option value="Pink Sapphire">Pink Sapphire</option>
            <option value="Green Sapphire">Green Sapphire</option>
            <option value="Emarald">Emarald</option>
            <option value="Ruby">Ruby</option>
            <option value="Moonstone">Moonstone</option>
            <option value="Opal">Opal</option>
            <option value="Tourmaline">Tourmaline</option>
            <option value="Turquoies">Turquoies</option>
            <option value="Cat's Eye">Cat's Eye</option>
            className={emptyFields.includes('gemstone') ? 'error': ''}
            </select>
            {emptyFields.includes('Gemstone') && <div className="error">Please select a gemstone.</div>}



            <label>Gem Description: </label>
          <TextareaAutosize
              minRows={3}
              maxRows={6}
              id="gemDesc"
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={emptyFields.includes('description') ? 'error': ''}
          />
          
          {emptyFields.includes('description') && <div className="error">Please enter a description.</div>}

            <label className="jewAddlabel">Jewellery Price: (in $)</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
               // className="jewInput"
                className={emptyFields.includes('price') ? 'error': ''}
                />
                 {emptyFields.includes('price') && <div className="error">Please enter a type.</div>}
            </div>    


            <br /><br />

            <label className="jewAddlabel">Upload Images:</label>
            <input type="file" name="image" accept="image/jpg, image/jpeg, image/png"></input>
        </div>
            <br /><br />
            <br /><br />
            {emptyFields.includes('description') && <div className="error">Please enter a description.</div>}    

            <button type='submit' className="addjewbtn">Add Jewellery</button>
            {error && <div className="error">{error}</div>}

            {/* <Link to={'/JewelleryAdminDashboard'}>
                <button className="baktohomebtn">Back to Home</button>
            </Link> */}
            <button className="baktohomebtn" onClick={() => window.location.href = '/JewelleryAdminDashboard'}>Back to Home</button>

            
        </form>
    )
}

export default JewelleryAddForm