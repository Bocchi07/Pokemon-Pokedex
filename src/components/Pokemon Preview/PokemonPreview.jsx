import React, {useState} from "react";
import "../../App.css";
import PokemonStats from "../PokemonStats.jsx"
import PokemonEvolutionStages from "../PokemonEvolutionStages.jsx";
import PokeballIcon from "../../assets/Icons/Pokeball.png"
import Info from "../../assets/Icons/info.svg"
import rightArrow from "../../assets/Icons/right-arrow.svg";
import "./preview.css";


function PokemonPreview({handleEvolutionStagesPreview, pokemonData, closePage, evolutionStage, pokemonAddInfo, previewPokemon, prevPokemon, nextPokemon, loading, switchNextPage, switchPrevPage, prevEndPoint, prevSetEndPoint }) {
  const pokemonType = pokemonData.types[0];
  const [pokemonImg, setPokemonImg] = useState([]);
  let totalStats = 0;

  
  const pokemonFacts = pokemonAddInfo ? pokemonAddInfo.flavor_text_entries.flavor_text :  " ";
  const secondPokemonFacts = pokemonAddInfo ? pokemonAddInfo.flavor_text_entries_alt.flavor_text :  " ";
  const thirdPokemonFacts = pokemonAddInfo ? pokemonAddInfo.flavor_text_mega :  " ";
  const pokemonEggGroups = pokemonAddInfo ? pokemonAddInfo.egg_groups.map((e, i) => <option key={i} >{e.name}</option>) : null;

  const getPokemonWeight = pokemonData.weight / 10;
  const getPokemonHeight = pokemonData.height * 10

  const getPokemonFirstForm = evolutionStage  &&  evolutionStage.images.firstForm;
  const getPokemonSecondForm = evolutionStage &&  evolutionStage.images.secondForm;
  const getPokemonLastForm = evolutionStage &&  evolutionStage.images.thirdForm;

  const currentPokemonID = String(pokemonData.id).padStart(4, "0")

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

  console.log(pokemonAddInfo)

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

  // console.log(nextPokemonFix())

  return (
    <div className="z-10 pokemon-preview p-10  rounded-md relative mt-12">
      <div>
          <button onClick={closePage}> Back </button>
        </div>

      <div className="preview-container flex justify-between">
       <div className={`prev-container text-left flex ${prevEndPoint ? "active" : ''}`}>
          <img className="w-7 text-right mb-auto mr-2 cursor-pointer rotate-180" src={rightArrow} alt="" onClick={switchPrevPage} disabled={!prevPokemon}/>

              <div className="opacity-70">
                  <h2 className="font-semibold text-sm">{prevPokemonFix() && prevPokemonFix().name}</h2>
                 <span className ="span-id text-xs text-gray-600 font-semibold">#{prevPokemon && String(prevPokemon.id).padStart(4, "0") }</span>
              </div>
            
        </div>    

        <div className="z-10 mb-8 flex flex-col items-center content-center mx-auto ">
            <div className="flex items-center gap-x-3 mb-2 ">
              <img src={PokeballIcon} className="w-5" />
              <h1 className="text-3xl font-semibold">{pokemonData.name[0] + pokemonData.name.slice(1)}</h1>
              <span className="text-gray-400 text-xs">#{String(pokemonData.id).padStart(4, "0")
}</span>
            </div>
         </div>


        <div className="next-container text-right flex">
          <div className="opacity-70">
            <h2 className="font-semibold text-sm">{nextPokemonFix() && nextPokemonFix().name}</h2>
            <span className = "text-xs span-id  text-gray-600 font-semibold">#{nextPokemon && String(nextPokemon.id).padStart(4, "0")}</span>
          </div>

          <img className="w-7 text-right mb-auto ml-2 cursor-pointer" src={rightArrow} alt="" onClick={switchNextPage} disabled={!nextPokemon}/>
        </div>  
      </div>

      <div className="pokemon-container w-full gap-3">
        <div className="pokemon-image-container relative h-80 p-2 block content-center text-center rounded-3xl"> 
            <img
              src={pokemonData.sprite || previewPokemon.sprites}
              alt="image_not_found"
              className={` bg-${pokemonType} h-full flex items-end justify-center rounded-md mx-auto ${loading ? "loading" : " "}`}
            />
        </div>

        <div className=" rounded-md flex-1 p-7 text-left ">
          <div className="flex justify-between items-center">
              <div>
                <div className = "flex align-center">
                    <h4 className="text-lg font-semibold mb-2">Facts</h4>
                    <img className="w-4 mb-2 ml-1" src={Info} />
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
   
          <div className="relative mt-8 w-full grid grid-cols-4">
              <div>
                <h4 className="text-lg mb-2 font-semibold">Height</h4>
                <div className="w-28 text-sm px-2 py-1 rounded-md bg-gray-200 ">{getPokemonHeight}cm</div>
              </div>

              <div>
                <h4 className="text-lg mb-2 font-semibold">Weight</h4>
                <div className="w-28 text-sm px-2 py-1 rounded-md bg-gray-200 ">{getPokemonWeight}kg</div>
              </div>

              <div>
                <h4 className="text-lg mb-2 font-semibold">Abilities</h4>
                <select name="" id="" className="w-28 text-sm px-2 py-1 rounded-md bg-gray-200 ">
                  {
                    pokemonData.abilities.map((a, i) => <option key={i}>{a}</option>)
                  }
                </select>
              </div>

              <div>
                <h4 className="text-lg mb-2 font-semibold">Egg Groups</h4>
                  <select className="w-28 text-sm px-2 py-1 rounded-md bg-gray-200 ">
                    {pokemonEggGroups}
                  </select>
              </div>
          </div>

        <div className="w-20 mt-8">
            <h4 className="mb-2 font-semibold text-lg">Type</h4>
            <div className="flex gap-x-2 z-10">
              {
                pokemonData.types.map((b, i) => {
                return <div key={i} className={`${b} rounded-2xl text-sm py-1 px-6`}> {b} </div>
                })
              }
            </div>
        </div>



        </div>
    
      </div>

      <div className=" gap-x-4 mb-10 mt-8   pt-8">      
          <div className="ml-4 h-80 flex-1">
            <h4 className="text-center text-2xl font-semibold mb-8">Statistic</h4>
             {
              pokemonData.stats.map((s, i) => {
                return <PokemonStats key={i} statsName={s.statName} statsNum = {s.statNum} handleTotalStats={handleTotalStats}/>
              })
             } 

          <div className='flex text-left gap-4 '>
                  <div className='max-w-[27%] w-[20%] mb-4 text-gray-600 text-nowrap'>
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
          </div>

          <PokemonEvolutionStages 
            evolutionStage={evolutionStage} 
            firstForm={getPokemonFirstForm} 
            secondForm={getPokemonSecondForm} 
            lastForm={getPokemonLastForm}
            handleEvolutionStagesPreview={handleEvolutionStagesPreview}
            itemKey = {pokemonData.id}
            />

        </div>

        <footer className="mt-40 text-sm">
        © 2024 Pokédex Central.
        Catch 'Em All with Us! 🌟
        Explore the world of Pokémon and stay updated with the latest Pokédex entries.
        Questions or feedback? Contact us at jeavenanda07@gmail.com.
        Follow us on [social media links].
        </footer>
    </div>
  );
}

export default PokemonPreview;
