import React from "react";
import "../../App.css";

function PokemonList({ pokemonSprite, pokemonId, pokemonName, pokemonTypes }) {
  const mapTesting = pokemonTypes.map((t) => t);

  console.log(mapTesting[0]);

  return (
    <section className="bg-white rounded-md h-56 max-h-68 flex flex-col items-center">
      <img
        src={pokemonSprite}
        className={`h-32 translate-y-[-3.5em] `}
        alt="img not found"
      />
      <h3>{pokemonName}</h3>
      <p>{pokemonId}</p>

      <div className="flex gap-x-3">
        {pokemonTypes.map((b) => {
          return <div className={` px-5 py-1 rounded-md ${b}`}>{b}</div>;
        })}
      </div>
    </section>
  );
}

export default PokemonList;
