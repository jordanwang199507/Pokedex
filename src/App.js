import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
const pokemon1 = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const searchPokemons = async () => {
    const response = await fetch(`${API_URL_INITIAL}`);
    const data = await response.json();
    console.log(data);
    setPokemons(data.results);
  };

  useEffect(() => {
    searchPokemons();
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      {pokemons.length > 0 ? (
        <div className="container">
          {pokemons.map((pokemon) => (
            <PokemonCard key="card" pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Pokemons found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
