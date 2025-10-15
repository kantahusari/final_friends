import React, { useEffect, useState, Fragment } from "react";
import Logo from "../custom/logo";
import { useSelector, useDispatch } from "react-redux";
import { loadTabs } from "../store/storeslice";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import img from "../assets/images/final_logo.png";
import info from "../custom/info";
import { adminService } from "../serviceworker/admin";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Communication from "../custom/communication";

export default function Navigation() {
  const communicate = Communication();
  const navigate = useNavigate();
  const fixed_logo = 25;
  const fixed_font = 3;
  const [burgerClicked, setburgerClicked] = useState(false);
  const [screen, setscreen] = useState(window.innerWidth);
  const [width, setwidth] = useState((window.innerWidth * fixed_logo) / 100);
  const [fontSize, setfontSize] = useState((window.innerWidth * fixed_font) / 100);

  const [workhours, setworkhours] = useState([]);

  const handleBurgerClick = () => {
    setburgerClicked(!burgerClicked);
  };

  const handleResize = () => {
    if (window.innerWidth > 1470) {
      setburgerClicked(false);
    } else {
    }
    setscreen(window.innerWidth);
    setwidth((window.innerWidth * fixed_logo) / 100);
    setfontSize((window.innerWidth * fixed_font) / 100);
  };

  function handleNavigate(tab) {
    navigate(`/${tab === "Home" ? "Home" : tab === "Our Company" ? "About" : tab === "Services" ? "Services" : tab === "Gallery" ? "Gallery" : tab === "Contact Us" ? "Contact" : ""}`);
    handleBurgerClick();
  }

  function top() {
    return (
      <div className="top" style={{ display: screen <= 647 ? "none" : "flex" }}>
        <div className="top_left">
          <MdOutlinePhoneAndroid />
          <div onClick={() => communicate("phone")}>{info.phone}</div>
          <HiOutlineMailOpen />
          <div onClick={() => communicate("email")}>{info.email}</div>
          <IoTimeOutline />
          <OverlayTrigger
            key="bottom"
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Header as="h3">{`Working Hours`}</Popover.Header>
                <Popover.Body>{workhours.length > 0 ? workhours.map((item, index) => <div key={index}>{item.is_working === 1 ? `${item.day}: ${item.start} - ${item.end}` : `${item.day}: Closed`}</div>) : "No Working Hours Available"}</Popover.Body>
              </Popover>
            }
          >
            <div className="wh">Working Hours</div>
          </OverlayTrigger>
        </div>
        <div className="top_right">
          <FaFacebook />
          <FaInstagram />
        </div>
      </div>
    );
  }

  function nav_list() {
    return (
      <div className={screen >= 1471 ? "me-auto" : "me-auto-zipped"}>
        <div
          onClick={() => {
            handleNavigate("Home");
          }}
        >
          Home
        </div>
        <div
          onClick={() => {
            handleNavigate("Our Company");
          }}
        >
          Our Company
        </div>
        <div
          onClick={() => {
            handleNavigate("Services");
          }}
        >
          Services
        </div>
        <div
          onClick={() => {
            handleNavigate("Gallery");
          }}
        >
          Gallery
        </div>
        <div
          onClick={() => {
            handleNavigate("Contact Us");
          }}
        >
          Contact Us
        </div>
        <div
          onClick={() => {
            navigate("/Login");
          }}
        >
          Login
        </div>
      </div>
    );
  }

  function navbar() {
    return (
      <div className="nav">
        <div className="nav_left">
          <img alt="logo" src={img} width={`${width}px`} className="logo" />
          <h1>{info.company}</h1>
        </div>
        <div className="nav_right">
          {screen >= 1471 ? (
            nav_list()
          ) : (
            <Fragment>
              {burgerClicked ? nav_list() : null}
              <GiHamburgerMenu className="hamburger-icon" onClick={handleBurgerClick} />
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
    <Fragment>
      {top()}
      {navbar()}
    </Fragment>
  );
}
