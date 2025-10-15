import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

import { logout } from "../store/storeslice";
import { adminService } from "../serviceworker/admin";
import { authService } from "../serviceworker/authService";

import { get_image_count } from "../store/storeslice";
import { get_count } from "../store/storeslice";

import { IoIosImages } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import Days from "./admin_pages/days";
import Categories from "./admin_pages/categories";
import Messages from "./admin_pages/messages";
import Change from "./admin_pages/change";

import ImageManager from "./admin_pages/image_manager";

export default function Admin() {
  const dispatch = useDispatch();
  const imagecount = useSelector((state) => state.image_count.imagecount);
  const count = useSelector((state) => state.message.count);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Messages");

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/Home", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(logout());
      navigate("/Home", { replace: true });
    }
  };

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function render_tabs(activeTab) {
    switch (activeTab) {
      case "Gallery":
        return <ImageManager />;
      case "Messages":
        return <Messages />;
      case "Schedule":
        return <Days />;
      case "Categories":
        return <Categories />;
      case "Change":
        return <Change />;
      default:
        return null;
    }
  }
  const fetchcounts = useCallback(async () => {
    const c_result = await adminService.get_unread_messages();
    const i_result = await adminService.getFilesCount();
    dispatch(get_count({ count: c_result.unread }));
    dispatch(get_image_count({ imagecount: i_result.imagecount }));
  }, [dispatch]);

  useEffect(() => {
    fetchcounts();
  }, [fetchcounts, activeTab]);

  function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <Fragment>
        <button variant="primary" onClick={handleShow} className="btn">
          {name}
        </button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>TCM Admin</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar_item" onClick={() => handleTabClick("Gallery")} style={{ backgroundColor: activeTab === "Gallery" ? "#80db39ff" : "white" }}>
              {imagecount} <IoIosImages /> Gallery
            </div>

            <div className="sidebar_item" onClick={() => handleTabClick("Messages")} style={{ backgroundColor: activeTab === "Messages" ? "#80db39ff" : "white" }}>
              {count}
              <BiSolidMessageSquareDetail />
              Messages
            </div>

            <div className="sidebar_item" onClick={() => handleTabClick("Schedule")} style={{ backgroundColor: activeTab === "Schedule" ? "#80db39ff" : "white" }}>
              <RiCalendarScheduleFill />
              Manage Schedule
            </div>

            <div className="sidebar_item" onClick={() => handleTabClick("Categories")} style={{ backgroundColor: activeTab === "Categories" ? "#80db39ff" : "white" }}>
              <MdOutlineCategory />
              Manage Categories
            </div>
            <div className="sidebar_item" onClick={() => handleTabClick("Change")} style={{ backgroundColor: activeTab === "Change" ? "#80db39ff" : "white" }}>
              <RiAdminFill />
              Change Password
            </div>

            <div className="sidebar_item" onClick={handleLogout}>
              <CiLogout />
              Logout
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </Fragment>
    );
  }

  return (
    <div className="admin_dashboard">
      <div className="admin_header">
        <h1>Friends Reno Admin</h1>
      </div>
      <div className="admin_sidebar">
        <OffCanvasExample placement="start" name="Menu" />
      </div>

      <div className="admin_main_content">{render_tabs(activeTab)}</div>
    </div>
  );
}
