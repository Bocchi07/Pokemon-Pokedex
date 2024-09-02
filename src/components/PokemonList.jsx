import React from "react";
import "../App.css";
import Pokeball from "../assets/Images/pokeball.png"

function PokemonList({
  pokemonSprite,
  pokemonId,
  pokemonName,
  pokemonTypes,
  handlePokemonPreview,
  height,
  weight,
  stats,
  abilities,
}) {
 
  let pokemonFixID;
  let pokemonPrevId = pokemonId >= 1 ? pokemonId - 1 : 1;
  let pokemonNextId = pokemonId + 1 ;

  // console.log(pokemonPrevId)

  let sliceName = () => {
    const firstLetterOfName = pokemonName[0].toUpperCase();
    const restOfTheName = pokemonName.slice(1);

    return firstLetterOfName + restOfTheName;
  };

  switch (pokemonId.toString().length) {
    case 1:
      pokemonFixID = `#000${pokemonId}`;
      break;
    case 2:
      pokemonFixID = `#00${pokemonId}`;
      break;
    case 3:
      pokemonFixID = `#0${pokemonId}`;
      break;
    case 4:
      pokemonFixID = `#0${pokemonId}`;
      break;
  }

  const pokemonData = {
    name: sliceName(),
    id: String(pokemonId).padStart(4, '0'),
    types: pokemonTypes.map((t) => t),
    height: height,
    weight: weight,
    abilities: abilities,
    sprite: pokemonSprite,
    stats: stats,
  };


  return (
    <section
      className={` relative pokemon-list-container rounded-xl  max-h-48  flex items-center justify-between shadow-md  overflow-hidden ${pokemonTypes[0]}`}
      onClick={() => handlePokemonPreview(pokemonData, pokemonPrevId, pokemonNextId)}
    >

    <div className="z-10 flex flex-col items-left justify-start mb-auto">
       <h3 className="pokemon-card-name text-white mb-4 font-extrabold ">{sliceName()}</h3>
        <div className="mb-auto">
          {pokemonTypes.map((b, index) => {
            return (
              <div
                key={index}
                className={`card-type font-semibold text-center  mt-2 px-2 py-1 border border-white rounded-2xl ${b}`}
              >
                {b}
              </div>
            );
          })}
        </div>
    </div>

    <div className="z-10 h-full flex flex-col justify-between">
      <p className="card-id font-semibold text-white-600 opacity-50 ml-auto mb-auto">#{String(pokemonId).padStart(4, "0")}</p>
      <img
      src={pokemonSprite}
      className={`card-sprite z-10 pokemon-img h-full object-contain`}
      alt="img not found"
    />

    </div>

  <img src={Pokeball} className="pokeball-bg  absolute z-0  opacity-50"/>

    </section>
  );
}

export default PokemonList;
