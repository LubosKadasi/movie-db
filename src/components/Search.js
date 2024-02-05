import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AppContext } from '../Context';
import { useInView } from 'react-intersection-observer'
import { useQuery, keepPreviousData, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, InputBase } from '@mui/material';
import { themeOptions } from '../App';


function Search() {
  const { state, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState(state.searchTerm);
  const [currentPage, setCurrentPage] = useState(state.currentPage);
  const searchInput = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.current.value);
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchInput.current.value });
  };
  
  function SearchResults() {
    
    const queryClient = useQueryClient()
    const [page, setPage] = React.useState(state.currentPage || 1)

    function handleNextPage () {
      setPage((old) => (data?.hasMore ? old + 1 : old))
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page + 1 });
    };

    function handlePrevPage () {
      setPage((old) => Math.max(old - 1, 0))
      dispatch({ type: 'SET_CURRENT_PAGE', payload: Math.max(page - 1, 0) });
    };

    async function fetchProjects(page = 0) {
      const { data } = await api.get(`/?s=${searchTerm}&page=${page}`)
      console.log(data);

      return data
    }
    const { status, data, error, isFetching, isPlaceholderData } = useQuery({
      queryKey: ['movies', page],
      queryFn: () => fetchProjects(page),
      placeholderData: keepPreviousData,
      initialPageParam: 1,
      staleTime: 5000,
      enabled: !!searchTerm && !!currentPage
    })
  
    // Prefetch the next page!
    React.useEffect(() => {
      if (!isPlaceholderData && data?.hasMore) {
        queryClient.prefetchQuery({
          queryKey: ['movies', page + 1],
          queryFn: () => fetchProjects(page + 1),
        })
      }
    }, [data, isPlaceholderData, page, queryClient])
  
    return (
      <div>
        {status === 'pending' ? (
          <div></div>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          // `data` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {data.movies?.map((movie) => (
              <Card sx={{ maxWidth: '100%', my: 3 }} key={movie.imdbID}>
                <CardActionArea 
                  component={Link} to={`/movie/${movie.imdbID}`} 
                  //onClick={() => handlePagination(currentPage)}
                  sx={{ display: 'flex' }}
                >
                  <CardMedia
                    component="img"
                    width="130"
                    image={movie.Poster}
                    alt={movie.Title}
                    sx={{ width: 130 , height: 196}}
                  />
                  <Box sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {movie.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.Year}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </div>
        )}
        {data?.movies && (
          <>
            <div>Current Page: {page}</div>
            <Box sx={{ my: 5, display: 'flex', justifyContent: 'center'}}>            
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={page === 1}
                sx={{ mr: 3 }}
                >
                Previous Page
              </Button>{' '}
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={isPlaceholderData || !data?.hasMore}
                >
                Next Page
              </Button>
            </Box>
          </>
        )}
        {
          // background loading
          isFetching ? <span> Loading...</span> : null
        }{' '}
      </div>
    )
  }

  return (
    <div>

      <Box sx={{ textAlign: 'center' }} >
        <Typography variant="h1" gutterBottom sx={{ color: themeOptions.palette.text.primary }}>
          <Link to={`/`} style={{ color: themeOptions.palette.text.primary, textDecoration: 'none' }}>
          M<Typography variant="span" sx={{ color: themeOptions.palette.primary.main, fontWeight: '900' }}>oo</Typography>gle
          </Link>
        </Typography>
      </Box>

      <Paper 
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          name='s'
          inputRef={searchInput}
          type='search'
          //value={searchTerm}
          //onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <SearchResults></SearchResults>

    </div>
  );
}

export default Search;
