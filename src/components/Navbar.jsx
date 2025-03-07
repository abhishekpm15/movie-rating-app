import React from 'react'

const Navbar = ({searchMovie, setSearchMovie, moveis}) => {
  return (
    <div className='w-full h-15 rounded-2xl'>
      <div className='flex h-full text-2xl justify-between items-center'>
        <div className='text-3xl font-bold flex-1/3'>🍿 Abhi Flix</div>
        <div className='text-lg flex-2/3 '><input type='text' placeholder='Search movies...' className='border-1 border-gray-400 py-2 px-3 rounded-xl w-2/3'
          onChange={(e)=>{setSearchMovie(e.target.value)}}
        /></div>
        <div className='flex-1/3 font-medium text-xl'>Found {moveis !== null ? moveis.length : 0} Results</div>
      </div>
    </div>
  )
}

export default Navbar