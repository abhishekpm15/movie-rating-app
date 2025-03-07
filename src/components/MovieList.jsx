import React from 'react'
import Movie from './Movie'

const MovieList = ({movies, selectedMovie , setSelectedMovie}) => {
  return (
    <div className='h-4/5 bg-[#2b2f35] w-1/3 rounded-2xl overflow-auto'>
        {movies?.length > 0 ? <div className='mt-3'>
              {movies?.map((movie) => <Movie key={movie.imdbID} movie={movie} setSelectedMovie={setSelectedMovie}/>)}
            </div> : <div className='flex h-full justify-center items-center text-2xl'> 🎬 Search for a &thinsp;<span className='font-extrabold'>movie</span>... </div>}
    </div>
  )
}

export default MovieList