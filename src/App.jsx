import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./assets/components/Pagination";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState();
  const [pokemonSearchUrl, setPokemonSearchUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pokemonList = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * 20;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
        );
        const pokemonURL = response.data.results.map((pokemon) => pokemon.url);

        const pokemonDetailsPromises = pokemonURL.map((res) => axios.get(res));
        const pokemonDetailsResponses = await Promise.all(
          pokemonDetailsPromises
        );

        const detailedPokemon = pokemonDetailsResponses.map((res) => {
          const { id, name, types, sprites } = res.data;
          return {
            id,
            name,
            types: types.map((info) => info.type.name),
            sprites: sprites.other.dream_world.front_default,
          };
        });

        setCurrentPokemon(detailedPokemon);
        console.log(currentPokemon);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    pokemonList();
  }, [page]);

  const prevPokemon = () => {
    setPage((p) => (p > 1 ? p - 1 : 1));
  };
  const nextPokemon = () => {
    setPage((p) => p + 1);
  };

  const handlePokemonInput = (e) => {
    setSearchPokemon((p) => e.target.value);
  };

  const handleSearchedPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`
      );

      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } =
          response.data;

        return {
          id,
          name,
          sprites: sprites.other.dream_world,
          types: types.map((t) => t.type.name),
          height,
          weight,
          stats: stats.map((s) => {
            return {
              statNum: s.base_stat,
              statName: s.stat.name,
            };
          }),
          abilities: abilities.map((a) => a.ability.name),
        };
      };
      // setPokemonSearchUrl(response);

      console.log(getPokemonData());
      setSearchPokemon("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Pagination
        prevBtn={prevPokemon}
        nextBtn={nextPokemon}
        searchPokemon={searchPokemon}
        handleSearch={handlePokemonInput}
        searchedPokemon={handleSearchedPokemon}
        currentPokemon={currentPokemon}
      />
    </>
  );
}

export default App;
