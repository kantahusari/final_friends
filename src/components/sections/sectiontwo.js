import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadTabs } from "../store/storeslice";
export default function SectionTwo() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  function handleNavigate(tab) {
    dispatch(loadTabs({ activeTab: tab }));
  }
  const testimonials = [
    {
      id: 1,
      name: "John & Sarah Thompson",
      text: "BuildMaster transformed our basement into a beautiful living space. Their attention to detail and professionalism was exceptional.",
      project: "Basement Development",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      text: "The deck they built has become our favorite family gathering spot. Quality materials and craftsmanship throughout.",
      project: "Custom Deck Building",
    },
    {
      id: 3,
      name: "Lisa Chen",
      text: "After our kitchen flood, BuildMaster repaired everything perfectly. You'd never know there was any damage.",
      project: "Floor and Wall Repair",
    },
  ];
  return (
    <Fragment>
      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <p>"{testimonial.text}"</p>
                <div className="testimonial-meta">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Contact us today for a free, no-obligation estimate on your project</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleNavigate("Contact Us");
            }}
          >
            Get Your Free Estimate
          </button>
        </div>
      </section>
    </Fragment>
  );
}
