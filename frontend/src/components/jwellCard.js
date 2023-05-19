import '../CSS/jwellCard.css';
import '../CSS/BodyTemp.css';
import { Link } from 'react-router-dom';

function JewelCard(Jewel) {
  const { Jwl } = Jewel;
  return (
    <div className="card">
      <div className="card-content">
        <div>
          {Jwl.jewellery_img && (
            <img
              className="jewel-card-img"
              src={Jwl.jewellery_img}
              alt="Jewellery IMG"
            />
          )}
        </div>
        <p className="card-name">{Jwl.name}</p>
        <p className="card-price">${Jwl.price}</p>
      </div>
      <Link to={`/jwellscreen/${Jwl._id}`}>
        <button className="card-button">Read More</button>
      </Link>
    </div>
  );
}

export default JewelCard;
