import { useState, useEffect } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const [pokemonMetaData, setPokemonMetaData] = useState({});
  const imagesrc = "https://img.pokemondb.net/sprites/home/normal/"; // to fetch pokemon image
  const searchPokemonMetaData = async () => {
    //to fetch more individual pokemon information
    const response = await fetch(`${pokemon.url}`);
    const data = await response.json();
    setPokemonMetaData(data);
    console.log(pokemonMetaData);
  };

  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const pokemonCardTypeClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType;
  const pokemonCardStatsTypeClassName = (pokemonType) =>
    "pokemon_card_stats_type_" + pokemonType;
  const pokemonCardTypeIconClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType + "-icon";

  useEffect(() => {
    searchPokemonMetaData();
  }, []);

  return (
    <div
      className={`pokemon_card ${pokemonCardTypeClassName(
        pokemonMetaData.types[0].type.name
      )}`}
    >
      {pokemonMetaData.name ? (
        <>
          <div className="pokemon_card_image-container">
            <img
              src={`${imagesrc}${pokemonMetaData.name}.png`}
              alt={pokemonMetaData.name}
              className="pokemon_card_image"
            />
          </div>
          <div
            className={`pokemon_card_stats-container ${pokemonCardStatsTypeClassName(
              pokemonMetaData.types[0].type.name
            )}`}
          >
            <div className="pokemon_card_stats-top">
              <div className="pokemon_card_name-secondary">
                #{formatPokemonIdToFourDigits(pokemonMetaData.id)}
              </div>
              <h2 className="pokemon_card_name-primary">
                {capitalize(pokemonMetaData.name)}
              </h2>
            </div>
            <div className="pokemon_card_stats-bottom">
              <div className="pokemon_card_height">
                <div className="pokemon_card_text-primary">Height</div>
                <div className="pokemon_card_text-secondary">
                  {pokemonMetaData.height} <span>METER</span>
                </div>
              </div>
              <div className="pokemon_card_weight">
                <div className="pokemon_card_text-primary">Weight</div>
                <div className="pokemon_card_text-secondary">
                  {pokemonMetaData.weight} <span>K.G.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pokemon_card_type-container">
            {pokemonMetaData.types.length > 1 ? (
              <>
                <div
                  className={pokemonCardTypeIconClassName(
                    pokemonMetaData.types[0].type.name
                  )}
                >
                  {pokemonMetaData.types[0].type.name}
                </div>
                <div
                  className={pokemonCardTypeIconClassName(
                    pokemonMetaData.types[1].type.name
                  )}
                >
                  {pokemonMetaData.types[1].type.name}
                </div>
              </>
            ) : (
              <div
                className={pokemonCardTypeIconClassName(
                  pokemonMetaData.types[0].type.name
                )}
              >
                {pokemonMetaData.types[0].type.name}
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonCard;
