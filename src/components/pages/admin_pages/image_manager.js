import React, { useState } from "react";
import GManagement from "./gallerymanager";
import Manager from "./uploadmanager";

export default function ImageManager() {
  const tabs = ["Upload Images", "Manage Images"];
  const [activeTab, setActiveTab] = useState("Manage Images");

  function render_tabs(activeTab) {
    switch (activeTab) {
      case "Upload Images":
        return <Manager />;
      case "Manage Images":
        return <GManagement />;

      default:
        return null;
    }
  }
  return (
    <div>
      <div className="manager">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "btn blue active" : "btn sand active"}>
            {tab}
          </button>
        ))}
      </div>
      {render_tabs(activeTab)}
    </div>
  );
}
