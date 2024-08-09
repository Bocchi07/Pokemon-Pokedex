import React from "react";

function PokemonPreview({ pokemonData, closePage }) {
  console.log(pokemonData);
  return (
    <div className="bg-slate-200 h-[100vh] p-10 rounded-md">
      <div className="preview-container">
        <button onClick={closePage}> Backod</button>
      </div>

      <div className="flex w-full gap-3">
        <div className="bg-white w-[30%] h-96 p-2 flex items-center  justify-center rounded-md">
          <img
            src={pokemonData.sprite}
            alt="image_not_found"
            className="w-full h-full  p-4 rounded-md"
          />
        </div>
        <div className="bg-blue-300 flex-1"></div>
      </div>
    </div>
  );
}

export default PokemonPreview;
