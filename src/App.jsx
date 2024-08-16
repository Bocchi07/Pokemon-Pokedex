import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./components/Pagination.jsx";
import axios from "axios";
import PokemonPreview from "./components/PokemonPreview.jsx";
import LoadingImg from "./assets/Images/loading-images.gif";
import Header from "./components/Header.jsx";
import FilteringSection from "./components/FilteringSection.jsx"

function App() {
  const [page, setPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemonSearchUrl, setPokemonSearchUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewPokemon, setPreviewPokemon] = useState();
  const [switchPage, setSwitchPage] = useState("Pagination");
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [evolutionStage, setEvolutionStage] = useState();
  const [pokemonAddInfo, setPokemonAddInfo] = useState();
  const [nextPokemonPreview, setNextPokemonPreview] = useState();
  const [prevPokemonPreview, setPrevPokemonPreview] = useState();

  let pokemonName;

  console.log(page)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addFadeOut = () => {
    let messageElem = document.querySelector(".loading-message-container");
    if (messageElem) {
      if (!loading) {
        messageElem.classList.add("fade-out");
      } else {
        messageElem.classList.remove("fade-out");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const pokemonList = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * 20;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`
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
            name: name[0] + name.slice(1),
            types: types.map((info) => info.type.name),
            sprites: sprites.other["official-artwork"].front_default,
            height,
            weight,
            stats: stats.map((s) => ({
              statNum: s.base_stat,
              statName: s.stat.name,
            })),
            abilities: abilities.map((a) => a.ability.name),
          };
        });

        setCurrentPokemon(detailedPokemon);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        addFadeOut();
      }
    };

    return () => {
      pokemonList();
      setLoading(false);
      addFadeOut();
    };
  }, [page]);

  const prevPokemon = () => {
    setPage((p) => (p > 1 ? p - 1 : 1));
    scrollToTop();
  };

  const nextPokemon = () => {
    setPage((p) => p + 1);
    scrollToTop();
  };

  const handlePokemonInput = (e) => {
    setSearchPokemon(e.target.value);
  };

  const [searchError, setSearchError] = useState("");

  const handleSearchedPokemon = async (e) => {

    try {
      setLoading(true);
      setSearchError(""); // Clear any previous error messages
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
      );
  
      if (response.status === 200) {
        const getPokemonData = () => {
          const { id, name, sprites, stats, height, weight, types, abilities } = response.data;
  
          let sliceName = () => {
            const firstLetterOfName = name[0].toUpperCase();
            const restOfTheName = name.slice(1);
            return firstLetterOfName + restOfTheName;
          };
  
          let pokemonFixID;
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
            default:
              pokemonFixID = `#${id}`;
              break;
          }
  
          return {
            id: pokemonFixID,
            name: sliceName(),
            sprites: sprites.other["official-artwork"].front_default,
            types: types.map((t) => t.type.name),
            height,
            weight,
            stats: stats.map((s) => ({
              statNum: s.base_stat,
              statName: s.stat.name,
            })),
            abilities: abilities.map((a) => a.ability.name),
          };
        };
  
        const pokemonData = getPokemonData();
        setPreviewPokemon(pokemonData);
        setSearchPokemon("");
        setSwitchPage("PokemonPreview");
  
        // Fetch and handle evolution stages
        await getPokemonSpecies();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchError("Can't find Pokémon. Please try another name.");
      } else {
        setSearchError("An error occurred while searching for Pokémon.");
      }
    } finally {
      setLoading(false);
      addFadeOut();
    }
  };
  


  const handleEvolutionStagesPreview = async (data) => {
    setLoading(true);
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
          default:
            pokemonFixID = `#${id}`;
        }

        return {
          id: pokemonFixID,
          name: sliceName(),
          sprites: sprites.other["official-artwork"].front_default,
          types: types.map((t) => t.type.name),
          height,
          weight,
          stats: stats.map((s) => ({
            statNum: s.base_stat,
            statName: s.stat.name,
          })),
          abilities: abilities.map((a) => a.ability.name),
        };
      };

      setPreviewPokemon(getPokemonData);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        addFadeOut();
      }, 500);
    }
  };

  const handlePokemonPreview = async (pokemonData, pokemonPrevId, pokemonNextId) => {
    setLoading(true);
    setSwitchPage("PokemonPreview");
    scrollToTop();
    setPreviewPokemon(pokemonData);
    pokemonName = pokemonData.name.toLowerCase();
    await getPokemonSpecies();
  
    // Fetch previous and next Pokémon details
    if (pokemonPrevId > 0) {
      await handlePrevPokemon(pokemonPrevId);
    }
    await handleNextPokemon(pokemonNextId);
  
    setLoading(false);
  };

  const handlePrevPokemon = async (pokemonPrevId) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonPrevId}`);
      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } = response.data;
        return {
          id,
          name,
          sprites: sprites.other["official-artwork"].front_default,
          types: types.map((t) => t.type.name),
          height,
          weight,
          stats: stats.map((s) => ({
            statNum: s.base_stat,
            statName: s.stat.name,
          })),
          abilities: abilities.map((a) => a.ability.name),
        };
      };
      setPrevPokemonPreview(getPokemonData());
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPokemon = async (pokemonNextId) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNextId}`);
      const getPokemonData = () => {
        const { id, name, sprites, stats, height, weight, types, abilities } = response.data;
        return {
          id,
          name,
          sprites: sprites.other["official-artwork"].front_default,
          types: types.map((t) => t.type.name),
          height,
          weight,
          stats: stats.map((s) => ({
            statNum: s.base_stat,
            statName: s.stat.name,
          })),
          abilities: abilities.map((a) => a.ability.name),
        };
      };
      setNextPokemonPreview(getPokemonData());
    } catch (error) {
      console.error(error);
    }
  };

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
          flavor_text_entries: flavor_text_entries[6] || {},
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

              setEvolutionStage(evolutionStagesData);
            } catch (error) {
              console.error("Error fetching Pokémon images:", error);
            }
          };

          await fetchEvolutionStages();
        } catch (error) {
          console.error("Error fetching evolution chain:", error);
        }
      };

      await getPokemonEvolutionStages();
      setPokemonAddInfo(getPokemonData());
    } catch (error) {
      console.error("Error fetching Pokémon species:", error);
    }
  };

  const switchPrevPage = () => {
    if (prevPokemonPreview) {
      const prevId = prevPokemonPreview.id;
      const nextId = nextPokemonPreview ? nextPokemonPreview.id : prevId + 1;
      handlePokemonPreview(prevPokemonPreview, prevId - 1, nextId);
    }
  };

  const switchNextPage = () => {
    if (nextPokemonPreview) {
      const prevId = prevPokemonPreview ? prevPokemonPreview.id : null;
      const nextId = nextPokemonPreview.id + 1;
      handlePokemonPreview(nextPokemonPreview, prevId, nextId);
    }
  };

  const backToPaginationPg = () => {
    setSwitchPage("Pagination");
  };

  const loadingPage = (
    <div className="loading-message-container flex flex-col items-center justify-center h-[90vh]"> 
      <img src={LoadingImg} alt="" className="w-[20%] mb-4"/>
      <h5 className="text-xl font-bold loading-message">Loading <span>...</span></h5>
    </div>
  );

  let content;

  if (searchError) {
    content = (
      <div className="error-message-container flex flex-col items-center justify-center h-[90vh]">
        <h5 className="text-xl font-bold text-red-500">{searchError}</h5>
        <button onClick={() => setSearchError("")} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Try Again
        </button>
      </div>
    );
  } else if (switchPage === "Pagination") {
    content = (
      <div className="flex gap-x-4 ">
        <FilteringSection 
          searchPokemon={searchPokemon}
          handleSearch={handlePokemonInput}
          searchedPokemon={handleSearchedPokemon}
        />
        <Pagination
          prevBtn={prevPokemon}
          nextBtn={nextPokemon}
          searchPokemon={searchPokemon}
          handleSearch={handlePokemonInput}
          searchedPokemon={handleSearchedPokemon}
          currentPokemon={currentPokemon}
          handlePokemonPreview={handlePokemonPreview}
          page ={page}
        />
      </div>
    );
  } else if (switchPage === "PokemonPreview") {
    content = (
      <PokemonPreview
        loading={loading}
        pokemonData={previewPokemon}
        closePage={backToPaginationPg}
        evolutionStage={evolutionStage}
        pokemonAddInfo={pokemonAddInfo}
        handleEvolutionStagesPreview={handleEvolutionStagesPreview}
        previewPokemon={previewPokemon}
        prevPokemon={prevPokemonPreview}
        nextPokemon={nextPokemonPreview}
        switchPrevPage={switchPrevPage}
        switchNextPage={switchNextPage}
      />
    );
  }

  return(
  <>
    <Header /> 
    {loading ? loadingPage : content}
  </>)
}

export default App;
