import React, { useState, useRef, useEffect } from 'react';
import { RxMixerHorizontal } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import "../../App.css"
import "./filter.css"
import axios from "axios";
import typesIcon from "../../assets/Icons/types.png"
import regionIcon from "../../assets/Icons/region.png"
import generationIcon from "../../assets/Icons/generationIcon.png"
import movesIcon from "../../assets/Icons/movesIcon.png"
import filterIcon from "../../assets/Icons/filterIcon.png"
import { LuArrowLeftToLine } from "react-icons/lu";
import FilterItem from "./FilterItem.jsx";

function FilteringSection({setLoading, searchPokemon, handleSearch, searchedPokemon, setFilterIsActive, filterIsActive, handleFilterIsActive, setCurrentPokemon, handleEvolutionStagesPreview, setPage, setFilterPage, filterPage, setActivePage}) {
  const [page, setPages] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [activeMovesSection, setActiveMovesSection] = useState(false);
  const [pokemonTypesArr, setPokemonTypesArr] = useState();
  const [pokemonTypesActive, setPokemonTypesActive] = useState(false);
  const [pokemonGenerations, setPokemonGenerations] = useState();
  const [pokemonRegions, setPokemonRegions] = useState();
  const [pokemonName, setPokemonName] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [filterTypesValue, setFilterTypesValue] = useState();
  const [filterGenValue, setFilterGenValue] = useState();
  const [filterMovesValue, setFilterMovesValue] = useState();

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMovesActive = (item) => {
    item === activeMovesSection ?  setActiveMovesSection(null) :  setActiveMovesSection(item);
  }

  const handleTypesChange = (event) => {
    setFilterTypesValue(event.target.value);
    handleTypePokemon(event.target.value)
    console.log(event.target.value);
  };

  const handleGenerationChange = (event) => {
    handleGenerationPokemon(event.target.value)
  };

  const handleMoveChange = (event) => {
    setFilterMovesValue(event.target.value);
    console.log(filterMovesValue);
  };

  const handleFormChange = (event) => {
    setFilterMovesValue(event.target.value);
    handleAllFormsPokemon(event.target.value);
    // console.log(filterMovesValue);
  };


  const handleTypePokemon = async (type) => {
      setLoading(true)
      setActivePage(false)
      setPokemonTypesActive(type)
      // console.log(filterPage)

      try{
        // const offset = (page - 1) * 20;
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const url = response.data.pokemon
            // .slice(offset, offset + 21)
            .map(p => p.pokemon.url)

        const pokemonUrlPromises = url.map(res => axios.get(res));
        const pokemonUrlResponses = await Promise.all(pokemonUrlPromises)
        const pokemonID = pokemonUrlResponses.map(id => id.data.id)

        const pokemonIdPromises = pokemonID.map(res => axios.get(`https://pokeapi.co/api/v2/pokemon/${res}`))
        const pokemonIdResponses = await Promise.all(pokemonIdPromises);

        const pokemonData = pokemonIdResponses.map((res) => {
          const { id, name, types, sprites, height, weight, stats, abilities } = res.data;
          return {
            id,
            name: name[0].toUpperCase() + name.slice(1),
            types: types.map((info) => info.type.name),
            sprites: sprites.other["official-artwork"].front_default,
            height,
            weight,
            stats: stats.map((s) => ({
              statNum: s.base_stat,
              statName: s.stat.name,
            })),
            abilities: abilities.map((a) => a.ability.name),
          };
        });

        setCurrentPokemon(pokemonData)
        // handleEvolutionStagesPreview(type)
        // console.log(pokemonIdResponses);
      }catch(error){
        console.error(error)
      } finally{
        setLoading(false)
        handleFilterIsActive()
        setPage(1)
      }
  }

  const handleGenerationPokemon = async (data) => {
        setLoading(true)
        setActivePage(false)

        try{
          // const offset = (page - 1) * 20;
          const response = await axios.get(`https://pokeapi.co/api/v2/generation/${data}`)
          const url = response.data.pokemon_species
            // .slice(offset, offset + 21)
            .map(p => p.url);

            //p.name == "deoxys" ? 'deoxys-normal' : p.name

           const pokemonUrlPromises = url.map(res => axios.get(res))
           const pokemonUrlResponses = await Promise.all(pokemonUrlPromises);

           const pokemonID = pokemonUrlResponses.map(d => d.data.id)
           const pokemonIdPromises = pokemonID.map(res => axios.get(`https://pokeapi.co/api/v2/pokemon/${res}`))
           const pokemonIdResponses = await Promise.all(pokemonIdPromises);

         // console.log(url);

          const pokemonData = pokemonIdResponses.map((res) => {
          const { id, name, types, sprites, height, weight, stats, abilities } = res.data;
          return {
            id,
            name: name[0].toUpperCase() + name.slice(1),
            types: types.map((info) => info.type.name),
            sprites: sprites.other["official-artwork"].front_default,
            height,
            weight,
            stats: stats.map((s) => ({
              statNum: s.base_stat,
              statName: s.stat.name,
            })),
            abilities: abilities.map((a) => a.ability.name),
          };
        });

          setCurrentPokemon(pokemonData)
          console.log(pokemonIdResponses)
        }catch(error){
          console.error("can't fetch: ",  error)
        }finally{
          setLoading(false)
          handleFilterIsActive()
          setPage(1)
        }
      }

  const handleAllFormsPokemon = async (forms) => {
    setLoading(true)
      try{
         const response = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0")
         const speciesList = response.data.results;

         const allFormsData = await Promise.all(
          speciesList.map(async (species) => {
         const speciesData = await axios.get(species.url);

         if (speciesData.data.varieties.length > 1) {
            const allForms = speciesData.data.varieties.filter((variety) =>
            variety.pokemon.name.includes(forms)
          );


         if (allForms.length > 0) {
            return {
              // name: speciesData.data.name,
              allForms: allForms.map((form) => form.pokemon),
              };
            }}
               return null;
          }))

          const filteredForms = allFormsData.filter((item) => item !== null);
          const filteredResponse = filteredForms.map(data => data.allForms)
          const filteredUrl = filteredResponse.flat().map( async (d) => {
          const filteredData = await axios.get(d.url);

          return filteredData
          })

          const filterPromise = await Promise.all(filteredUrl.map(d => d));
          const filteredID = filterPromise.map(d => d.data.id);

          const pokemonIdPromises = filteredID.map(res => axios.get(`https://pokeapi.co/api/v2/pokemon/${res}`))
          const pokemonIdResponses = await Promise.all(pokemonIdPromises);

          const pokemonData = pokemonIdResponses.map((res) => {
            const { id, name, types, sprites, height, weight, stats, abilities } = res.data;
            return {
              id,
              name: name[0].toUpperCase() + name.slice(1),
              types: types.map((info) => info.type.name),
              sprites: sprites.other["official-artwork"].front_default,
              height,
              weight,
              stats: stats.map((s) => ({
                statNum: s.base_stat,
                statName: s.stat.name,
              })),
              abilities: abilities.map((a) => a.ability.name),
            };
          });

         setCurrentPokemon(pokemonData)

         console.log(filteredID);
      } catch(error){
        console.error(error)
      } finally{
        setLoading(false)
        setActivePage(false)
      }
  }

  const filterContent = ["Types", "Generations", "Regions", "Moves"];
  const renderTypesActive = activeIndex == 0 && pokemonTypesArr.map((t, i) => <ul key={i} className='z-30 opacity-0 type-list flex flex-col items-left text-left'><li className="type-list rounded-md text-xs py-2" onClick={() => handleTypePokemon(t)}>{t[0].toUpperCase() + t.slice(1)}</li ></ul>);
  const renderGenerationActive = activeIndex == 1 && pokemonGenerations.map((g , i) =>  <ul key={i} className='z-30 generations-list flex flex-col items-left text-left text-xs'><li className='py-2' onClick={() => handleGenerationPokemon(g)}>{g[0].toUpperCase() + g.slice(1)}</li></ul>);
  const renderRegionActive = activeIndex == 2 && pokemonRegions.map((r , i) =>  <ul key={i} className='z-30 regions-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
  const renderMovesTypeActive = activeIndex == 3 && pokemonRegions.map((r , i) =>  <ul key={i} className='z-30 move-generation-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
  const renderMovesGenerationActive = activeIndex == 3 && pokemonTypesArr.map((r , i) =>  <ul key={i} className='z-30 move-generation-list flex flex-col items-left text-left text-xs'><li className='py-2'>{r[0].toUpperCase() + r.slice(1)}</li></ul>);
 
  const movesDetails =  activeIndex === 3 && 
                <div className=''>
                  <div className= {`moves-types-wrapper z-20 relative flex justify-start items-center pl-2 py-2 cursor-pointer border- moves-generation-wrapper ${activeMovesSection === "types" && "active"} `} onClick={() => handleMovesActive("types")}>
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
    const fetchTypes = async(pokeType) => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        let name = response.data.results
          .slice(0, -2)
          .map((t, i) => t.name)
        const url = response.data.results.map((res) => res.url)

        setPokemonTypesArr(name) 
      }catch(error){

        console.error(error)
      }
    }

    const fetchGenerations = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/generation");
        const name = response.data.results.map(r => r.name);

        setPokemonGenerations(name)
      } catch(error){
        console.error(error)
      }
    }

    const fetchRegions = async() => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/region");
        const name = response.data.results.map(r => r.name);

        setPokemonRegions(name)
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



 // console.log(pokemonTypesArr);

  return (
    <div className="filter-section">
      <div>
        <div className="filter flex gap-y-2 gap-x-4 flex-wrap">

          <select id="forms" className="form-select w-44 h-10 px-3 text-sm rounded-md bg-white border-0 border-slate-100 shadow-md cursor-pointer" onChange={handleFormChange}>
              <option value="" className="text-xs">All Forms</option>
              <option value="standard" className="text-xs">Standard</option>
              <option value="mega" className="text-xs">Mega Evolution</option>
              <option value="gmax" className="text-xs">Gigantamax</option>
              <option value="alola" className="text-xs">Alolan Form</option>
              <option value="galar" className="text-xs">Galarian Form</option>
              <option value="primal" className="text-xs">Primal</option>
          </select>

          <select onChange={handleTypesChange} className="w-44 h-10  px-3 rounded-md text-sm bg-white border-0 border-slate-100 shadow-md cursor-pointer ">
            <option value="" className="text-xs">Types</option>
            {pokemonTypesArr && pokemonTypesArr.map((t,i) => {
                return <option key={i}value={t} className="text-xs">{t[0].toUpperCase() + t.slice(1)}</option>
            })}
          </select>

          <select onChange={handleGenerationChange} className="w-44 h-10 px-3 text-sm rounded-md bg-white border-0 border-slate-100 shadow-md cursor-pointer">
            <option value="" className="text-xs">Generation</option>
            {pokemonGenerations && pokemonGenerations.map((g, i) => {
                return <option key={i} value={g} className="text-xs">{g[0].toUpperCase() + g.slice(1)}</option>
            })}
          </select>

          <select onChange={handleMoveChange} className="w-44 h-10 px-3 text-sm rounded-md bg-white border-0 border-slate-100 shadow-md cursor-pointer mb-8">
            <option value="" className="text-xs">Moves</option>
            {pokemonGenerations && pokemonGenerations.map((t, i) => {
                return <option key={i} value={t} className="text-xs">{t[0].toUpperCase() + t.slice(1)}</option>
            })}
          </select>

      </div>


      </div>
    </div>
    // <div className={`filter-container z-20  bg-white shadow-md py-4 pt-9 px-4 overflow-y-scroll ${filterIsActive && 'active'}`}>
    //   <div className={` filter-name-section h-8 mt-8 cursor-pointer ${filterIsActive && 'active'}`}>
    //      <div className="flex">
    //        <img src={filterIcon} className="w-5 mr-2 my-auto"/>
    //        <h5 className='font-semibold text-base my-auto'>Filter</h5>
    //      </div>

    //       <div>
    //         <IoClose className="close-filter-icon my-auto text-sm  rounded-full h-6 w-6 p-1 cursor-pointer" onClick={handleFilterIsActive}/>
    //         <LuArrowLeftToLine className="arrow-close-icon h-6 w-6 p-1 rounded-full cursor-pointer" onClick={handleFilterIsActive}/>
    //       </div>
    //   </div>


    //   <div className='filtering-pokemon mt-4 relative'>
    //     {
    //       filterContent.map((f, index) => {
    //         return (
    //           <div className={`relative ${f}-content z-10 details-wrapper relative ${activeIndex === index ? "active" : null }`} key={index} onClick={() => {
    //              handleClick(index)
    //              activeMovesSection !== false &&  setActiveMovesSection(null)
    //           }}>
    //               <details>

    //                 <summary className='font-semibold flex items-center'>
    //                   {f == "Types" && <img src={typesIcon} className="h-5 w-7 my-auto"/>}
    //                   {f == "Generations" && <img src={generationIcon} className="h-4 my-auto mx-1"/>}
    //                   {f == "Regions" && <img src={regionIcon} className="h-4 mx-1  my-auto"/>}
    //                   {f == "Moves" && <img src={movesIcon} className="h-4 mx-1 my-auto"/>}
    //                   {f}
    //                   </summary>

    //               </details>
    //               <IoIosArrowDown className={`show-more-icon`}/>
    //           </div>
    //         )
    //       } )
    //     }

    //     {renderTypesActive}
    //     {renderGenerationActive}
    //     {renderRegionActive}
    //     {movesDetails}

    //   </div>
    // </div>
  );
}

export default FilteringSection;
