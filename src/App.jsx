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
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [evolutionStage, setEvolutionStage] = useState();
  const [pokemonAddInfo, setPokemonAddInfo] = useState();

  let content;

  useEffect(() => {
    const pokemonList = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * 20;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`
        );
        const pokemonURL = response.data.results.map((pokemon) => {
          return pokemon.url;
        });

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
            sprites: sprites.other["official-artwork"].front_default,
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

      setSearchPokemon("");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePokemonPreview = (pokemonData) => {
    setSwitchPage("PokemonPreview");
    setPreviewPokemon(pokemonData);
    const pokemonName = pokemonData.name.toLowerCase();

    const getPokemonSpecies = async () => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
            );

            const { evolves_from_species, egg_groups, flavor_text_entries } = response.data;

            const getPokemonData = () => {
                return {
                    evolves_from_species: evolves_from_species?.name || '',
                    egg_groups,
                    flavor_text_entries: flavor_text_entries[6] ,
                };
            };


            const getPokemonEvolutionStages = async () => {
                let evolutionStagesData = {
                    images: {
                        firstForm: "",
                        secondForm: "",
                        thirdForm: "",
                    },
                    name: {
                        firstForm: "",
                        secondForm: "",
                        thirdForm: "",
                    },
                    types: {
                        firstForm: "",
                        secondForm: "",
                        thirdForm: "",
                    },
                    id: {
                      firstForm: "",
                      secondForm: "",
                      thirdForm: "",
                  }
                };

                const evolutionChainUrl = response.data.evolution_chain.url;
                try {
                    const res = await axios.get(evolutionChainUrl);
                    const firstStage = res.data?.chain?.species?.name;
                    const secondStage = res.data?.chain?.evolves_to?.[0]?.species?.name;
                    const lastStage = res.data?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name;

                    evolutionStagesData.name.firstForm = firstStage || '';
                    evolutionStagesData.name.secondForm = secondStage || '';
                    evolutionStagesData.name.thirdForm = lastStage || '';

                    const fetchEvolutionStages = async () => {
                        try {
                            const requests = [];
                            const otherRequest = [];

                            if (firstStage) requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${firstStage}`));
                            if (secondStage) requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${secondStage}`));
                            if (lastStage) requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${lastStage}`));


                            const responses = await Promise.all(requests);

                            if (responses[0]) {
                                evolutionStagesData.images.firstForm = responses[0]?.data?.sprites?.other["official-artwork"]?.front_default || '';
                                evolutionStagesData.types.firstForm = responses[0]?.data?.types;
                                evolutionStagesData.id.firstForm = responses[0]?.data?.id;
                            }
                            if (responses[1]) {
                                evolutionStagesData.images.secondForm = responses[1]?.data?.sprites?.other["official-artwork"]?.front_default || '';
                                evolutionStagesData.types.secondForm = responses[1]?.data?.types;
                                evolutionStagesData.id.secondForm = responses[1]?.data?.id;
                            }
                            if (responses[2]) {
                                evolutionStagesData.images.thirdForm = responses[2]?.data?.sprites?.other["official-artwork"]?.front_default || '';
                                evolutionStagesData.types.thirdForm = responses[2]?.data?.types;
                                evolutionStagesData.id.thirdForm = responses[2]?.data?.id;
                            }

                            // console.log(evolutionStagesData.id)
                            setEvolutionStage(evolutionStagesData);
                        } catch (error) {
                            console.error("Error fetching Pokémon images:", error);
                        }
                    };

                    // console.log(res.data.chain.species.url)
                    await fetchEvolutionStages();
                    // console.log(evolutionChainUrl)
                } catch (error) {
                    console.error("Error fetching evolution chain:", error);
                }
            };

            await getPokemonEvolutionStages();
            
            setPokemonAddInfo(getPokemonData())
        } catch (error) {
            console.error("Error fetching Pokémon species:", error);
        

          }
    };

    getPokemonSpecies();
};


// console.log(pokemonAddInfo)


  const backToPaginationPg = () => {
    setSwitchPage("Pagination");
  };

  // console.log("hello", evolutionStage);

  if (switchPage === "Pagination") {
    content = (
      <Pagination
        prevBtn={prevPokemon}
        nextBtn={nextPokemon}
        searchPokemon={searchPokemon}
        handleSearch={handlePokemonInput}
        searchedPokemon={handleSearchedPokemon}
        currentPokemon={currentPokemon}
        handlePokemonPreview={handlePokemonPreview}
      />
    );
  } else if (switchPage === "PokemonPreview") {
    content = (
      <PokemonPreview
        pokemonData={previewPokemon}
        closePage={backToPaginationPg}
        evolutionStage={evolutionStage}
        pokemonAddInfo={pokemonAddInfo}
      />
    );
  }

  return <>{content}</>;
}

export default App;
