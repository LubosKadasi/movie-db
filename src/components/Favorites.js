import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context';

function Favorites() {
  const { state, dispatch } = useContext(AppContext);

  const handleRemoveFromFavorites = (movieId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movieId });
  };

  return (
    <div>
      <h2>My Favorite Movies</h2>
      <ul>
        {state.favorites.slice(0).reverse().map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title}</p>
            </Link>
            <button onClick={() => handleRemoveFromFavorites(movie.imdbID)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
