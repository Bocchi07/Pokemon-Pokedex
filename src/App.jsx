import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./assets/components/Pagination";
import axios from "axios";
import PokemonPreview from "./assets/components/PokemonPreview.jsx";

function App() {
  const [page, setPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState();
  const [pokemonSearchUrl, setPokemonSearchUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewPokemon, setPreviewPokemon] = useState();
  const [switchPage, setSwitchPage] = useState("Pagination");

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
          const { id, name, types, sprites, height, weight, stats, abilities } =
            res.data;
          return {
            id,
            name,
            types: types.map((info) => info.type.name),
            sprites: sprites.other['official-artwork'].front_default,
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
        });

        setCurrentPokemon(detailedPokemon);
        // console.log(pokemonDetailsResponses);
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
          sprites: sprites.official - artwork.front_default,
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

      // console.log(getPokemonData());
      setSearchPokemon("");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePokemonPreview = (pokemonData) => {
    setSwitchPage("PokemonPreview");
    setPreviewPokemon((prevPokemon) => (prevPokemon = pokemonData));
  };

  const backToPaginationPg = () => {
    setSwitchPage("Pagination");
  };

  // console.log(switchPage);

  return (
    <>
      {switchPage === "Pagination" ? (
        <Pagination
          prevBtn={prevPokemon}
          nextBtn={nextPokemon}
          searchPokemon={searchPokemon}
          handleSearch={handlePokemonInput}
          searchedPokemon={handleSearchedPokemon}
          currentPokemon={currentPokemon}
          handlePokemonPreview={handlePokemonPreview}
        />
      ) : (
        <PokemonPreview
          pokemonData={previewPokemon}
          closePage={backToPaginationPg}
        />
      )}
    </>
  );
}

export default App;
