import { Link } from "react-router-dom";
import { useJewelleryesContext } from "../hooks/useJewelleryesContext";
import { useState } from "react";
import Swal from "sweetalert2";

import "../CSS/JewellAdmin.css";

const JewelleryDetails = ({ jewellery }) => {
  const { dispatch } = useJewelleryesContext();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        const deleteJewellery = async () => {
          const response = await fetch("/api/jewelleryes/" + jewellery._id, {
            method: "DELETE",
          });
    
          const json = await response.json();
    
          if (response.ok) {
            dispatch({ type: "DELETE_JEWELLERY", payload: json });
            window.location.reload();
          }
        };

        deleteJewellery();
      }
    });
  };

  const handleUpdate = async () => {
    const response = await fetch("/api/jewelleryes/" + jewellery._id, {
      method: "PATCH",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_JEWELLERY", payload: json });
    }
  };

  return (
    <>
      <div className="jewellery-details">
        <div className="jewBox">
          <h4>{jewellery.name}</h4>
          <p>
            <strong>Type: </strong>
            {jewellery.type}
          </p>
          <p>
            <strong>Gender: </strong>
            {jewellery.gender}
          </p>

          <p>
            <strong>Metal: </strong>
            {jewellery.metal}
          </p>
          <p>
            <strong>Gemstone: </strong>
            {jewellery.gemstone}
          </p>
          <p>
            <strong>Description: </strong>
            {jewellery.description}
          </p>
          <p>
            <strong>Price: $.</strong>
            {jewellery.price}/=
          </p>
          <p>
            <strong>Added Date: </strong>
            {jewellery.createdAt}
          </p>

          <div >
            {jewellery.jewellery_img && (
              <img
                src={jewellery.jewellery_img}
                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }}
              />
            )}
          </div>
          <button
            className="JewdeleteButton"
            onClick={handleDelete}
          >
            delete
          </button>

          <button
            className="JewupdateButton"
            onClick={() =>
              (window.location.href = `/UpdateJewelleryes/${jewellery._id}`)
            }
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default JewelleryDetails;
