import React, { useState, useEffect, useCallback } from "react";
import { adminService } from "../../serviceworker/admin";
import { useDispatch, useSelector } from "react-redux";
import { get_image_count } from "../../store/storeslice";

export default function GalleryManager() {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const response = await adminService.getAllFiles();
    setImages(response.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this image?");
    if (!confirm) return;
    await adminService.deleteFile({ id });
    await fetchcounts();
    fetchImages();
  };
  const handleHide = async (id, value) => {
    const confirm = window.confirm("Are you sure you want to change this image display status?");
    if (!confirm) return;
    await adminService.hidefile({ id, value });
    fetchImages();
  };

  function renderImages() {
    return images.map((img) => (
      <div className="image_container">
        <div key={img.filename.split(".")[0]} className="image_item">
          <img
            src={`${img.filepath}`}
            alt={img.filename}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              marginRight: "10px",
              borderRadius: "6px",
            }}
          />
          <button onClick={() => handleDelete(img.id)} className="btn delete">
            Delete
          </button>
          <label className="add_category_label">Display at the front? </label>
          <input
            type="checkbox"
            checked={img.is_displayed}
            onChange={(e) => {
              handleHide(img.id, e.target.checked);
            }}
          />
          <span className="add_category_label">{img.is_displayed ? "Yes" : "No"}</span>
        </div>
      </div>
    ));
  }

  const fetchcounts = useCallback(async () => {
    const i_result = await adminService.getFilesCount();
    dispatch(get_image_count({ imagecount: i_result.imagecount }));
  }, [dispatch]);

  useEffect(() => {
    fetchcounts();
  }, [fetchcounts]);

  useEffect(() => {
    fetchImages();
  }, []);

  return <div>{renderImages()}</div>;
}
