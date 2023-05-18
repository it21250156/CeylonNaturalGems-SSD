import React, { useEffect } from 'react';
import '../CSS/Footer.css';
import icn1 from '../images/fb.png';
import icn2 from '../images/ig.png';
import icn3 from '../images/yt.png';

const Footer = () => {
  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDy5O9wKwx8hJIbyK9dIk-727bhdkvwKGc&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up Google Maps API script
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Initialize Google Maps
    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.505, lng: -0.09 },
        zoom: 13,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: 51.505, lng: -0.09 },
        map,
        title: 'Sample Location Marker',
      });
    }
  }, []);

  return (
    <footer>
      <div className="footer-body">
        <div className="col-1">
          <div className="map">
            <div id="map" style={{ height: '100%', width: '100%' }} />
          </div>
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
