import './App.css'
import Navbar from './components/Navbar'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [searchMovie, setSearchMovie] = useState(null);
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [isLoad, setIsLoad] = useState(false);
  const [movieDetailsLoad, setMovieDetailsLoad] = useState(false)

  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(()=>{
    async function fetchMovie(searchMovie) {
      if(!searchMovie || searchMovie.length < 3){
        return;
      }
      try {
        setIsLoad(true);
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchMovie}`);
        setMovies(res.data.Search || []);
        setIsLoad(false)
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      finally{
        setIsLoad(false);
      }
    }
    fetchMovie(searchMovie);
  },[searchMovie])

  return (
    <div>
      <Navbar searchMovie={searchMovie} setSearchMovie={setSearchMovie} moveis={movies}/>
      <div className='flex space-x-5 mt-10 justify-center h-screen'>
        <MovieList movies={movies} setMovies={setMovies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} isLoad={isLoad} setMovieDetailsLoad={setMovieDetailsLoad}/>
        <MovieDetails moveis={movies} selectedMovie={selectedMovie} isLoad={isLoad} setMovieDetailsLoad={setMovieDetailsLoad} movieDetailsLoad={movieDetailsLoad}/>
      </div>
    </div>
  )
}

export default App
