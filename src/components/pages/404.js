import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadTabs } from "../store/storeslice";
import info from "../custom/info";
export default function NotFound() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const activeTab = useSelector((state) => state.tabs.activeTab);
  function handleNavigate(tab) {
    dispatch(loadTabs({ activeTab: "Home" }));
    navigate(`/${tab.replace(/\s+/g, "")}`);
  }
  return (
    <div className="not-found">
      <div className="page_header company">
        <main>{info.company}</main>
      </div>
      <br />
      <h1>404 Opps !</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        className="btn btn-secondary"
        onClick={() => {
          handleNavigate("Home");
        }}
      >
        Home Page
      </button>
    </div>
  );
}
