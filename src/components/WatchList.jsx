import React, { useEffect, useState } from 'react'

const WatchList = React.memo(({ addWatchList, setAddWatchList}) => {
  const [removeMovieWatchList, setRemoveMovieWatchList] = useState('');

  useEffect(() => {
    const newAddWatchList = addWatchList.filter((movie) => movie.imdbID !== removeMovieWatchList);
    setAddWatchList(newAddWatchList);
  },[removeMovieWatchList])

  const averageMovieRating = addWatchList.reduce((sum, movie) => sum + parseFloat(movie.imdbRating), 0) / addWatchList.length || 0;
  const averageMovieTime = addWatchList.reduce((sum,movie) => sum + (movie.Runtime !== 'N/A' ? parseFloat(movie.Runtime.split(' ')[0]) : 0),0) / addWatchList.length || 0;
  const averageUserRating = addWatchList.reduce((sum,movie) => sum + parseFloat(movie.UserRating), 0) / addWatchList.length || 0;
  return (
    <>
      <div className='mb-5 bg-[#333a3f] p-5 rounded-2xl'>
        <div className='font-bold text-xl my-3'>MOVIES YOU WATCHED</div>
        <div className='flex justify-center space-x-10 font-semibold text-lg'>
          <span>#️⃣ {addWatchList.length} movies</span>
          <span>⭐️ {averageMovieRating.toFixed(1)}</span> 
          <span>🌟 {averageUserRating.toFixed(1)}</span>
          <span>⏳ {averageMovieTime.toFixed(1)} </span>
        </div>
      </div>
      {addWatchList.length > 0
        ? addWatchList.map((movie, index) => (
            <WatchListMoviePreview key={index} movie={movie} removeMovieWatchList={removeMovieWatchList} setRemoveMovieWatchList={setRemoveMovieWatchList}/>
          ))
        : ''}
    </>
  )
})

const WatchListMoviePreview = ({ movie, removeMovieWatchList, setRemoveMovieWatchList }) => {
    return (
        <div className='w-full'>
            <div className='flex space-x-5 p-3 px-7 cursor-pointer duration-500'>
            <div>
                <img src={movie.Poster} alt={movie.imdbID} width={70} />
            </div>
            <div className='flex flex-col items-start justify-center space-y-2 w-full'>
                <h3 className='text-left font-bold text-xl'>{movie.Title}</h3>
                <div className='flex items-center justify-between w-full'>
                <div className='inline-flex space-x-7'>
                    <span className='text-lg font-semibold'>⭐️ {movie.imdbRating}</span>
                    <span className='text-lg font-semibold'>🌟 {movie.imdbRating}</span>
                    <span className='text-lg font-semibold'>⏳ {movie.Runtime}</span>
                </div>
                <div className='hover:bg-[#333a3f] rounded-full px-2 py-1' onClick={()=>{setRemoveMovieWatchList(movie.imdbID)}}>❌</div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default WatchList
