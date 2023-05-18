import react, { useEffect, useState } from "react";
import { useJewelleryesContext } from "../hooks/useJewelleryesContext";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";

function UpdateJewellery() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const { _id } = useParams();
  const { jewelleryes, dispatch } = useJewelleryesContext();
  const [jewellery, setJewellery] = useState({});

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [gemstone, setGemstone] = useState("");
  const [metal, setMetal] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedGender, setSelectedGender] = useState(jewellery.gender);
  const [selectedGemstone, setSelectedGemstone] = useState(jewellery.gemstone);
  const [selectedMetal, setSelectedMetal] = useState(jewellery.metal);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const nav = useNavigate();

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
      setImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const jewellery = {name, type, gender, gemstone, metal, description, price}

    const emptyFields = [];

    if (name === "") {
      emptyFields.push("name");
    }

    if (type === "") {
      emptyFields.push("type");
    }

    if (gender === "") {
      emptyFields.push("gender");
    }

    if (gemstone === "") {
      emptyFields.push("gemstone");
    }

    if (metal === "") {
      emptyFields.push("metal");
    }

    if (description === "") {
      emptyFields.push("description");
    }

    if (price === "") {
      emptyFields.push("price");
    }

    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      setError("Please fill in all required fields.");
      return;
    }

    if (images.length > 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("gender", gender);
      formData.append("metal", metal);
      formData.append("gemstone", gemstone);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", images[0]);

      const response = await fetch(`/api/jewelleryes/${_id}`, {
        method: "PATCH",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      window.alert("Jewellery details were successfully updated!");
    }

    nav("/JewelleryAdminDashboard");
  };

  useEffect(() => {
    const fetchJewelleryes = async () => {
      const response = await fetch(`/api/jewelleryes/${_id}`);
      const json = await response.json();

      setJewellery(json);
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        setName(json.name);
        setType(json.type);
        setGender(json.gender);
        setGemstone(json.gemstone);
        setMetal(json.metal);
        setDescription(json.description);
        setPrice(json.price);
        setError(null);
        setEmptyFields([]);
        console.log(response);
        setSelectedGender(json.gender);
        setSelectedGemstone(json.gemstone);
        setSelectedMetal(json.metal);
      }
    };
    fetchJewelleryes();
  }, []);

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
                <Link to={"/adminHome"}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="Updatejewellery">
        {/* {JSON.stringify(jewellery)} */}

        <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
          <h3>Update Jewellery</h3>
          <div className="jewinputbox">
            <label className="jewAddlabel">Jewellery Name: </label>
            <div className="jewInput">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes("name") ? "error" : ""}
              />
              {emptyFields.includes("name") && (
                <div className="error">Please enter a name.</div>
              )}

              <label className="jewAddlabel">Jewellery Type: </label>
              <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes("type") ? "error" : ""}
              />
              {emptyFields.includes("type") && (
                <div className="error">Please enter a type.</div>
              )}

              <label className="jewAddlabel">Gender: </label>
              <select
                name="gender"
                value={selectedGender}
                defaultValue=""
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setGender(e.target.value);
                }}
                className="gender-select"
              >
                <option value="">Select a gender</option>
                <option value="Male">Men</option>
                <option value="Female">Women</option>
              </select>

              {emptyFields.includes("Gender") && (
                <div className="error">Please select a gender.</div>
              )}

              {/* <label className="jewAddlabel">Gender: </label>
        <select name="gender" onChange={e=>selectedGender(e.target.value)}>
          <option value=""></option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
        </select>
//         {emptyFields.includes('gender') && <div className="error">Please enter a gender.</div>}
//  */}

              <label className="jewAddlabel">Metal: </label>
              <select
                name="metal"
                value={selectedMetal}
                defaultValue=""
                onChange={(e) => {
                  setSelectedMetal(e.target.value);
                  setMetal(e.target.value);
                }}
                className="metal-select"
              >
                <option value="">Select a metal</option>
                <option value="GOLD">GOLD</option>
                <option value="SILVER">SILVER</option>
              </select>

              {/* <label className="jewAddlabel">Gemstone: </label>
        <select name="gemstone" onChange={e=>selectedGemstone(e.target.value)}>
          <option value="">Select a gemstone</option>
          <option value="Blue Sapphire">Blue Sapphire</option>
          <option value="Pink Sapphire">Pink Sapphire</option>
          <option value="Green Sapphire">Green Sapphire</option>
          <option value="Emarald">Emarald</option>
          <option value="Ruby">Ruby</option>
          <option value="Moonstone">Moonstone</option>
        </select> */}
              {emptyFields.includes("Metal") && (
                <div className="error">Please select a metal.</div>
              )}

              {/* <label className="jewAddlabel">Metal: </label>
        <select name="metal" onChange={e=>selectedMetal(e.target.value)}>
          <option value="">Select a metal</option>
          <option value="GOLD">GOLD</option>
          <option value="SILVER">SILVER</option>
        </select> */}

              <label className="jewAddlabel">Gemstone: </label>
              <select
                name="gemstone"
                value={selectedGemstone}
                defaultValue=""
                onChange={(e) => {
                  setSelectedGemstone(e.target.value);
                  setGemstone(e.target.value);
                }}
                className="gemstone-select"
              >
                <option value="Blue Sapphire">Blue Sapphire</option>
                <option value="Yellow Sapphire">Yellow Sapphire</option>
                <option value="Pink Sapphire">Pink Sapphire</option>
                <option value="Green Sapphire">Green Sapphire</option>
                <option value="Emarald">Emarald</option>
                <option value="Ruby">Ruby</option>
                <option value="Moonstone">Moon Stone</option>
                <option value="Opal">Opal</option>
                <option value="Tourmaline">Tourmaline</option>
                <option value="Turquoies">Turquoies</option>
                <option value="Cat's Eye">Cat's Eye</option>
              </select>
              {emptyFields.includes("Gemstone") && (
                <div className="error">Please selecta gemstone.</div>
              )}

              <label className="jewAddlabel">Description: </label>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes("description") ? "error" : ""}
              />
              {emptyFields.includes("description") && (
                <div className="error">Please enter a description.</div>
              )}

              <label className="jewAddlabel">Jewellery Price: </label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes("price") ? "error" : ""}
              />
              {emptyFields.includes("price") && (
                <div className="error">Please enter a price.</div>
              )}
            </div>

            <br />
            <br />

            <label className="jewAddlabel">Upload Images:</label>
            <input
              type="file"
              name="image"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleFileChange}
            ></input>
          </div>
          <br />
          <br />
          <br />
          <br />

          <button type="submit">Update Jewellery</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default UpdateJewellery;
