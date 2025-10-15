// pages/Contact.js
import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import info from "../custom/info";
import { adminService } from "../serviceworker/admin";
import { IoTimeOutline } from "react-icons/io5";
import Communication from "../custom/communication";

const Contact = () => {
  const communicate = Communication();
  const [workhours, setworkhours] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function resetForm() {
    setFormData({
      name: "",
      phone: "",
      subject: "",
      email: "",
      message: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      alert("Please enter a valid name.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (formData.subject.length < 5) {
      alert("Subject must be at least 5 characters long.");
      return;
    }
    if (formData.message.length < 10) {
      alert("Message must be at least 10 characters long.");
      return;
    }
    if (/['";]/.test(formData.name) || /['";]/.test(formData.email) || /['";]/.test(formData.subject) || /['";]/.test(formData.message)) {
      alert("Please avoid using special characters.");
      return;
    }
    const data = { name: formData.name, phone: formData.phone, email: formData.email, subject: formData.subject, mcontent: formData.message };
    console.log(data);
    try {
      await adminService.add_message(data);
      alert("Your message has been sent successfully!");
      resetForm();
      return;
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
      return;
    }
  };
  const working_hours = async () => {
    try {
      const hours = await adminService.working_hours();
      setworkhours(hours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
    }
  };
  useEffect(() => {
    working_hours();
  }, []);

  return (
    <div className="page contact">
      <div className="page_header">
        <main>Contact Us</main>
      </div>
      <section className="contact-content">
        <div className="container">
          <div className="contact-info">
            <h2>Get Your Free Estimate</h2>
            <p>Get in touch for a free estimate or to discuss your project</p>
            <p>Fill out the form below and we'll get back to you within 24 hours to discuss your project and provide a free, no-obligation estimate.</p>

            <div className="contact-details">
              <h3>Contact Information</h3>
              <p onClick={() => communicate("phone")}>
                <strong>Phone:</strong> {info.phone}
              </p>
              <p onClick={() => communicate("email")}>
                <strong>Email:</strong> {info.email}
              </p>
              <p>
                <strong>
                  Business Hours: <IoTimeOutline />
                </strong>
                {workhours.length > 0 ? workhours.map((item, index) => <div key={index}>{item.is_working === 1 ? `${item.day}: ${item.start} - ${item.end}` : `${item.day}: Closed`}</div>) : "No Working Hours Available"}
              </p>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
