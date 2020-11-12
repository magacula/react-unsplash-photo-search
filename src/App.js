import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

// clientID URL that grants permission to access the Unsplash API
// passes Access Key using a client_id query parameter
// Access key is found in .env file set to an environment variable: REACT_APP_ACCESS_KEY
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

// the url path to get list of default photos
const mainUrl = `https://api.unsplash.com/photos/`;
// the url path to search for certain photos
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  // set up state hooks
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  // async function to fetch data from API
  const fetchImages = async () => {
    setLoading(true);
    let url; // uses let b/c url will change between searching & default images
    url = `${mainUrl}${clientID}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <main>
      <section className="search">
        <form className="search-form" action="">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-container">
          {photos.map((image, index) => {
            // uses spread operator to pass all props of the image property
            return <Photo key={index} {...image} u />;
          })}
        </div>
        {/* uses conditional rendering to render our loading state value */}
        {loading && <h2 className="loading">Loading Images...</h2>}
      </section>
    </main>
  );
}

export default App;
