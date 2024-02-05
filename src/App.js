import React, { lazy, Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Container from '@mui/material/Container';

export const themeOptions = createTheme ({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e30073',
    },
    secondary: {
      main: '#e1e1f1',
    },
    background: {
      default: '#18181b',
      paper: '#27272a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9e9e9e',
      disabled: '#424242',
      hint: '#ffcdd2',
    },
    error: {
      main: '#d84315',
    },
    divider: 'rgba(227,0,115,0.3)',
  },
  typography: {
    fontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
});

const Search = lazy(() => import('./components/Search'));
const MovieDetail = lazy(() => import('./components/MovieDetail'));
const Favorites = lazy(() => import('./components/Favorites'));

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
          <Container maxWidth="sm">
            
            <Router>
              <Navigation />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Search />} />
                  <Route path="/search-results" element={<Search />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </Suspense>
            </Router>

          </Container>
    </ThemeProvider>
  );
}

export default App;
