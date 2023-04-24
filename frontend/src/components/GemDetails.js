import { useState } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const GemDetails = ({ gem }) => {
  const { dispatch } = useGemsContext();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const response = await fetch('/api/gems/' + gem._id, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_GEM', payload: json });
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleDelete();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="gem-details">
      <h4>{gem.name}</h4>
      <p>
        <strong>Type: </strong>
        {gem.type}
      </p>

      <p>
        <strong>Shape: </strong>
        {gem.shape}
      </p>

      <p>
        <strong>Size: </strong>
        {gem.size}ct(s)
      </p>

      <p>
        <strong>Color: </strong>
        {gem.color}
      </p>

      <p>
        <strong>Quantity: </strong>
        {gem.quantity}
      </p>

      <p>
        <strong>Price: Rs.</strong>
        {gem.price}/=
      </p>

      <p>
        <strong>Description: </strong>
        {gem.description}
      </p>

      <p>
        <strong>Added Date: </strong>
        {new Date(gem.createdAt).toLocaleString()}
      </p>

      <button className="deleteButton" onClick={() => setShowModal(true)}>
        delete
      </button>

      <Link to={`/UpdateGems/${gem._id}`}>
        <button className="updateButton">update</button>
      </Link>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this gem?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default GemDetails;
