import { useState } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import '../CSS/GemDetails.css';

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
  <div className="gem-card">
    <h4 className="gem-card__title">{gem.name}</h4>
    <p className="gem-card__info">
      <strong className="gem-card__label">Type: </strong>
      <span className="gem-card__value">{gem.type}</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Shape: </strong>
      <span className="gem-card__value">{gem.shape}</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Size: </strong>
      <span className="gem-card__value">{gem.size}ct(s)</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Color: </strong>
      <span className="gem-card__value">{gem.color}</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Quantity: </strong>
      <span className="gem-card__value">{gem.quantity}</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Price: $</strong>
      <span className="gem-card__value">{gem.price}/=</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Description: </strong>
      <span className="gem-card__value">{gem.description}</span>
    </p>

    <p className="gem-card__info">
      <strong className="gem-card__label">Added Date: </strong>
      <span className="gem-card__value">{new Date(gem.createdAt).toLocaleString()}</span>
    </p>

    <button className="gem-card__deleteButton" onClick={() => setShowModal(true)}>
      delete
    </button>

    <Link to={`/UpdateGems/${gem._id}`}>
      <button className="gem-card__updateButton">update</button>
    </Link>

    {showModal && (
      <ConfirmationModal
        message="Are you sure you want to delete this gem?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )}
  </div>
</div>

  );
};

export default GemDetails;
