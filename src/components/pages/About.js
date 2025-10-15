// pages/About.js
import React from "react";

const About = () => {
  return (
    <div className="page about">
      <div className="page_header">
        <main>Our Company</main>
      </div>

      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Two Decades of Building Dreams</h2>
              <p>Building excellence since 2003</p>
              <p>Founded in 2003, Friends Renos LTD began as a small local contractor with a big vision: to deliver exceptional construction services with uncompromising quality. What started as a modest operation has grown into a respected company with both domestic and international experience.</p>

              <p>Our journey has taken us from residential projects in our hometown to commercial developments across borders. This diverse experience has given us unique insights into different construction techniques, materials, and design approaches that we bring to every project.</p>

              <p>Despite our growth, we've maintained our commitment to the principles that built our reputation: integrity, craftsmanship, and customer satisfaction. Each project receives the same careful attention, whether it's a small repair or a complete home transformation.</p>
            </div>
            <div className="story-stats">
              <div className="stat">
                <h3>20+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality Craftsmanship</h3>
              <p>We never cut corners. Every project is executed with precision and attention to detail, using quality materials and proven techniques.</p>
            </div>
            <div className="value-card">
              <h3>Integrity & Transparency</h3>
              <p>We believe in honest communication, fair pricing, and keeping our promises. No hidden costs, no surprises.</p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority. We listen carefully to your needs and work collaboratively to bring your vision to life.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
