/* eslint-disable no-unreachable */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "../pages/home";
import OurCompany from "../pages/About";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import ContactUs from "../pages/Contact";
// import Login from "../pages/Login";

export default function SceneGenerator() {
  const activeTab = useSelector((state) => state.tabs.activeTab);

  switch (activeTab) {
    case "Home":
      return <Home />;
      break;
    case "Our Company":
      return <OurCompany />;
      break;
    case "Services":
      return <Services />;
      break;
    case "Gallery":
      return <Gallery />;
      break;
    case "Contact Us":
      return <ContactUs />;
      break;
    default:
      return <Home />;
      break;
  }
}
