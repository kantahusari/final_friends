import React from "react";
import { useState, useEffect, Fragment, useCallback } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { adminService } from "../serviceworker/admin";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const Gallery = () => {
  const [photos, setphotos] = useState([]);
  const [category, setcategory] = useState("All");

  const [categories, setcategories] = useState([]);

  function change_category(value) {
    setcategory(value);
  }

  const fetchImages = useCallback(async () => {
    try {
      const data = await adminService.getImages();
      var pics = [];
      for (var image of data.images) {
        pics.push({
          src: image.filepath,
          width: 1200,
          height: 1600,
          category: image.category,
        });
      }
      setphotos(pics);
      setcategories(data.categories);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function return_images() {
    if (category === "All") {
      return photos;
    }
    return photos.filter((photo) => photo.category === category);
  }

  const [index, setIndex] = useState(-1);

  return (
    <div className="page gallery">
      <div className="page_header">
        <main>Project Gallery</main>
      </div>

      <section className="services-intro">
        <div className="container">
          <p>Browse our completed projects to see the quality of our work</p>
        </div>
      </section>

      <section className="gallery-filters">
        <div className="container">
          <div className="filter-buttons">
            <button className={`filter-btn ${category === "All" ? "active" : ""}`} data-filter="all" onClick={() => change_category("All")}>
              Show All
            </button>
            {categories.map((cat) => (
              <button key={cat} className={`filter-btn ${category === cat ? "active" : ""}`} data-filter={cat} onClick={() => change_category(cat)}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-grid">
        <div className="container">
          <RowsPhotoAlbum photos={return_images()} targetRowHeight={150} onClick={({ index }) => setIndex(index)} />
          <Lightbox slides={return_images()} open={index >= 0} index={index} close={() => setIndex(-1)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
