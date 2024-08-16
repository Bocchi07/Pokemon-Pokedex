import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList.jsx";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Pagination({
  prevBtn,
  nextBtn,
  searchPokemon,
  handleSearch,
  searchedPokemon,
  currentPokemon,
  handlePokemonPreview,
  page
}) {
  // console.log(currentPokemon);
  return (
    <div className="ml-[20%] w-[100%] h-[90%] rounded-md p-4 mt-20">
      {/* <div className=" border-slate-600 border-solid  py-8 ">
        <input
          type="text"
          placeholder="Enter a name or id"
          id="search-pokemon"
          value={searchPokemon}
          onChange={handleSearch}
          className="py-3 px-2 w-[70%] rounded-lg rounded-r-none"
        />
        <button
          onClick={searchedPokemon}
          className="bg-blue-500 py-3 px-2 text-center text-white rounded-r-md"
        >
          Search
        </button>
      </div> */}
      <div className=" w-full grid grid-cols-3 gap-y-5 gap-x-4">
        {currentPokemon.map((c, index) => {
          return (
            <PokemonList
              pokemonSprite={c.sprites}
              pokemonId={c.id}
              pokemonName={c.name}
              pokemonTypes={c.types}
              height={c.height}
              weight={c.weight}
              stats={c.stats}
              abilities={c.abilities}
              keyItem={index}
              handlePokemonPreview={handlePokemonPreview}
            />
          );
        })}
      </div>

  
      <div className="mx-auto mt-10 shadow-md bg-white rounded-md py-2 px-4 w-40 flex justify-center align-center">
          <button onClick={prevBtn} type="button" className="w-[20%]" >
             <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <h2 className="flex-1">{page}</h2>
          <button onClick={nextBtn} type="button" className="w-[20%]" >
             <MdKeyboardDoubleArrowRight  />
          </button>
      </div>
  
    </div>
  );
}

export default Pagination;

// const [currentPokemon, setCurrentPokemon] = useState([]);
// const [page, setPage] = useState(1);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// // Fetch Pokémon data
// useEffect(() => {
//   const fetchPokemonList = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Calculate offset based on the current page
//       const offset = (page - 1) * 20;
//       const response = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
//       );
//       const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);

//       // Fetch details for each Pokémon
//       const pokemonDetailsPromises = pokemonUrls.map((url) => axios.get(url));
//       const pokemonDetailsResponses = await Promise.all(
//         pokemonDetailsPromises
//       );

//       // Extract the relevant data
//       const detailedPokemon = pokemonDetailsResponses.map((res) => {
//         const { id, name, sprites, types } = res.data;
//         return {
//           id,
//           name,
//           sprite: sprites.front_default,
//           types: types.map((typeInfo) => typeInfo.type.name),
//         };
//       });

//       setCurrentPokemon(detailedPokemon);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchPokemonList();
// }, [page]); // Dependency array includes `page` to fetch new data when page changes

// // Handler functions for pagination
// const nextPage = () => setPage(page + 1);
// const prevPage = () => setPage(page > 1 ? page - 1 : 1);

// return (
//   <div>
//     <h1>Pokémon List</h1>
//     {loading && <p>Loading...</p>}
//     {error && <p>Error: {error}</p>}
//     <ul>
//       {currentPokemon.map((pokemon) => (
//         <li key={pokemon.id}>
//           <h2>{pokemon.name}</h2>
//           <img src={pokemon.sprite} alt={pokemon.name} />
//           <p>ID: {pokemon.id}</p>
//           <p>Types: {pokemon.types.join(", ")}</p>
//         </li>
//       ))}
//     </ul>
//     <button onClick={prevPage} disabled={page === 1}>
//       Previous
//     </button>
//     <button onClick={nextPage}>Next</button>
//   </div>
// );
