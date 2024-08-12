import React from "react";
import "../../App.css";

function PokemonPreview({ pokemonData, closePage, evolutionStage, pokemonAddInfo }) {
  const pokemonType = pokemonData.types[0];
  
  const pokemonFacts = pokemonAddInfo ? pokemonAddInfo.flavor_text_entries.flavor_text : " ";
  const pokemonEggGroups = pokemonAddInfo ? pokemonAddInfo.egg_groups.map(e => <option >{e.name}</option>) : null;

  const getPokemonWeight = pokemonData.weight / 10;
  const getPokemonHeight = pokemonData.height * 10

  console.log(pokemonData.abilities);

  return (
    <div className=" h-[90vh] p-10  rounded-md">

      <div className="preview-container flex justify-between">
        <div>
        <button onClick={closePage}> Back </button>
        </div>
       

        <div className="z-10 mb-8 flex flex-col items-center content-center mx-auto ">
                <div className="flex items-center gap-x-3 mb-2 ">
                  <h1 className="text-3xl font-semibold">{pokemonData.name}</h1>
                  <span className="text-gray-400 text-sm">{pokemonData.id}</span>
                </div>
         </div>

         <div>

         </div>
      </div>

     


      <div className="flex w-full gap-3">
  
        <div className="relative w-[40%] h-96 p-2 block content-center text-center rounded-md"> 
            <img
              src={pokemonData.sprite}
              alt="image_not_found"
              className={` bg-${pokemonType} max-w-[90%] flex items-end justify-center rounded-md mx-auto`}
            />
        </div>

        <div className=" rounded-md flex-1 p-7 text-left ">
          <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold mb-2">Facts</h4>
                <p className="text-sm">{pokemonFacts}</p>
              </div>  
          </div>

          <div className="mt-8 w-full grid grid-cols-4">      
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
                    pokemonData.abilities.map(a => <option >{a}</option>)
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
                pokemonData.types.map(b => {
                return <div className={`${b} rounded-2xl text-sm py-1 px-6`}> {b} </div>
                })
              }
            </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default PokemonPreview;
