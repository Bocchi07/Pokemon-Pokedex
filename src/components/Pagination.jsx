import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList.jsx";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Pokeball from "../assets/Icons/Pokeball.png"
import filterIcon from "../assets/Icons/filterIcon.png"
import "../App.css"
import FilteringSection from "./Filter/FilteringSection.jsx"

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
  handleFilterIsActive,
  setFilterIsActive,
  activePage,
  filterPage,
  setCurrentPokemon,
  handleEvolutionStagesPreview,
  setLoading,
  setPage,
  setFilterPage,
  setActivePage
}) {
  // console.log(currentPokemon);
  return (
    <div className={`z-20 pagination-container w-full ml-[0%] h-[90%] rounded-md p-4 mt-20 `} >
      {/*<h1 className="font-extrabold text-5xl text-blue-500 mb-4">Pokédex</h1>*/}
      <div className="search-filter-container">
        <div className="w-full gap-y-2 items-center gap-x-3 px-4 mb-8 ">
          <div className='search-field-container relative min-w-[100%]'>
            <form action="" onSubmit={searchedPokemon} className=" w-full relative">
              <input 
                type="text" 
                className='search-pokemon bg-white rounded-lg border-0 border-slate-100 shadow-md text-sm w-full'
                placeholder='Search Pokemon name or id' 
                id="search-pokemon"
                value={searchPokemon}
                onChange={handleSearch}
                style={{ padding: "1.2rem 3rem" }}
              />

              <button className="absolute h-11 top-2 right-2 py-1 text-white font-semibold bg-blue-400 px-9 rounded-md text-sm cursor-pointer">Search</button>
              <FiSearch className="absolute top-3 left-5 h-8 text-xl opacity-80 text-blue-500"/>
            </form>

       {/*<img src={Pokeball} alt="" className='w-8 absolute top-2 right-1'/>*/}
          </div>

{/*
          <div onClick={handleFilterIsActive} className={`bg-slate-50 filter-name-page h-11 flex items-center justify-center rounded-full cursor-pointer mt-2 ${filterIsActive && 'active'}`} >
            <img src={filterIcon} className="w-5 mr-2 my-auto"/>
            <h5 className='font-semibold text-base'>Filter</h5>
          </div>*/}
      </div>
      </div>



      <div className="list-filter-container ">
         <FilteringSection
          searchPokemon={searchPokemon}
          handleSearch={handleSearch}
          searchedPokemon={searchedPokemon}
          setFilterIsActive = {setFilterIsActive}
          filterIsActive = {filterIsActive}
          handleFilterIsActive = {handleFilterIsActive}
          setCurrentPokemon = {setCurrentPokemon}
          handleEvolutionStagesPreview = {handleEvolutionStagesPreview}
          setLoading = {setLoading}
          setPage = {setPage}
          setFilterPage = {setFilterPage}
          filterPage = {filterPage}
          setActivePage = {setActivePage}
          />

        <div className="pokemon-list-wrapper gap-y-5 gap-x-4 ">
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
      </div>


      

  {
    activePage === true ?    <div className="mx-auto mt-10 shadow-md bg-white rounded-md py-2 px-4 w-40 flex justify-center align-center">
                                  <button onClick={prevBtn} type="button" className="w-[20%] cursor-pointer" >
                                     <MdOutlineKeyboardDoubleArrowLeft />
                                  </button>
                                  <h2 className="flex-1">{page}</h2>
                                  <button onClick={nextBtn} type="button" className="w-[20%]" >
                                     <MdKeyboardDoubleArrowRight  />
                                  </button>
                              </div>

                        : " "
  }

  
    </div>
  );
}

export default Pagination;
