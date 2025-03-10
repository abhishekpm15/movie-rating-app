import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Stars from './Stars'
import Loading from './Loading'
import WatchList from './WatchList'

const MovieDetails = ({
  selectedMovie,
  setMovieDetailsLoad,
  movieDetailsLoad,
  addWatchList,
  setAddWatchList,
  alreadyAdded,
  setAlreadyAdded
}) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [rating, setRating] = useState(0)
  const API_KEY = import.meta.env.VITE_API_KEY
  const alreadyAddedMovie = alreadyAdded[0]
  console.log(
    'already added movie check ' +
      JSON.stringify(alreadyAdded[0]) +
      ' ' +
      JSON.stringify(alreadyAddedMovie)
  )
  useEffect(() => {
    if (!selectedMovie) return

    async function getMovieDetails () {
      try {
        setMovieDetailsLoad(true)
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie}`
        )
        setMovieDetails(res?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setMovieDetailsLoad(false)
      }
    }
    getMovieDetails()

    return () => {
      setRating(0)
    }
  }, [selectedMovie])

  useEffect(() => {
    setMovieDetails(null)
  }, [addWatchList])

  const addMovieToWatchList = imdbID => {
    setAddWatchList(prev => {
      const movieDetailsNew = { ...movieDetails, UserRating: rating }
      return [...prev, movieDetailsNew]
    })
  }

  return (
    <div className='h-4/5 bg-[#2b2f35] w-1/3 rounded-2xl'>
      {movieDetailsLoad && <Loading />}
      {!movieDetailsLoad && alreadyAddedMovie ? (
        <div className='w-full'>
          <div className='flex bg-[#3e4249] rounded-2xl items-center h-60'>
            <img
              src={alreadyAddedMovie?.Poster}
              alt={alreadyAddedMovie}
              width={150}
              className='rounded-xl m-3'
            />
            <div className='flex flex-col space-y-3 mx-5'>
              <div className='text-2xl font-bold text-left'>
                {alreadyAddedMovie?.Title}
              </div>
              <div className='text-sm text-left'>
                <span>
                  {alreadyAddedMovie?.Rated} &#x2022;{' '}
                  {alreadyAddedMovie?.Runtime}
                </span>
              </div>
              <div className='text-left text-sm'>
                {alreadyAddedMovie?.Genre}
              </div>
              <div className='text-left text-sm'>
                ⭐️ {alreadyAddedMovie?.imdbRating} IMDb rating
              </div>
            </div>
          </div>
          <div className='font-semibold  bg-violet-500 rounded-2xl h-8 w-3/4 flex items-center justify-center m-auto mt-5'>
            You rated movie with {alreadyAddedMovie.UserRating} ⭐️
          </div>
          <div className='text-sm text-justify px-10 mt-5'>
            <em>{alreadyAddedMovie.Plot}</em>
          </div>
          <div className='text-sm text-justify px-10 mt-5'>
            Starring <span>{alreadyAddedMovie.Actors}</span>
          </div>
          <div className='text-sm text-justify px-10 mt-5'>
            Directed by <span>{alreadyAddedMovie.Director}</span>
          </div>
        </div>
      ) : (
        ''
      )}

      {!movieDetailsLoad && movieDetails && !alreadyAdded ? (
        <div className='w-full'>
          <div className='flex bg-[#3e4249] rounded-2xl items-center h-60'>
            <img
              src={movieDetails?.Poster}
              alt={selectedMovie}
              width={150}
              className='rounded-xl m-3'
            />
            <div className='flex flex-col space-y-3 mx-5'>
              <div className='text-2xl font-bold text-left'>
                {movieDetails?.Title}
              </div>
              <div className='text-sm text-left'>
                <span>
                  {movieDetails?.Rated} &#x2022; {movieDetails?.Runtime}
                </span>
              </div>
              <div className='text-left text-sm'>{movieDetails?.Genre}</div>
              <div className='text-left text-sm'>
                ⭐️ {movieDetails?.imdbRating} IMDb rating
              </div>
            </div>
          </div>
          <div className='flex items-center mt-10 justify-center '>
            <Stars
              selectedMovie={selectedMovie}
              rating={rating}
              setRating={setRating}
            />
          </div>
          {rating > 0 && (
            <div
              className='font-semibold  bg-violet-500 rounded-2xl h-8 w-3/4 flex items-center justify-center m-auto mt-5 cursor-pointer'
              onClick={() => {
                addMovieToWatchList(movieDetails?.imdbID)
              }}
            >
              + Add to list
            </div>
          )}
          <div className='text-sm text-justify px-10 mt-5'>
            <em>{movieDetails.Plot}</em>
          </div>
          <div className='text-sm text-justify px-10 mt-5'>
            Starring <span>{movieDetails.Actors}</span>
          </div>
          <div className='text-sm text-justify px-10 mt-5'>
            Directed by <span>{movieDetails.Director}</span>
          </div>
        </div>
      ) : (
        !movieDetailsLoad &&
        !alreadyAdded && (
          <WatchList
            addWatchList={addWatchList}
            setAddWatchList={setAddWatchList}
          />
        )
      )}
    </div>
  )
}

export default MovieDetails
