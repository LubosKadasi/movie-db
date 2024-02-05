import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../services/api';
import { AppContext } from '../Context';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const { state, dispatch } = useContext(AppContext);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await api.get(`/?i=${id}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    const isAlreadyInFavorites = state.favorites.some((favMovie) => favMovie.imdbID === id);

    if (!isAlreadyInFavorites) {
      // Assuming 'movieDetails' contains the required details
      dispatch({ type: 'ADD_TO_FAVORITES', payload: movieDetails });
      console.log(`${movieDetails.Title} added to favorites.`);
      
      // Navigate to the favorites page
      navigate('/favorites');
    } else {
      console.log(`${movieDetails.Title} is already in your favorites.`);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { Title, Year, Genre, Poster } = movieDetails;

  return (
    <div>
      <h2>{Title}</h2>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <p>Year: {Year}</p>
      <p>Genre: {Genre}</p>
      <img src={Poster} alt={Title} />
    </div>
  );
}

export default MovieDetail;