import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useJewelleryesContext } from '../hooks/useJewelleryesContext';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';

const JewelleryAddForm = () => {
  const { dispatch } = useJewelleryesContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [gemstone, setGemstone] = useState('');
  const [metal, setMetal] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const jewellery = {name, type, gender, gemstone, metal, description, price}

    const file = e.target.image.files[0];
    if (!file) {
      setError('Please select an image.');
    }

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('gender', gender);
    formData.append('metal', metal);
    formData.append('gemstone', gemstone);
    formData.append('price', price);
    formData.append('description', description);

    const emptyFields = [];

    if (name === '') {
      emptyFields.push('name');
    }

    if (type === '') {
      emptyFields.push('type');
    }

    if (gender === '') {
      emptyFields.push('gender');
    }

    if (metal === '') {
      emptyFields.push('metal');
    }

    if (description === '') {
      emptyFields.push('description');
    }

    if (gemstone === '') {
      emptyFields.push('gemstone');
    }

    if (price === '') {
      emptyFields.push('price');
    }

    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/jewelleryes', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setName('');
        setType('');
        setGender('');
        setMetal('');
        setGemstone('');
        setDescription('');
        setPrice('');
        setError(null);
        setEmptyFields([]);
        Swal.fire(
          'Jewellery Added',
          'Jewellery was successfully added to the database!',
          'success'
        );
        dispatch({ type: 'CREATE_jewellery', payload: json });
        navigate('/JewelleryAdminDashbord');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the jewellery.');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <div className="darkBlueTopicBox">
        <h3 className="pageTopic">Add a New Jewellery</h3>
      </div>

      <div className="jewinputbox">
        <label className="jewAddlabel">Jewellery Name: </label>
        <div className="jewInput">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            //className="jewInput"
            className={emptyFields.includes('name') ? 'error' : ''}
          />
          {emptyFields.includes('name') && (
            <div className="error">Please enter a name.</div>
          )}

          <label className="jewAddlabel">Jewellery Type: </label>
          <input
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
            //className="jewInput"
            className={emptyFields.includes('type') ? 'error' : ''}
          />
          {emptyFields.includes('type') && (
            <div className="error">Please enter a type.</div>
          )}

          <label className="jewAddlabel">Gender: </label>
          <select
            className="jewdropdown"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select a Gender</option>
            <option value="Male">Men</option>
            <option value="Female">Women</option>
            className={emptyFields.includes('gender') ? 'error' : ''}
          </select>
          {emptyFields.includes('gender') && (
            <div className="error">Please enter a gender.</div>
          )}

          <label className="jewAddlabel">Metal</label>
          <select
            className="jewdropdown"
            name="metal"
            onChange={(e) => setMetal(e.target.value)}
          >
            <option value="">Select a Metal</option>
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
            className={emptyFields.includes('metal') ? 'error' : ''}
          </select>
          {emptyFields.includes('Metal') && (
            <div className="error">Please selecta metal.</div>
          )}

          <label className="jewAddlabel">Gemstone: </label>
          <select
            className="jewdropdown"
            name="gemstone"
            onChange={(e) => setGemstone(e.target.value)}
          >
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
            className={emptyFields.includes('gemstone') ? 'error' : ''}
          </select>
          {emptyFields.includes('Gemstone') && (
            <div className="error">Please select a gemstone.</div>
          )}

          <label>Gem Description: </label>
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            id="gemDesc"
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
          />

          {emptyFields.includes('description') && (
            <div className="error">Please enter a description.</div>
          )}

          <label className="jewAddlabel">Jewellery Price: (in $)</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            // className="jewInput"
            className={emptyFields.includes('price') ? 'error' : ''}
          />
          {emptyFields.includes('price') && (
            <div className="error">Please enter a price.</div>
          )}
        </div>

        <br />
        <br />

        <label className="gem-label">Jewellery Image:</label>
        <input
          className="jewel-img-input"
          type="file"
          name="image"
          accept="image/*"
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      {emptyFields.includes('description') && (
        <div className="error">Please enter a details.</div>
      )}

      <button type="submit" className="addjewbtn">
        Add Jewellery
      </button>
      {error && <div className="error">{error}</div>}

      {/* <Link to={'/JewelleryAdminDashboard'}>
                <button className="baktohomebtn">Back to Home</button>
            </Link> */}
      <button
        className="baktohomebtn"
        onClick={() => (window.location.href = '/JewelleryAdminDashboard')}
      >
        Back to Home
      </button>
    </form>
  );
};

export default JewelleryAddForm;
