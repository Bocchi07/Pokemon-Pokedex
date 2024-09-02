import React, {useState} from "react";
import "../../App.css";
import PokemonStats from "../PokemonStats.jsx"
import PokemonEvolutionStages from "../PokemonEvolutionStages.jsx";
import PokeballIcon from "../../assets/Icons/Pokeball.png"
import Info from "../../assets/Icons/info.svg"
import rightArrow from "../../assets/Icons/right-arrow.svg";
import "./preview.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { TiArrowLeftOutline } from "react-icons/ti";
import { IoMdInformationCircleOutline } from "react-icons/io";

function PokemonPreview({handleEvolutionStagesPreview, pokemonData, closePage, evolutionStage, pokemonAddInfo, previewPokemon, prevPokemon, nextPokemon, loading, switchNextPage, switchPrevPage, prevEndPoint, prevSetEndPoint }) {
  const pokemonType = pokemonData && pokemonData.types[0];
  const [pokemonImg, setPokemonImg] = useState([]);
  const [abilityInfo, setAbilityInfo] = useState();
  const [abilityIsActive, setAbilityIsActive] = useState(false);
  let totalStats = 0;

  
  const pokemonFacts = pokemonAddInfo && pokemonAddInfo.flavor_text_entries.flavor_text ;
  const secondPokemonFacts = pokemonAddInfo && pokemonAddInfo.flavor_text_entries_alt.flavor_text;
  const thirdPokemonFacts = pokemonAddInfo && pokemonAddInfo.flavor_text_mega;
  const pokemonEggGroups = pokemonAddInfo && pokemonAddInfo.egg_groups.map((e, i) => <p key={i} >{e.name}</p>) ;

  const getPokemonWeight = pokemonData && pokemonData.weight / 10;
  const getPokemonHeight = pokemonData && pokemonData.height * 10;

  const getPokemonFirstForm = evolutionStage  &&  evolutionStage.images.firstForm;
  const getPokemonSecondForm = evolutionStage &&  evolutionStage.images.secondForm;
  const getPokemonLastForm = evolutionStage &&  evolutionStage.images.thirdForm;

  const currentPokemonID = pokemonData && String(pokemonData.id).padStart(4, "0")

  const handleTotalStats = () => {
    const mapStats = pokemonData && pokemonData.stats.map(s => totalStats += s.statNum);
    
    return `${totalStats}`
  }

  handleTotalStats();

  const totalStatsPercent = Math.ceil((totalStats / 1512) * 100);

  const totalStatsWidth = {
    width: `${totalStatsPercent}%`,
  }

  let prevPokemonFix = () => {
    if (prevPokemon){
      const firstLetterOfName = prevPokemon && prevPokemon.name[0].toUpperCase();
      const restOfTheName = prevPokemon && prevPokemon.name.slice(1);
      const prevId = prevPokemon && prevPokemon.id;
      
      let pokemonFixID;
      let pokemonFixName = firstLetterOfName + restOfTheName;
  
      switch (prevId.toString().length) {
        case 1:
          pokemonFixID = `#000${prevId}`;
          break;
        case 2:
          pokemonFixID = `#00${prevId}`;
          break;
        case 3:
          pokemonFixID = `#0${prevId}`;
          break;
        case 4:
          pokemonFixID = `#0${prevId}`;
          break;
      }
  
      return {
        id: pokemonFixID,
        name: pokemonFixName
      }
    }
  };

  const getPokemonAbility = async (data) => {
    const getData = async () => {
      try{
        const res = await axios.get(`https://pokeapi.co/api/v2/ability/${data}`)
        const promise = res.data.effect_entries.filter(e => e.language.name === "en" && e.effect);
        const name = res.data.name;

        return {
          effect: promise[0].effect,
          name: name[0].toUpperCase() + name.slice(1)
        }
      } catch(error) {
        console.error(error)
      }
    }

    setAbilityInfo(await getData())
    isAbilityActive(true)
  }

  const isAbilityActive = (param) => {
    setAbilityIsActive(param)
  }

  // console.log(abilityInfo)

  let nextPokemonFix = () => {
    if (nextPokemon){
      const firstLetterOfName = nextPokemon && nextPokemon.name[0].toUpperCase();
      const restOfTheName = nextPokemon && nextPokemon.name.slice(1);
      const nextId = nextPokemon && nextPokemon.id;
  
      let pokemonFixID;
      let pokemonFixName = firstLetterOfName + restOfTheName;
  
      switch (nextId.toString().length) {
        case 1:
          pokemonFixID = `#000${nextId}`;
          break;
        case 2:
          pokemonFixID = `#00${nextId}`;
          break;
        case 3:
          pokemonFixID = `#0${nextId}`;
          break;
        case 4:
          pokemonFixID = `#0${nextId}`;
          break;
      }
  
      return {
        id: pokemonFixID,
        name: pokemonFixName
      }
    }
   
  };


  return (
    <div className="z-10 pokemon-preview rounded-md relative mt-15" >
      <div>

          {/*<button onClick={closePage} className="back-msg"> Back </button>*/}
        </div>

      <div className="preview-container flex justify-between mt-4">
       <div className={`prev-container text-left ${prevEndPoint ? "active" : ''}`}>
          {/*<img className="w-7 text-right mb-auto mr-2 cursor-pointer rotate-180" src={rightArrow} alt="" onClick={switchPrevPage} disabled={!prevPokemon}/>*/}
       <TiArrowLeftOutline  className="w-7 text-right mb-auto mr-2 cursor-pointer mt-1 text-xl" src={rightArrow} alt="" onClick={switchPrevPage} disabled={!prevPokemon}/>
              <div className="opacity-70">
                  <h2 className="font-semibold text-sm">{prevPokemonFix() && prevPokemonFix().name}</h2>
                 <span className ="span-id text-xs text-gray-600 font-semibold">#{prevPokemon && String(prevPokemon.id).padStart(4, "0") }</span>
              </div>
            
        </div>    

        <div className="z-10 mb-8 flex flex-col items-center content-center mx-auto ">
            <div className="flex items-center gap-x-3 mb-2 ">
              <img src={PokeballIcon} className="w-5" />
              <h1 className="text-3xl font-semibold">{pokemonData && pokemonData.name[0] + pokemonData.name.slice(1)}</h1>
              <span className="text-gray-400 text-xs">#{pokemonData && String(pokemonData.id).padStart(4, "0")
}</span>
            </div>
         </div>


        <div className="next-container text-right ">
          <div className="opacity-70">
            <h2 className="font-semibold text-sm">{nextPokemonFix() && nextPokemonFix().name}</h2>
            <span className = "text-xs span-id  text-gray-600 font-semibold">#{nextPokemon && String(nextPokemon.id).padStart(4, "0")}</span>
          </div>


           <TiArrowLeftOutline  className="w-7 text-right mb-auto mr-2 rotate-180 cursor-pointer mt-1 text-xl ml-2"  onClick={switchNextPage} disabled={!nextPokemon}/>
          {/*<img className="w-7 text-right mb-auto ml-2 cursor-pointer" src={rightArrow} alt="" onClick={switchNextPage} disabled={!nextPokemon}/>*/}
        </div>  
      </div>

  <div className="pokemon-container w-full gap-3">
        <div className="pokemon-image-container relative  p-2 block content-center text-center rounded-3xl">
            <img
              src={pokemonData && pokemonData.sprite || previewPokemon.sprites}
              alt="image_not_found"
              className={` bg-${pokemonType} flex items-end justify-center rounded-md mx-auto ${loading ? "loading" : " "}`}
            />
{/*
            <MdKeyboardArrowLeft className="sm-arrow absolute top-1/2 left-[-1rem] text-3xl opacity-50" onClick={switchPrevPage} disabled={!prevPokemon}/>
             <MdKeyboardArrowLeft className="sm-arrow absolute top-1/2 right-[-1rem] text-3xl opacity-50 rotate-180"  onClick={switchNextPage} disabled={!nextPokemon}/>
*/}
             <TiArrowLeftOutline className="sm-arrow absolute top-1/2 -left-1 text-2xl opacity-50" onClick={switchPrevPage} disabled={!prevPokemon}/>
             <TiArrowLeftOutline  className="sm-arrow absolute top-1/2 -right-1 text-2xl opacity-50 rotate-180"  onClick={switchNextPage} disabled={!nextPokemon}/>

        </div>

        <div className=" mb-8 gap-x-2 z-10 mt-4 pokemon-type-sm w-full justify-center ">
               <h4 className="mb-2 font-semibold text-lg">Type</h4>

               <div className="flex justify-center">
                  {
                   pokemonData && pokemonData.types.map((b, i) => {
                    return <div key={i} className={`${b} rounded-full text-base py-1 mr-2 px-7`}> {b} </div>
                    })
                  }
                </div>
            </div>

        <div className=" rounded-md flex-1 text-left mt-12">
          <div className="flex justify-between items-center">
              <div>
                <div className = "flex items-center gap-x-2">
                    <h4 className="text-lg font-semibold mb-2">Facts</h4>
                    <IoMdInformationCircleOutline className="mb-2"/>
                </div>

                {
                  thirdPokemonFacts && <p className="text-sm mb-4">{thirdPokemonFacts}</p>
                }
                {
                  secondPokemonFacts && <p className="text-sm mb-4">{secondPokemonFacts}</p>
                }

                {
                  pokemonFacts && <p className="text-sm ">{pokemonFacts}</p>
                }

              </div>  
          </div> 
   
         <div className="flex gap-x-4">
            <div className="w-40%] mt-8 pokemon-types-btm">
                <h4 className="mb-2 font-semibold text-lg">Type</h4>
                <div className=" flex gap-x-2 z-10">
                  {
                   pokemonData && pokemonData.types.map((b, i) => {
                    return <div key={i} className={`${b} rounded-2xl text-sm py-1 px-6`}> {b} </div>
                    })
                  }
                </div>
            </div>
         </div>
        </div>
  </div>

  <div className="info-pokemon-wrapper rounded-md relative mt-8 gap-4 bg-transparent ">
      <div className="about-pokemon-wrapper  h-full relative p-5 my-auto  rounded-xl shadow-md border-[1px] border-white" >
        <h4 className="text-center text-2xl font-bold mb-6">Basic Information</h4>
        <div className="grid grid-cols-2 place-items-center gap-y-4">
          <div className="about-pokemon block">
            <h4 className="text-lg mb-2 font-semibold">Height</h4>
            <div className="w-28 text-sm px-2 py-1 rounded-md ">{getPokemonHeight}cm</div>
          </div>

          <div className="about-pokemon block">
            <h4 className="text-lg mb-2 font-semibold">Weight</h4>
            <div className="w-28 text-sm px-2 py-1 rounded-md ">{getPokemonWeight}kg</div>
          </div>

          <div className="about-pokemon relative flex flex-col items-center ">
              <div className="text-lg mb-2 font-semibold flex gap-x-2 items-center cursor-pointer">Abilities</div>

              <div className="text-sm rounded-md gap-y-2  flex flex-col items-center block">
              {
                pokemonData && pokemonData.abilities.map((a, i) => <div key={i} className="flex text-sm px-2 py-1 rounded-md">{a[0].toUpperCase() + a.slice(1)} <span> <CiCircleQuestion className="text-xl cursor-pointer ml-2 " onClick={() => getPokemonAbility(a)}/></span></div>)
              }
              </div>
          </div>

          <div className="about-pokemon block">
            <h4 className="text-lg mb-2 font-semibold ">Egg Groups</h4>
              <div className="flex flex-col gap-y-2">
                {pokemonEggGroups}
              </div>
          </div>
        </div>



          <div className={`ability-container absolute bottom-0 top-0 text-left overflow-y-auto custom-scroll right-0 left-0 transition-all bg-slate-700 p-6 shadow-2xl overflow-hidden text-white  rounded-xl ${abilityIsActive ? 'block' : 'hidden'}`}>
            <div className=" flex justify-between  w-full items-center mb-8 ">
              <div className="opacity-70">Ability Info</div>
              <div className="absolute -top-1 cursor-pointer rounded-lg text-sm -right-2 text-left flex gap-2 items-center bg-slate-800 pt-3 pr-5 p-2" onClick={() => isAbilityActive(false)}><IoClose className=""/> <span>Close</span></div>
            </div>

            <div>
              <h2 className="font-bold text-xl mb-2">{abilityInfo && abilityInfo.name}</h2>
              <p className="text-sm">{abilityInfo && abilityInfo.effect}</p>
            </div>
          </div>
        </div>


    <div className="stats-container flex-1">
          <div className=" flex-1 p-2 rounded-md">
            <h4 className="text-center text-2xl font-bold mb-6">Statistic</h4>
             {
             pokemonData && pokemonData.stats.map((s, i) => {
                return <PokemonStats key={i} statsName={s.statName} statsNum = {s.statNum} handleTotalStats={handleTotalStats}/>
              })
             }

          <div className='flex text-left gap-4'>
                  <div className=' w-[20%] mb-4 text-gray-600 text-nowrap'>
                      <h4 className='font-semibold'>Total:</h4>
                  </div>

                  <div className='w-[10%] '>
                      <h4 className='text-sm font-semibold'>{totalStats}</h4>
                  </div>

                  <div className='flex-1 px-2'>
                      <div className='bg-gray-200 w-full rounded-2xl h-6 mb-1'>
                        <div className={`bg-total h-full rounded-2xl `} style={totalStatsWidth}>
                        </div>
                      </div>
                  </div>
              </div>
          </div></div>

  </div>

          <PokemonEvolutionStages
            evolutionStage={evolutionStage}
            firstForm={getPokemonFirstForm}
            secondForm={getPokemonSecondForm}
            lastForm={getPokemonLastForm}
            handleEvolutionStagesPreview={handleEvolutionStagesPreview}
            itemKey = {pokemonData && pokemonData.id}
            />



    </div>
  );
}

export default PokemonPreview;
