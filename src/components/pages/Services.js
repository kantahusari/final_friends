// pages/Services.js
import React from "react";

const Services = () => {
  const serviceCategories = [
    {
      title: "Wall Systems & Finishes",
      services: ["Drywall Installation", "Mudding & Taping", "Texturing", "Wall Repair", "Painting"],
      description: "From initial framing to the final coat of paint, we handle all aspects of wall construction and finishing for flawless results.",
    },
    {
      title: "Interior Transformations",
      services: ["Basement Development", "Flooring Installation", "Drop Ceilings", "Baseboard & Trim"],
      description: "Transform underutilized spaces into functional, beautiful areas of your home with our comprehensive interior services.",
    },
    {
      title: "Structural & Carpentry",
      services: ["Framing", "Window & Door Installation", "Custom Carpentry", "Deck Construction", "Fence Building"],
      description: "Solid structural work is the foundation of any quality construction project. Our expertise ensures durability and precision.",
    },
  ];

  return (
    <div className="page services">
      <div className="page_header">
        <main>Our Services</main>
      </div>

      <section className="services-intro">
        <div className="container">
          <h2>Expertise Across All Construction Phases</h2>
          <p>Comprehensive construction solutions for residential and commercial properties</p>
          <p>With over two decades of experience, we offer end-to-end solutions for your construction and renovation needs. From structural work to finishing touches, our skilled team delivers quality results at every stage of your project.</p>
        </div>
      </section>

      <section className="service-categories">
        <div className="container">
          {serviceCategories.map((category, index) => (
            <div key={index} className="service-category">
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul>
                  {category.services.map((service, i) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="container">
          <h2>Our Process</h2>
          <div className="process-steps">
            <div className="step">
              <h3>1. Consultation</h3>
              <p>We discuss your vision, requirements, and budget to understand your project goals.</p>
            </div>
            <div className="step">
              <h3>2. Planning</h3>
              <p>Our team creates a detailed plan and timeline for your project with transparent pricing.</p>
            </div>
            <div className="step">
              <h3>3. Execution</h3>
              <p>We perform the work with precision, keeping you informed throughout the process.</p>
            </div>
            <div className="step">
              <h3>4. Completion</h3>
              <p>We ensure your complete satisfaction with a final walkthrough and address any questions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
