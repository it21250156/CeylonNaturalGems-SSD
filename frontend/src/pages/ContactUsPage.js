import React from 'react';
import Header from '../components/Header';


const ContactUsPage = () => {
  const company = {
    name: "Ceylon Natural Gems",
    address: "456 Jewel Street, City, Country",
    phone: "+1 123-456-7890",
    email: "info@gemstonesparkle.com"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
    <Header />
    <div className="container">
      <h1 className="mt-4">Contact Us</h1>
      <p>For any inquiries or assistance, please feel free to reach out to us. We'll be happy to help!</p>

      <div className="row">
        <div className="col-md-6">
          <h2>Contact Information</h2>
          <p>
            <strong>Address:</strong> {company.address}<br />
            <strong>Phone:</strong> {company.phone}<br />
            <strong>Email:</strong> {company.email}
          </p>
        </div>

        <div className="col-md-6">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactUsPage;
