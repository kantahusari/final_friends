import React from "react";
import info from "../custom/info";
import Communication from "../custom/communication";
export default function Footer() {
  const communicate = Communication();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{info.company}</h3>
            <p>Quality craftsmanship for over 20 years</p>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p onClick={() => communicate("email")}>Email: {info.email}</p>
            <p onClick={() => communicate("phone")}>Phone: {info.phone}</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Free Estimate</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {info.company} {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
