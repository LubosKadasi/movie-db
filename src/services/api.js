import axios from 'axios';

const apiKey = 'a94409cf';

const api = axios.create({
  baseURL: 'http://omdbapi.com',
  params: {
    apikey: apiKey,
  },
});

// Adding an interceptor to transform the response data format
api.interceptors.response.use(
  (response) => {
    if (response.data?.Search){
      const totalPages = Math.ceil(parseInt(response.data.totalResults, 10) / 10) || 0;
      const currentPage = response.config.params.page || 1;
      const modifiedResponse = {
        data: {
          movies: response.data.Search,
          hasMore: totalPages > currentPage ? true : false,
          totalResults: response.data.totalResults
        }
      };
      //console.log(modifiedResponse);
      return modifiedResponse;
    } else {
      return response;
    }
  },
  (error) => {
    // Handle errors 
    return Promise.reject(error);
  }
);

export default api;
