import React from 'react'

const Movie = ({ movie, setSelectedMovie, addWatchList, setAddWatchList , setAlreadyAdded}) => {

  const selectedMovieCheck = (imdbID) =>{
    const checkAlreadyAdded = addWatchList.some((movie) => movie.imdbID === imdbID)
    if(checkAlreadyAdded){
        setAlreadyAdded(addWatchList.filter((movie) => movie.imdbID === imdbID))
    }
    else{
      setAlreadyAdded('')
      setSelectedMovie(movie.imdbID)
    }
  }

  return (
    <div onClick={()=>{selectedMovieCheck(movie.imdbID)}}>
      <div className='flex space-x-5 hover:bg-[#3e4249] p-3 px-7 cursor-pointer duration-500'>
        <div>
          <img src={movie.Poster} alt={movie.imdbID} width={55} />
        </div>
        <div className='flex flex-col items-left justify-center space-y-2'>
          <h3 className='text-left font-bold'>{movie.Title}</h3>
          <p className='text-left text-sm font-semibold'>🗓️ {movie.Year}</p>
        </div>
      </div>
      <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700'></hr>
    </div>
  )
}

export default Movie
