import React from 'react';
import Header from '../components/Header';


const AboutUsPage = () => {
  const company = {
    name: "ABC Company",
    mission: "Our mission is to provide innovative solutions that simplify everyday tasks.",
    values: ["Excellence", "Integrity", "Collaboration", "Customer Focus"],
    history: "Founded in 2010, ABC Company has been at the forefront of revolutionizing the industry.",
    milestones: [
      { year: 2012, event: "Reached 100,000 satisfied customers" },
      { year: 2015, event: "Expanded operations to international markets" },
      { year: 2018, event: "Received the Industry Innovation Award" }
    ],
    team: [
      { name: "John Doe", role: "CEO", expertise: "Business Strategy" },
      { name: "Jane Smith", role: "CTO", expertise: "Software Development" },
      { name: "Sarah Johnson", role: "Marketing Director", expertise: "Digital Marketing" }
    ],
    products: [
      { name: "Product A", description: "A revolutionary tool that streamlines workflow processes." },
      { name: "Product B", description: "An advanced analytics platform for data-driven insights." },
      { name: "Product C", description: "A user-friendly mobile app for seamless task management." }
    ],
    testimonials: [
      { name: "Michael Adams", comment: "ABC Company has exceeded my expectations. Their products have truly transformed my business." },
      { name: "Emily Wilson", comment: "The team at ABC Company is knowledgeable and professional. They provided excellent customer support throughout the entire process." }
    ],
    awards: ["Best Software Company 2022", "Customer Service Excellence Award"],
    socialResponsibility: "ABC Company actively supports various environmental initiatives and collaborates with local charities to give back to the community.",
    contact: {
      address: "123 Main Street, City, Country",
      phone: "+1 123-456-7890",
      email: "info@abccompany.com",
      socialMedia: {
        facebook: "https://www.facebook.com/abccompany",
        twitter: "https://www.twitter.com/abccompany",
        instagram: "https://www.instagram.com/abccompany"
      }
    }
  };

  return (
    <>
    <Header />
    <div>
      <h1>{company.name}</h1>
      <h3>Mission: {company.mission}</h3>
      <h4>Values: {company.values.join(', ')}</h4>

      <h2>Company History</h2>
      <p>{company.history}</p>
      <ul>
        {company.milestones.map((milestone, index) => (
          <li key={index}>{milestone.year} - {milestone.event}</li>
        ))}
      </ul>

      <h2>Our Team</h2>
      {company.team.map((member, index) => (
        <div key={index}>
          <h3>{member.name} - {member.role}</h3>
          <p>Expertise: {member.expertise}</p>
        </div>
      ))}

      <h2>Our Products</h2>
      {company.products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}

      <h2>Testimonials</h2>
      {company.testimonials.map((testimonial, index) => (
        <div key={index}>
          <p>"{testimonial.comment}"</p>
          <p>- {testimonial.name}</p>
        </div>
      ))}

      <h2>Awards and Recognitions</h2>
      <ul>
        {company.awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>

      <h2>Social Responsibility</h2>
      <p>{company.socialResponsibility}</p>

      <h2>Contact Information</h2>
      <p>Address: {company.contact.address}</p>
      <p>Phone: {company.contact.phone}</p>
      <p>Email: {company.contact.email}</p>
      <p>
        Social Media:
        <a href={company.contact.socialMedia.facebook}>Facebook</a>,
        <a href={company.contact.socialMedia.twitter}>Twitter</a>,
        <a href={company.contact.socialMedia.instagram}>Instagram</a>
      </p>
    </div>
    </>
  );
}

export default AboutUsPage;
