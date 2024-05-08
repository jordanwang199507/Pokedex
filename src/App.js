import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";

const pokemon1 = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const App = () => {
  //   const [pokemons, setPokemons] = useState([]);
  //   const [pokemonPageCounter, setPokemonPageCounter] = useState(0);
  //   const pageArray = Array.from({ length: 100 }, (_, index) => index);

  //   const cardArray = Array.from({ length: 20 }, (_, index) => index);
  //   const pokedexIndexArray = Array.from({ length: 1025 }, (_, index) => index);

  //   const searchPokemons = async () => {
  //     const offset = pokemonPageCounter * 20;
  //     const response = await fetch(`${API_URL_INITIAL}${offset}`);
  //     const data = await response.json();
  //     setPokemons(data.results);
  //   };

  //   const updateToPreviousPage = () => {
  //     if (pokemonPageCounter > 0) {
  //       setPokemonPageCounter(pokemonPageCounter - 1);
  //     }
  //   };

  //   const updateToNextPage = () => {
  //     if (pokemonPageCounter < pageArray.length - 1) {
  //       setPokemonPageCounter(pokemonPageCounter + 1);
  //     }
  //   };

  //   const handlePageSelect = (event) => {
  //     setPokemonPageCounter(Number(event.target.value));
  //   };

  //   useEffect(() => {
  //     // searchPokemons();
  //   }, [pokemonPageCounter]);
  const [pokemonPageCounter, setPokemonPageCounter] = useState(0);
  const cardsPerPage = 20;
  const totalPages = Math.ceil(1025 / cardsPerPage); // Assuming you have 1025 Pokemon

  const handlePageSelect = (event) => {
    setPokemonPageCounter(Number(event.target.value));
  };

  const updateToPreviousPage = () => {
    setPokemonPageCounter((current) => Math.max(0, current - 1));
  };

  const updateToNextPage = () => {
    setPokemonPageCounter((current) => Math.min(totalPages - 1, current + 1));
  };

  // Calculate the indices to be shown based on the current page
  const startIndex = pokemonPageCounter * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  return (
    <div className="App">
      <div className="container">
        <h1>Pokedex</h1>
        <div className="pokedex_container">
          {Array.from({ length: cardsPerPage }, (_, index) => {
            const cardIndex = startIndex + index + 1; // +1 because Pokedex starts from 1
            return cardIndex <= 1025 ? ( // Ensure we do not exceed the total number of Pokemon
              <PokemonCard key={cardIndex} index={cardIndex} />
            ) : null;
          })}
        </div>
      </div>
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
  );
};
export default App;
