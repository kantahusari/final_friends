import React, { useState, useEffect } from "react";
import { adminService } from "../../serviceworker/admin";

export default function Categories() {
  const [category, setcategory] = useState("");
  const [cdata, setcdata] = useState([]);

  function fetchCategories() {
    adminService.get_category().then((res) => {
      setcdata(res);
    });
  }

  async function delete_category(id) {
    const confirm = window.confirm("Please Notice that deleting a category will also remove all associated images. Are you sure you want to proceed?");
    if (!confirm) return;
    await adminService.delete_category({ id });
    fetchCategories();
  }

  async function add_category() {
    if (category === "") {
      alert("Category name cannot be empty.");
      return;
    }
    var trimmed = category.trim();
    if (trimmed.length < 3) {
      alert("Category name must be at least 3 characters long.");
      return;
    }
    trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    if (cdata.some((cat) => cat.category.toLowerCase() === trimmed.toLowerCase())) {
      alert("Category already exists.");
      return;
    }
    await adminService.add_category({ category: trimmed });
    setcategory("");
    fetchCategories();
  }

  function render_add() {
    return (
      <div className="time_selection">
        <table className="days_table">
          <thead>
            <tr>
              <th className="days_th"></th>
              <th className="days_th"></th>
              <th className="days_th"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="days_td">Category Name</td>
              <td className="days_td">
                <input type="text" value={category} onChange={(e) => setcategory(e.target.value)} />
              </td>
              <td className="days_td">
                <button
                  onClick={() => {
                    add_category();
                  }}
                  className="btn add"
                >
                  Add Category
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function render_list() {
    return (
      <div className="time_selection">
        <table className="days_table">
          <thead>
            <tr>
              <th className="days_th">Category</th>
              <th className="days_th">Action</th>
            </tr>
          </thead>
          <tbody>
            {cdata.length > 0 ? (
              cdata.map((cat, index) => (
                <tr key={index} style={{ marginBottom: "10px" }}>
                  <td className="days_td">{cat.category}</td>
                  <td className="days_td">
                    {" "}
                    <button
                      onClick={() => {
                        delete_category(cat.id);
                      }}
                      className="btn delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="category_item">No categories found.</div>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="messages_cont">
      {render_add()}
      {render_list()}
    </div>
  );
}
