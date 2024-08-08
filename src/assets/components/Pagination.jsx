import React, { useState, useEffect } from "react";

const Pagination = ({
  prevBtn,
  nextBtn,
  searchPokemon,
  handleSearch,
  searchedPokemon,
}) => {
  return (
    <div className="bg-red-300 w-[95%] h-[90%]">
      <div className="bg-white border-slate-500 border-solid">
        <input
          type="text"
          placeholder="Enter a name or id"
          id="search-pokemon"
          value={searchPokemon}
          onChange={handleSearch}
        />
      </div>

      <button onClick={searchedPokemon}>Search</button>
      <h2 className="">Hello</h2>
      <button onClick={prevBtn} type="button">
        Prev
      </button>
      <button onClick={nextBtn} type="button">
        Next
      </button>
    </div>
  );
};

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
