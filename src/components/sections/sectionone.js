import React, { useEffect, useState, useRef, Fragment } from "react";

import info from "../custom/info";
export default function SectionOne() {


  return (
    <Fragment>
      <section className="section">
        <div className="page_header company">
          <main>{info.company}</main>
        </div>
        {/* <h1 className="company"></h1> */}
        <br></br>
        <h2>Expert Construction Services with 20+ Years Experience</h2>
        <p>Domestic and international expertise in transforming spaces with quality craftsmanship</p>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why Choose BuildMaster?</h2>
          <div className="features">
            <div className="feature">
              <h3>Two Decades of Excellence</h3>
              <p>With over 20 years in the industry, we've perfected our techniques and processes to deliver superior results.</p>
            </div>
            <div className="feature">
              <h3>Comprehensive Services</h3>
              <p>From framing to finishing touches, we handle all aspects of construction and renovation.</p>
            </div>
            <div className="feature">
              <h3>Quality Craftsmanship</h3>
              <p>We take pride in every project, ensuring attention to detail and exceptional results.</p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
