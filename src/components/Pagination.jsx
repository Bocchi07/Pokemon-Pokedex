import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList.jsx";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Pokeball from "../assets/Icons/Pokeball.png"
import filterIcon from "../assets/Icons/filterIcon.png"

function Pagination({
  prevBtn,
  nextBtn,
  searchPokemon,
  handleSearch,
  searchedPokemon,
  currentPokemon,
  handlePokemonPreview,
  page,
  filterIsActive,
  handleFilterIsActive
}) {
  // console.log(currentPokemon);
  return (
    <div className={`w-[100%] h-[90%] rounded-md p-4 mt-20 ${filterIsActive && 'ml-[20%]'}`}>
      <div className="search-filter-container">
        <div className="flex items-center gap-x-3 px-4 mb-8 ">  
          <div className={` filter-name-page h-11 flex items-center justify-center rounded-full cursor-pointer w-32 ${filterIsActive && 'active'}`} onClick={handleFilterIsActive}>
            <img src={filterIcon} className="w-5 mr-2 my-auto"/>
            <h5 className='font-semibold text-base'>Filter</h5>
          </div>

          <div className='relative flex-1'>
            <form action="" onSubmit={searchedPokemon} className=" w-full">
              <input 
                type="text" 
                className='search-pokemon bg-white my-auto rounded-3xl py-3 pr-8 text-sm w-full' 
                placeholder='Search Pokemon name or id' 
                id="search-pokemon"
                value={searchPokemon}
                onChange={handleSearch}
              />
            </form>
            <img src={Pokeball} alt="" className='w-8 absolute top-2 right-1'/>
          </div>
      </div>
      
      </div>
      <div className=" w-full grid grid-cols-3 gap-y-5 gap-x-4">
        {currentPokemon.map((c, index) => {
          return (
            <PokemonList
              pokemonSprite={c.sprites}
              pokemonId={c.id}
              pokemonName={c.name}
              pokemonTypes={c.types}
              height={c.height}
              weight={c.weight}
              stats={c.stats}
              abilities={c.abilities}
              key={index}
              handlePokemonPreview={handlePokemonPreview}
            />
          );
        })}
      </div>

  
      <div className="mx-auto mt-10 shadow-md bg-white rounded-md py-2 px-4 w-40 flex justify-center align-center">
          <button onClick={prevBtn} type="button" className="w-[20%]" >
             <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <h2 className="flex-1">{page}</h2>
          <button onClick={nextBtn} type="button" className="w-[20%]" >
             <MdKeyboardDoubleArrowRight  />
          </button>
      </div>
  
    </div>
  );
}

export default Pagination;
