import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

// clientID URL that grants permission to access the Unsplash API
// Passes Access Key using a client_id query parameter
// Access key is found in .env file as an environment variable
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
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return <h2>stock photos starter</h2>;
}

export default App;
