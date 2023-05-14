import React, { useEffect, useState } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import "../CSS/GemAdminHome.css";

function UpdateGems() {
  const { _id } = useParams();
  const { gems, dispatch } = useGemsContext();
  const [gem, setGem] = useState({});

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [shape, setShape] = useState('');
  const [selectedShape, setSelectedShape] = useState(gem.shape);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emptyFields = [];
    if (name === '') {
        emptyFields.push('name');
    }
    if (type === '') {
        emptyFields.push('type');
    }
    if (shape === '') {
        emptyFields.push('shape');
    }
    if (size === '') {
        emptyFields.push('size');
    }
    if (color === '') {
        emptyFields.push('color');
    }
    if (quantity === '') {
        emptyFields.push('quantity');
    }
    if (price === '') {
        emptyFields.push('price');
    }
    if (description === '') {
        emptyFields.push('description');
    }

    if (emptyFields.length > 0) {
        setEmptyFields(emptyFields);
        setError('Please fill in all required fields.');
        return;
    }
    

    const response = await fetch(`/api/gems/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        type: type,
        shape: shape,
        size: size,
        color: color,
        quantity: quantity,
        price: price,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
  }

    window.alert('Gem details were successfully updated!');

    nav('/GemAdminHome');
  };

  useEffect(() => {
    const fetchGems = async () => {
      const response = await fetch(`/api/gems/${_id}`);
      const json = await response.json();

      setGem(json);
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        setName(json.name);
        setType(json.type);
        setShape(json.shape);
        setSize(json.size);
        setColor(json.color);
        setQuantity(json.quantity);
        setPrice(json.price);
        setDescription(json.description);
        setError(null);
        setEmptyFields([]);
        console.log(response);
        setSelectedShape(json.shape);
      }
    };
    fetchGems();
  }, []);

  return (
    <div className='UpdateGems'>
      <div className='gemDisplay'>
        <div className="darkBlueTopicBoxGem">
          <h3 className="pageTopicGems">Update Selected Gem</h3>
        </div>
        <div className="lightBlueBodyBGUserprofile">
          <div className="gem-input-container">
            <form className="create" onSubmit={handleSubmit}>
              <div className='column-1'>
                <label className="gem-label">Gem Name: </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={`gem-input ${emptyFields.includes('name') ? 'error' : ''}`}
                />
                {emptyFields.includes('name') && <div className="error">Please enter a name.</div>}

                <label className="gem-label">Gem Type: </label>
                <input
                  type="text"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  className={`gem-input ${emptyFields.includes('type') ? 'error' : ''}`}
                />
                {emptyFields.includes('type') && <div className="error">Please enter a type.</div>}

                <label className="gem-label">Gem Shape: </label>
                <select id="shapeDropdown" value={selectedShape} defaultValue="" onChange={(e) => {
                  setSelectedShape(e.target.value);
                  setShape(e.target.value);

                }} className="gem-select">
                  <option value="">Select a shape</option>
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Square">Square</option>

                </select>

                {emptyFields.includes('shape') && <div className="error">Please select a shape.</div>}

                <label className="gem-label">Gem Size (in kt): </label>
                <input
                  type="number"
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                  className={`gem-input ${emptyFields.includes('size') ? 'error' : ''}`}
                />

                {emptyFields.includes('size') && <div className="error">Please enter a size.</div>}

                <label className="gem-label">Gem Color: </label>
                <input
                  type="text"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  className={`gem-input ${emptyFields.includes('color') ? 'error' : ''}`}
                />

                {emptyFields.includes('color') && <div className="error">Please enter a color.</div>}

                <label className="gem-label">Gem Quantity: </label>
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className={`gem-input ${emptyFields.includes('quantity') ? 'error' : ''}`}
                />

                {emptyFields.includes('quantity') && <div className="error">Please enter a quantity.</div>}

                <label className="gem-label">Gem Price: (in Rs)</label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className={`gem-input ${emptyFields.includes('price') ? 'error' : ''}`}
                />

                {emptyFields.includes('price') && <div className="error">Please enter a price.</div>}

                <label className="gem-label">Gem Description: </label>
                <TextareaAutosize
                  minRows={3}
                  maxRows={6}
                  id="gemDesc"
                  type="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className={`gem-input ${emptyFields.includes('description') ? 'error' : ''}`}
                />
              </div>
              {emptyFields.includes('description') && <div className="error">Please enter a description.</div>}

              <button className="gem-add-buttons" id='gem-add-button'>Add Gem</button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateGems;
