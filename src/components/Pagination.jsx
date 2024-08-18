import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList.jsx";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function Pagination({
  prevBtn,
  nextBtn,
  searchPokemon,
  handleSearch,
  searchedPokemon,
  currentPokemon,
  handlePokemonPreview,
  page
}) {
  // console.log(currentPokemon);
  return (
    <div className="ml-[20%] w-[100%] h-[90%] rounded-md p-4 mt-20">
      <div className="flex justify-between align-center px-4 mb-8">
        
        <div className="text-sm font-semibold flex items-center cursor-pointer">
          <h4>Ascending</h4> 
          <MdKeyboardArrowDown className="text-md ml-2"/>
        </div>

        <div className="flex gap-x-4 align-center">
          <h4 className="font-medium my-auto">from</h4>
          <div className="py-2 px-4 w-20 rounded-md border-2 h-10 text-right">0</div>
          <h4 className="my-auto">To</h4>
          <div className="py-2 h-10 text-right px-4 w-20 border-2 rounded-md">20</div>
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
