import React from 'react'
import Logo from "../assets/Icons/Pokeball.png"

function Header() {
  return (
    <header className='w-100% bg-white h-16 fixed top-0 left-0 right-0 z-20 flex justify-between align-center shadow-sm p-4'>
      <div className='my-auto'>
        <h3 className='flex text-3xl font-extrabold'>Pokedex</h3>
      </div>
      <div></div>
      <div></div>  
    </header>
  )
}

export default Header;