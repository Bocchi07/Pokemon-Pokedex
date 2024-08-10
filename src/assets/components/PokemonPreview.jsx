import React from "react";
import "../../App.css";

function PokemonPreview({ pokemonData, closePage }) {
  // console.log(pokemonData);
  return (
    <div className="bg-slate-100 h-[90vh] p-10  rounded-md">
      <div className="preview-container">
        <button onClick={closePage}> Back </button>
      </div>

      <div className="flex w-full gap-3">
        <div className="shadow-md bg-white w-[30%] h-96 p-2 flex items-center  justify-center rounded-md">
          <img
            src={pokemonData.sprite}
            alt="image_not_found"
            className="h-[80%]  flex items-end justify-center rounded-md"
          />
        </div>

        <div className="shadow-md bg-white rounded-md flex-1 p-7 text-left">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold mb-2">Height</h4>
              <p className="bg-slate-200 px-2 w-24 text-left rounded-md text-sm py-1">
                {pokemonData.height}
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Weight</h4>
              <p className="bg-slate-200 px-2 w-28 text-left rounded-md text-sm py-1">
                {pokemonData.weight}
              </p>
            </div>

            <div>
              <div className=" gap-x-3 mt-2">
                <h4 className="mb-2 font-semibold">Abilities</h4>
                <select className="py-1 border-none rounded-md w-28 text-sm bg-slate-200 outline-none">
                  {/* Default option */}
                  {pokemonData.abilities.map((t, index) => (
                    <option
                      key={index}
                      value={t}
                      className="text-sm p-2 outline-none"
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="w-20 mt-4">
            <h4 className="mb-2 font-semibold">Type</h4>
            <div className="flex gap-x-2">
              {pokemonData.types.map((t) => (
                <div className={`${t} px-6 py-1 rounded-md text-sm`}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonPreview;
