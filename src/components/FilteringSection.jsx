import React, { useState, useRef } from 'react';
import { RxMixerHorizontal } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css"
import Pokeball from "../assets/Icons/Pokeball.png"

function FilteringSection({searchPokemon, handleSearch, searchedPokemon}) {

  return (
    <div className='w-[20%] bg-white shadow-md bottom-0 fixed  top-10 py-4 pt-9 px-4'>

      <div className='relative'>
        <form action="" onSubmit={searchedPokemon}>
          <input 
            type="text" 
            className='search-pokemon bg-white shadow-md mt-4 rounded-3xl py-3 pr-8 text-sm w-full' 
            placeholder='Search Pokemon' 
            id="search-pokemon"
            value={searchPokemon}
            onChange={handleSearch}
          />
        </form>
  
        <img src={Pokeball} alt="" className='w-8 absolute top-6 right-1'/>
      </div>

      <div className='filter-container flex align-center text-left justify-start mt-8'>
         <RxMixerHorizontal className='w-10 h-5' />
         <h5 className='font-semibold text-xl'>Filter</h5>
      </div>



      <div className='filter-container flex flex-col gap-y-4align-center text-left justify-start mt-8'>
         <h5 className='font-semibold text-md'>Sort by</h5>
         <select name="" id="" className = "sort-by mt-2 w-36 rounded-md text-sm py-2 px-2 shadow-sm">
          <option value="">Default</option>
         </select>
      </div>

      <div className='filtering-pokemon grid grid-rows-4 mt-4 '>
        <div>
          <select name="" id="" className=' text-sm py-4 '>
            <option value="">Type</option>
          </select>
        </div>
    
        <div>
          <select name="" id="" className=' text-sm py-4'> 
            <option value="">Region</option>
          </select>
        </div>
       
        <div>
          <select name="" id="" className=' text-sm py-4 '>
            <option value="">Ability</option>
          </select>
        </div>

        
        <div>
            <select name="" id="" className=' text-sm py-4 '>
                <option value="">Generation</option>
            </select>
        </div>
      
      </div>
    </div>
  );
}

export default FilteringSection;
