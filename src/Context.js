import React, { createContext, useReducer } from 'react';

const initialState = {
  searchTerm: '',
  currentPage: 1,
  favorites: [],
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FROM_FAVORITES':
      const updatedFavorites = state.favorites.filter((movie) => movie.imdbID !== action.payload);
      return { ...state, favorites: updatedFavorites };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
