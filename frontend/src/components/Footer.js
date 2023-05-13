import React from 'react';
import '../CSS/Footer.css';
import icn1 from '../images/fb.png';
import icn2 from '../images/ig.png';
import icn3 from '../images/yt.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-body">
        <div className="col-1">
          <div className="map">map</div>
          <div className="static-pages-1">
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className="col-2">
          <div className="static-pages-2">
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Return & Refund Policy</p>
            <p>Shipping Policy</p>
          </div>
          <div className="icons">
            <img src={icn1} className="icn-space" alt="Facebook" />
            <img src={icn3} className="icn-space" alt="Youtube" />
            <img src={icn2} className="icn-space" alt="Instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
