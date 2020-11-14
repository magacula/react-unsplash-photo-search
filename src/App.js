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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // async function to fetch data from API
  const fetchImages = async () => {
    setLoading(true);
    let url; // initialize w/ let b/c url will change between default images & searched images
    // A variable used to hold the state value that accesses the page number
    // page: the page number to retrieve  (a parameter)
    const urlPage = `&page=${page}`;

    // A variable used to hold the state value of the search query we want to view
    const urlQuery = `&query=${query}`;

    // if the user makes a search (when the query state value is not empty)
    if (query) {
      url = `${searchUrl}${clientID}${urlQuery}`;
      // console.log(url);
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
      // console.log(url);
    }

    try {
      const response = await fetch(url); // invokes a fetch request to retrieve photos from url
      const data = await response.json();
      console.log(data);

      // Updates images by copying over old state values, every time we scroll to a new page
      setPhotos((oldImages) => {
        // if we are searching and are on the first page, then return our new searched images
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldImages, ...data.results];
        } else {
          return [...oldImages, ...data]; // if not searching, return default images
        }
      });

      // sets to not loading
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // useEffect that fetching images from API.
  useEffect(() => {
    fetchImages();
  }, [page]); // re-renders the fetchImages component every time the page changes

  // useEffect that listens for a scroll event
  useEffect(() => {
    const scrollEvent = window.addEventListener("scroll", () => {
      // console.log(`innerHeight: ${window.innerHeight}px`);
      // console.log(`scrollY: ${window.scrollY}px`);
      // console.log(`body height: ${document.body.scrollHeight}px`);

      // If we reach the end of the document minus 2px, then we fetch more photos
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        // console.log("reached the end of the document");
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // resets page value to 1 every time we make a search
  };

  return (
    <main>
      <section className="search">
        <form className="search-form" action="">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query} // sets searched image as the state value
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-container">
          {photos.map((image, index) => {
            // console.log(image);
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
