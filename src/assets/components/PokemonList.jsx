import React from "react";
import "../../App.css";

function PokemonList({
  keyItem,
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
  const mapTesting = pokemonTypes.map((t) => t);
  let pokemonFixID;

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
    id: pokemonFixID,
    types: pokemonTypes.map((t) => t),
    height: height,
    weight: weight,
    abilities: abilities,
    sprite: pokemonSprite,
    stats: stats,
  };

  // console.log(pokemonData);

  return (
    <section
      key={keyItem}
      className="pokemon-list-container bg-white rounded-xl h-56 max-h-68  flex flex-col items-center "
      onClick={() => handlePokemonPreview(pokemonData)}
    >
      <img
        src={pokemonSprite}
        className={`pokemon-img h-32 translate-y-[-.4em] max-h-32`}
        alt="img not found"
      />
      <h3 className="text-lg font-semibold">{sliceName()}</h3>
      <p className="text-sm mt-1">{pokemonFixID}</p>

      <div className="flex gap-x-3">
        {pokemonTypes.map((b, i) => {
          return (
            <div
              key={i}
              className={` text-sm text-center mt-2 px-5 py-1 rounded-2xl ${b}`}
            >
              {b}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PokemonList;
