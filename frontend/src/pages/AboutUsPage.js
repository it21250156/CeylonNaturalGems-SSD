import React from 'react';
import Header from '../components/Header';

const AboutUsPage = () => {
    const company = {
      name: "Ceylon Natual Gems",
      mission: "At Ceylon Natual Gems, we aim to provide exquisite gemstones and jewelry that reflect timeless beauty and exceptional craftsmanship.",
      values: ["Quality", "Elegance", "Customer Satisfaction"],
      history: "Established in 2005, Ceylon Natual Gems has been a trusted name in the industry, delivering stunning gemstones and jewelry to customers worldwide.",
      milestones: [
        { year: 2008, event: "Expanded product line to include diamond jewelry" },
        { year: 2012, event: "Introduced online shopping experience for customers" },
        { year: 2015, event: "Opened physical showroom in downtown" }
      ],
      team: [
        { name: "Ruchirage Thaththa", role: "Founder", expertise: "Gemstone Procurement" },
        { name: "Ruchira", role: "Lead Designer", expertise: "Jewelry Design" },
        { name: "Api", role: "Marketing Director", expertise: "Digital Marketing" }
      ],
      products: [
        { name: "Ruby Pendant", description: "A breathtaking pendant featuring a vibrant red ruby surrounded by sparkling diamonds." },
        { name: "Sapphire Ring", description: "An elegant ring showcasing a mesmerizing blue sapphire, exuding sophistication and charm." },
        { name: "Emerald Earrings", description: "Gorgeous earrings adorned with lush green emeralds, perfect for adding a touch of glamour to any outfit." }
      ],
      testimonials: [
        { name: "Michael Adams", comment: "Ceylon Natual Gems's jewelry is truly captivating. The craftsmanship and attention to detail are exceptional." },
        { name: "Emily Wilson", comment: "I am extremely pleased with my purchase from Ceylon Natual Gems. The quality of the gemstone is remarkable, and the customer service was top-notch." }
      ],
      awards: ["Best Jewelry Store 2021", "Customer Choice Award"],
      socialResponsibility: "Ceylon Natual Gems is committed to ethically sourcing gemstones and supports initiatives that promote responsible mining practices.",
      contact: {
        address: "456 Jewel Street, City, Country",
        phone: "+1 123-456-7890",
        email: "info@gemstonesparkle.com",
        socialMedia: {
          facebook: "https://www.facebook.com/gemstonesparkle",
          twitter: "https://www.twitter.com/gemstonesparkle",
          instagram: "https://www.instagram.com/gemstonesparkle"
        }
      }
    };
  

  return (
    <>
    <Header />
    <div>
      <h1>{company.name}</h1>
      <h3 >Mission: {company.mission}</h3>
      <h4>Values: {company.values.join(', ')}</h4>

      <h2 >Company History</h2>
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

      <h2 >Our Products</h2>
      {company.products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}

      <h2 >Testimonials</h2>
      {company.testimonials.map((testimonial, index) => (
        <div key={index}>
          <p>"{testimonial.comment}"</p>
          <p>- {testimonial.name}</p>
        </div>
      ))}

      <h2 >Awards and Recognitions</h2>
      <ul>
        {company.awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>

      <h2 >Social Responsibility</h2>
      <p>{company.socialResponsibility}</p>

      <h2 >Contact Information</h2>
      <p>Address: {company.contact.address}</p>
      <p>Phone: {company.contact.phone}</p>
      <p>Email: {company.contact.email}</p>
      <p>
        Social Media:
        <a href={company.contact.socialMedia.facebook} ><i ></i></a>
        <a href={company.contact.socialMedia.twitter} ><i ></i></a>
        <a href={company.contact.socialMedia.instagram} ><i></i></a>
      </p>
    </div>
    </>
  );
}

export default AboutUsPage;
