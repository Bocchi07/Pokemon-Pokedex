import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./assets/components/Pagination";
import axios from "axios";
import PokemonPreview from "./assets/components/PokemonPreview.jsx";
import LoadingImg from "./assets/Images/loading-images.gif"

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
  const [nextPokemonPreview, setNextPokemonPreview] = useState();
  const [prevPokemonPreview, setPrevPokemonPreview] = useState();
  
  let content;
  let pokemonName;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const addFadeOut = () => {
    let messageElem = document.querySelector(".loading-message-container");
    
    if (messageElem){
       if(!loading){
      messageElem.classList.add("fade-out");
    } else{
      messageElem.classList.remove("fade-out");
    }
    }
  }

  useEffect(() => {
    setLoading(true)

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
          addFadeOut()
        }
      }

    return () => {
      pokemonList()
      setLoading(false)
      addFadeOut()
    }
  }, [page]);


  const prevPokemon = () => {
    setPage((p) => (p > 1 ? p - 1 : 1));
    scrollToTop()
  };
  const nextPokemon = () => {
    setPage((p) => p + 1);
    scrollToTop()
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
          sprites: sprites.other["official-artwork"].front_default,
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


  const handleEvolutionStagesPreview = async (data) => {
    setLoading(true)

    setSwitchPage("PokemonPreview");
    scrollToTop();
    pokemonName = data;
    getPokemonSpecies();

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${data}`
      );

      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } =
          response.data;

        let sliceName = () => {
          const firstLetterOfName = name[0].toUpperCase();
          const restOfTheName = name.slice(1);

          
      
          return firstLetterOfName + restOfTheName;
        };

        let pokemonFixID;
        let prevId = id >= 1 ? id - 1 : 1;
        let nextId = id + 1;

        handlePrevPokemon(prevId);
        handleNextPokemon(nextId);

        console.log(prevId, nextId)

        switch (id.toString().length) {
          case 1:
            pokemonFixID = `#000${id}`;
            break;
          case 2:
            pokemonFixID = `#00${id}`;
            break;
          case 3:
            pokemonFixID = `#0${id}`;
            break;
          case 4:
            pokemonFixID = `#0${id}`;
            break;
        }

        return {
          id: pokemonFixID,
          name: sliceName(),
          sprites: sprites.other["official-artwork"].front_default,
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
      
      setPreviewPokemon(getPokemonData);
 
    } catch (error) {
      console.error(error);
    }
    // console.log(previewPokemon)
    setTimeout(() => {
        setLoading(false)
        addFadeOut()
    }, 500)
  
  }

  const handlePokemonPreview = (pokemonData, pokemonPrevId, pokemonNextId) => {
    setLoading(true)
    setSwitchPage("PokemonPreview");
    scrollToTop();
    setPreviewPokemon(pokemonData);
    pokemonName = pokemonData.name.toLowerCase();
    getPokemonSpecies();


    handlePrevPokemon(pokemonPrevId)
    handleNextPokemon(pokemonNextId)
    setLoading(false)
    // console.log(id)
};

  const handlePrevPokemon = async (pokemonPrevId) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonPrevId}`
      );

      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } =
          response.data;

        return {
          id,
          name,
          sprites: sprites.other["official-artwork"].front_default,
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
      setPrevPokemonPreview(getPokemonData());
       console.log(getPokemonData().name);
    } catch (error) {
      console.error(error);
    }
  }

  const handleNextPokemon = async (pokemonNextId) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNextId}`
      );

      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } =
          response.data;

        return {
          id,
          name,
          sprites: sprites.other["official-artwork"].front_default,
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
      setNextPokemonPreview(getPokemonData());
      //  console.log(getPokemonData().name);
    } catch (error) {
      console.error(error);
    }
  }


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
                console.log(evolutionStagesData)
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


// console.log(previewPokemon)


  const backToPaginationPg = () => {
    setSwitchPage("Pagination");
  };

  const loadingPage = <div className="loading-message-container flex flex-col items-center justify-center h-[90vh]"> 
                          <img src={LoadingImg} alt="" className="w-[20%] mb-4"/>
                          <h5 className="text-xl font-bold loading-message">Loading <span>...</span></h5>
                      </div>
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
        loading = {loading}
        pokemonData={previewPokemon}
        closePage={backToPaginationPg}
        evolutionStage={evolutionStage}
        pokemonAddInfo={pokemonAddInfo}
        handleEvolutionStagesPreview={handleEvolutionStagesPreview}
        previewPokemon={previewPokemon}
        prevPokemon={prevPokemonPreview}
        nextPokemon = {nextPokemonPreview}
      />
    );
  }
  

  return <>{loading ? loadingPage : content}</>
}

export default App;
