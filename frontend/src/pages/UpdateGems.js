import React, { useEffect, useState } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../CSS/GemAddForm.css';
import Header from '../components/Header';
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

function UpdateGems() {
  const { _id } = useParams();
  const { gems, dispatch } = useGemsContext();
  const [gem, setGem] = useState({ images: [] });
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
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages([file]);
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImages([]);
      setImageUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 0) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('shape', shape);
      formData.append('size', size);
      formData.append('color', color);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('description', description);

      formData.append('image', images[0]);

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
        body: formData,
      });

      const json = await response.json();

      setGem(json); // Update gem state with the updated gem data

      Swal.fire(
        'Gem Updated',
        'Gem details were successfully updated!',
        'success'
      ); // Show SweetAlert success alert

      nav('/GemAdminHome');
    } else {
      alert('Please upload an image');
    }
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
        setImages([json.image]);
        setImageUrl(json.gem_img);
      }
    };
    fetchGems();
  }, []);

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

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
                <span className="welcomeNoteAdmin">Hello Admin</span>
                <button className="adminLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
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
        <div className="gemDisplay">
          <div className="darkBlueTopicBoxGem">
            <h3 className="pageTopicGems">Update Selected Gem</h3>
          </div>
          <div className="lightBlueBodyBGGemForm">
            <div className="gem-input-container">
              <form
                className="create"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="column-holder-gem-form">
                  <div className="column-1-gem-form">
                    <label className="gem-label">Gem Name: </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className={`gem-input ${
                        emptyFields.includes('name') ? 'error' : ''
                      }`}
                    />
                    {emptyFields.includes('name') && (
                      <div className="error">Please enter a name.</div>
                    )}

                    <label>Upload Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {imageUrl && (
                      <div>
                        <img
                          src={imageUrl}
                          alt="Selected Image"
                          style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            marginBottom: '20px',
                          }}
                        />
                      </div>
                    )}

                    <label className="gem-label">Gem Type: </label>
                    <input
                      type="text"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                      className={`gem-input ${
                        emptyFields.includes('type') ? 'error' : ''
                      }`}
                    />
                    {emptyFields.includes('type') && (
                      <div className="error">Please enter a type.</div>
                    )}

                    <label className="gem-label">Gem Shape: </label>
                    <select
                      id="shapeDropdown"
                      value={selectedShape}
                      defaultValue=""
                      onChange={(e) => {
                        setSelectedShape(e.target.value);
                        setShape(e.target.value);
                      }}
                      className="gem-select"
                    >
                      <option value="">Select a shape</option>
                      <option value="Round">Round</option>
                      <option value="Oval">Oval</option>
                      <option value="Square">Square</option>
                    </select>

                    {emptyFields.includes('shape') && (
                      <div className="error">Please select a shape.</div>
                    )}

                    <label className="gem-label">Gem Size (in kt): </label>
                    <input
                      type="number"
                      onChange={(e) => setSize(e.target.value)}
                      value={size}
                      className={`gem-input ${
                        emptyFields.includes('size') ? 'error' : ''
                      }`}
                    />

                    {emptyFields.includes('size') && (
                      <div className="error">Please enter a size.</div>
                    )}
                  </div>
                  <div className="column-2-gem-form">
                    <label className="gem-label">Gem Color: </label>
                    <input
                      type="text"
                      onChange={(e) => setColor(e.target.value)}
                      value={color}
                      className={`gem-input ${
                        emptyFields.includes('color') ? 'error' : ''
                      }`}
                    />

                    {emptyFields.includes('color') && (
                      <div className="error">Please enter a color.</div>
                    )}

                    <label className="gem-label">Gem Quantity: </label>
                    <input
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      className={`gem-input ${
                        emptyFields.includes('quantity') ? 'error' : ''
                      }`}
                    />

                    {emptyFields.includes('quantity') && (
                      <div className="error">Please enter a quantity.</div>
                    )}

                    <label className="gem-label">Gem Price: (in Rs)</label>
                    <input
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      className={`gem-input ${
                        emptyFields.includes('price') ? 'error' : ''
                      }`}
                    />

                    {emptyFields.includes('price') && (
                      <div className="error">Please enter a price.</div>
                    )}

                    <label className="gem-label">Gem Description: </label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      id="gemDesc"
                      type="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className={`gem-input ${
                        emptyFields.includes('description') ? 'error' : ''
                      }`}
                    />

                    {emptyFields.includes('description') && (
                      <div className="error">Please enter a description.</div>
                    )}

                    <button className="gem-add-buttons" id="gem-add-button">
                      Update Gem
                    </button>
                    {error && <div className="error">{error}</div>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateGems;
