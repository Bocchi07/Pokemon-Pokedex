import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MegaEvolutionList() {
  const [megaPokemon, setMegaPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMegaEvolutions = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0');
        const speciesList = response.data.results;

        const megaEvolutionData = await Promise.all(
          speciesList.map(async (species) => {
            const speciesData = await axios.get(species.url);

            if (speciesData.data.varieties.length > 1) {
              const megaForms = speciesData.data.varieties.filter((variety) =>
                variety.pokemon.name.includes('gmax')
              );

              if (megaForms.length > 0) {
                return {
                  // name: speciesData.data.name,
                  megaForms: megaForms.map((form) => form.pokemon),
                };
              }
            }
            return null;
          })
        );

        const filteredMegaEvolutions = megaEvolutionData.filter((item) => item !== null);
        setMegaPokemon(filteredMegaEvolutions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchMegaEvolutions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20">
      <h1>Pokémon with Mega Evolutions</h1>
      <ul>
        {megaPokemon.map((pokemon) => (
          <li key={pokemon.name}>
            <h2>{pokemon.name}</h2>
            <ul>
              {pokemon.megaForms.map((form) => (
                <li key={form.name}>{form.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MegaEvolutionList;
