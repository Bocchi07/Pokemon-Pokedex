import React from 'react'
import Logo from "../assets/Icons/Logo.png"
function Header() {
  return (
    <header className='w-100% bg-white h-16 fixed top-0 left-0 right-0 z-20 flex justify-between align-center shadow-sm p-4'>
      <div className='my-auto'>
        <img src={Logo} className="h-8 my-auto " alt="" />
      </div>
      <div></div>
      <div></div>  
    </header>
  )
}

export default Header;