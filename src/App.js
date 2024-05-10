import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";
import SidebarGenBlock from "./SidebarGenBlock";

const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";

const pokemon1 = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const App = () => {
  const pokemonGenerations = [
    {
      generation: 1,
      start: 1,
      end: 151,
      total: 151,
      description: "Generation I: Kanto Region",
      name: "Generation I",
    },
    {
      generation: 2,
      start: 152,
      end: 251,
      total: 100,
      description: "Generation II: Johto Region",
      name: "Generation II",
    },
    {
      generation: 3,
      start: 252,
      end: 386,
      total: 135,
      description: "Generation III: Hoenn Region",
      name: "Generation III",
    },
    {
      generation: 4,
      start: 387,
      end: 493,
      total: 107,
      description: "Generation IV: Sinnoh Region",
      name: "Generation IV",
    },
    {
      generation: 5,
      start: 494,
      end: 649,
      total: 156,
      description: "Generation V: Unova Region",
      name: "Generation V",
    },
    {
      generation: 6,
      start: 650,
      end: 721,
      total: 72,
      description: "Generation VI: Kalos Region",
      name: "Generation VI",
    },
    {
      generation: 7,
      start: 722,
      end: 809,
      total: 88,
      description: "Generation VII: Alola Region",
      name: "Generation VII",
    },
    {
      generation: 8,
      start: 810,
      end: 905,
      total: 96,
      description: "Generation VIII: Galar Region",
      name: "Generation VIII",
    },
    {
      generation: 9,
      start: 906,
      end: 1025,
      total: 120,
      description: "Generation IX: Paldea Region",
      name: "Generation IX",
    },
  ];
  //   console.log(pokemonGenerations.gen1.description);
  const [pokemonPageCounter, setPokemonPageCounter] = useState(0);
  const [selectedPokemonGeneration, setSelectedPokemonGeneration] = useState(0);
  const cardsPerPage = 32;
  const totalPages = Math.ceil(
    pokemonGenerations[selectedPokemonGeneration].total / cardsPerPage
  ); // Assuming you have 1025 Pokemon

  const handlePageSelect = (event) => {
    setPokemonPageCounter(Number(event.target.value));
  };

  const handleSelectGeneration = (generation) => {
    setSelectedPokemonGeneration(generation);
    setPokemonPageCounter(0);
  };

  const updateToPreviousPage = () => {
    setPokemonPageCounter((current) => Math.max(0, current - 1));
  };

  const updateToNextPage = () => {
    setPokemonPageCounter((current) => Math.min(totalPages - 1, current + 1));
  };
  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  // Calculate the indices to be shown based on the current page
  const startIndex =
    pokemonPageCounter * cardsPerPage +
    pokemonGenerations[selectedPokemonGeneration].start;
  const endIndex = startIndex + cardsPerPage;

  return (
    <div className="App">
      <div className="sidebar">
        {pokemonGenerations.map((generation, index) => (
          <SidebarGenBlock
            key={index}
            generation={generation}
            onClick={() => handleSelectGeneration(index)}
          />
        ))}
      </div>
      <div className="container">
        <div className="pokedex_title_row">
          <div className="pokedex_title_container">
            <h1 className="pokedex_title">
              {pokemonGenerations[selectedPokemonGeneration].description}
            </h1>
            <div className="pokedex_title_id_container">
              <div className="pokedex_title_id-start">
                N°
                {formatPokemonIdToFourDigits(
                  pokemonGenerations[selectedPokemonGeneration].start
                )}
              </div>
              -
              <div className="pokedex_title_id-end">
                N°
                {formatPokemonIdToFourDigits(
                  pokemonGenerations[selectedPokemonGeneration].end
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pokedex_container">
          {Array.from({ length: cardsPerPage }, (_, index) => {
            const cardIndex = startIndex + index; // +1 because Pokedex starts from 1
            return cardIndex <=
              pokemonGenerations[selectedPokemonGeneration].end ? ( // Ensure we do not exceed the total number of Pokemon
              <PokemonCard key={cardIndex} index={cardIndex} />
            ) : null;
          })}
        </div>
        <div className="pagination_container">
          <button onClick={updateToPreviousPage}>-</button>
          <select value={pokemonPageCounter} onChange={handlePageSelect}>
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index} value={index}>
                Page {index + 1}
              </option>
            ))}
          </select>
          <button onClick={updateToNextPage}>+</button>
        </div>
      </div>
    </div>
  );
};
export default App;
