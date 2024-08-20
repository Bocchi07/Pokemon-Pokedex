import React, { useState, useRef, useEffect } from 'react';
import { RxMixerHorizontal } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import "../../App.css"
import "./filter.css"
import axios from "axios";
import typesIcon from "../../assets/Icons/types.png"
import regionIcon from "../../assets/Icons/region.png"
import generationIcon from "../../assets/Icons/generationIcon.png"
import movesIcon from "../../assets/Icons/movesIcon.png"
import filterIcon from "../../assets/Icons/filterIcon.png"

function FilteringSection({searchPokemon, handleSearch, searchedPokemon, setFilterIsActive, filterIsActive, handleFilterIsActive}) {
  const [activeIndex, setActiveIndex] = useState();
  const [activeMovesSection, setActiveMovesSection] = useState(false);
  const [pokemonTypes, setPokemonTypes] = useState();
  const [pokemonGenerations, setPokemonGenerations] = useState();
  const [pokemonRegions, setPokemonRegions] = useState();

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMovesActive = (item) => {
    item === activeMovesSection ?  setActiveMovesSection(null) :  setActiveMovesSection(item);
  }

  const filterContent = ["Types", "Generations", "Regions", "Moves"];
  const renderTypesActive = activeIndex == 0 && pokemonTypes.map((t, i) => <ul key={i} className='opacity-0 type-list flex flex-col items-left text-left'><li className="type-list rounded-md text-xs py-2">{t[0].toUpperCase() + t.slice(1)}</li ></ul>);
  const renderGenerationActive = activeIndex == 1 && pokemonGenerations.map((g , i) =>  <ul key={i} className='generations-list flex flex-col items-left text-left text-xs'><li className='py-2'>{g[0].toUpperCase() + g.slice(1)}</li></ul>);
  const renderRegionActive = activeIndex == 2 && pokemonRegions.map((r , i) =>  <ul key={i} className='regions-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
  const renderMovesTypeActive = activeIndex == 3 && pokemonRegions.map((r , i) =>  <ul key={i} className='move-generation-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
  const renderMovesGenerationActive = activeIndex == 3 && pokemonTypes.map((r , i) =>  <ul key={i} className='move-generation-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
 
  const movesDetails =  activeIndex === 3 && 
                <div className=''>
                  <div className= {`moves-types-wrapper z-20 relative flex justify-start items-center pl-2 py-2 cursor-pointer border-none moves-generation-wrapper ${activeMovesSection === "types" && "active"} `} onClick={() => handleMovesActive("types")}>
                    <details className="w-full">
                      <summary className='text-xs font-semibold text-left'>Moves by Generation</summary>
                      {
                        activeMovesSection === "types" && renderMovesTypeActive
                      }
                     
                  
                    </details>

                    <IoIosArrowDown className='show-more-icon absolute top-2 right-0 w-3'/>
                  </div>
                  
                  <div className={`moves-generation-wrapper relative flex justify-start items-center pl-2 py-2 cursor-pointer ${activeMovesSection === "generations" && "active"} z-20`} onClick={() => handleMovesActive("generations")}>
                     <details className="w-full"> 
                      <summary className='text-xs font-semibold text-left'>Moves by Types</summary>
                      {
                         activeMovesSection === "generations" && renderMovesGenerationActive
                      }
                     
                    
                      </details>

                      <IoIosArrowDown className='show-more-icon absolute top-2 right-0 w-3'/>
                  </div>          
                </div>

  useEffect(() => {
    const fetchTypes = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const results = response.data.results.map(t => t.name);
        
        setPokemonTypes(results);
      }catch(error){
        console.error(error)
      }
    }

    const fetchGenerations = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/generation");
        const results = response.data.results.map(r => r.name);

        setPokemonGenerations(results)
      } catch(error){
        console.error(error)
      }
    }

    const fetchRegions = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/region");
        const results = response.data.results.map(r => r.name);

        setPokemonRegions(results)
      } catch(error){
        console.error(error)
      }
    }

    const fetchMoves = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/region");
        const results = response.data.results.map(r => r.name);

        setPokemonRegions(results)
      } catch(error){
        console.error(error)
      }
    }
 
    fetchTypes();
    fetchGenerations();
    fetchRegions();
  }, [])


 console.log(movesDetails);

  return (
    <div className={`filter-container z-10 w-64 bg-white shadow-md bottom-0 left-0 fixed top-10 py-4 pt-9 px-4 overflow-y-scroll ${filterIsActive && 'active'}`}>
      <div className={` filter-name-section h-8 flex items-center mt-8 cursor-pointer ${filterIsActive && 'active'}`} onClick={handleFilterIsActive}>
         <img src={filterIcon} className="w-5 mr-2 my-auto"/>
         <h5 className='font-semibold text-base'>Filter</h5>
      </div>
{/* 
      <div className='filter-container flex flex-col gap-y-4align-center text-left justify-start mt-8'>
         <h5 className='font-semibold text-md'>Sort by</h5>
         <select name="" id="" className = "sort-by mt-2 w-36 rounded-md text-sm py-2 px-2 shadow-sm">
          <option value="">Default</option>
         </select>
      </div> */}

      <div className='filtering-pokemon mt-4 relative'>
        {
          filterContent.map((f, index) => {
            return (
              <div className={`relative ${f}-content z-10 details-wrapper relative ${activeIndex === index ? "active" : null }`} key={index} onClick={() => {
                 handleClick(index) 
                 activeMovesSection !== false &&  setActiveMovesSection(null)
              }}>
                  <details>

                    <summary className='font-semibold flex items-center'>
                      {f == "Types" && <img src={typesIcon} className="h-5 w-7 my-auto"/>}
                      {f == "Generations" && <img src={generationIcon} className="h-4 my-auto mx-1"/>}
                      {f == "Regions" && <img src={regionIcon} className="h-4 mx-1  my-auto"/>}
                      {f == "Moves" && <img src={movesIcon} className="h-4 mx-1 my-auto"/>}
                      {f}
                      </summary>

                  </details>
                  <IoIosArrowDown className={`show-more-icon`}/>
              </div>
            )
          } )
        }

        {renderTypesActive}
        {renderGenerationActive}
        {renderRegionActive}
        {movesDetails}

      </div>
    </div>
  );
}

export default FilteringSection;
