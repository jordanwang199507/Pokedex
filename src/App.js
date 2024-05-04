import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";
const pokemon1 = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);
  const searchPokemons = async () => {
    console.log(`${API_URL_INITIAL}${pageCounter}`);
    const response = await fetch(`${API_URL_INITIAL}${pageCounter}`);
    const data = await response.json();
    setPokemons(data.results);
  };

  useEffect(() => {
    searchPokemons();
  }, [pageCounter]);

  return (
    <div className="App">
      <div className="container">
        <h1>Pokedex</h1>
        {pokemons.length > 0 ? (
          <div className="pokedex_container">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Pokemons found</h2>
          </div>
        )}
      </div>
      <button
        className=""
        onClick={() => setPageCounter((prevCount) => prevCount + 20)}
      >
        +
      </button>
    </div>
  );
};
export default App;
