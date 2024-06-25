import { useState, useEffect } from "react";
// import "./PokemonCard.css";
import "./style.css";
import { ReactComponent as PokeBallUnder } from "./assets/Pokeball_under.svg";
import bugIcon from "./type-icons/bug.png";
import darkIcon from "./type-icons/dark.png";
import dargonIcon from "./type-icons/dragon.png";
import electricIcon from "./type-icons/electric.png";
import fairyIcon from "./type-icons/fairy.png";
import fightingIcon from "./type-icons/fighting.png";
import fireIcon from "./type-icons/fire.png";
import flyingIcon from "./type-icons/flying.png";
import ghostIcon from "./type-icons/ghost.png";
import grassIcon from "./type-icons/grass.png";
import groundIcon from "./type-icons/ground.png";
import iceIcon from "./type-icons/ice.png";
import normalIcon from "./type-icons/normal.png";
import poisonIcon from "./type-icons/poison.png";
import psychicIcon from "./type-icons/psychic.png";
import rockIcon from "./type-icons/rock.png";
import steelIcon from "./type-icons/steel.png";
import waterIcon from "./type-icons/water.png";

const PokemonCard = ({ index, viewDetailAnalog }) => {
  const [pokemonMetaData, setPokemonMetaData] = useState({});
  const [pokemonSpecieData, setPokemonSpecieData] = useState({});
  const [previousPokemonMetaData, setPreviousPokemonMetaData] = useState({});
  const [previousPokemonSpecieData, setPreviousPokemonSpecieData] = useState(
    {}
  );
  const [nextPokemonMetaData, setNextPokemonMetaData] = useState({});
  const [nextPokemonSpecieData, setNextPokemonSpecieData] = useState({});

  const imagesrc = "https://www.serebii.net/scarletviolet/pokemon/new/small/";
  const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/";
  const API_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";

  const fetchPokemonData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const searchPokemonMetaData = async () => {
    const urls = [
      fetchPokemonData(`${API_URL_INITIAL}${index}`),
      fetchPokemonData(`${API_URL_SPECIES}${index}`),
    ];

    if (index > 1) {
      urls.push(fetchPokemonData(`${API_URL_INITIAL}${index - 1}`));
      urls.push(fetchPokemonData(`${API_URL_SPECIES}${index - 1}`));
    } else {
      urls.push(null, null); // Push null for previous data when index is 1
    }

    urls.push(fetchPokemonData(`${API_URL_INITIAL}${index + 1}`));
    urls.push(fetchPokemonData(`${API_URL_SPECIES}${index + 1}`));

    const [
      data,
      specieData,
      prevData,
      prevSpecieData,
      nextData,
      nextSpecieData,
    ] = await Promise.all(urls);

    if (data && specieData && nextData && nextSpecieData) {
      setPokemonMetaData(data);
      setPokemonSpecieData(specieData);
      setNextPokemonMetaData(nextData);
      setNextPokemonSpecieData(nextSpecieData);

      if (prevData && prevSpecieData) {
        setPreviousPokemonMetaData(prevData);
        setPreviousPokemonSpecieData(prevSpecieData);
      } else {
        setPreviousPokemonMetaData({});
        setPreviousPokemonSpecieData({});
      }
    }
  };

  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const typeIcons = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dargonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    water: waterIcon,
  };

  const pokemonCardFormatIDforImage = (pokemonId) =>
    pokemonId < 999
      ? pokemonId.toString().padStart(3, "0")
      : pokemonId.toString();

  const pokemonCardBorderTypeClassName = (pokemonType) =>
    `pokemon_card_border_type_${pokemonType}`;
  const pokemonCardPokeBallTypeClassName = (pokemonType) =>
    `pokemon_card_pokeball_type_${pokemonType}`;
  const pokemonCardStatsTypeClassName = (pokemonType) =>
    `pokemon_card_stats_type_${pokemonType}`;
  const pokemonCardStatsTopLeftBorder = (pokemonType) =>
    `pokemon_card_stats-top_${pokemonType}`;
  const pokemonCardTypeIconClassName = (pokemonType) =>
    `pokemon_card_type_${pokemonType}-icon`;
  const pokemonCardTypeIconPng = (pokemonType) => typeIcons[pokemonType];

  const showPokemonDetailAnalog = (
    viewPokemonCards,
    pokemonId,
    pokemonMetaData1,
    pokemonSpecieData,
    previousPokemonId,
    previousPokemonMetaData1,
    previousPokemonSpecieData,
    nextPokemonId,
    nextPokemonMetaData1,
    nextPokemonSpecieData
  ) => {
    viewDetailAnalog(
      viewPokemonCards,
      pokemonId,
      pokemonMetaData1,
      pokemonSpecieData,
      previousPokemonId,
      previousPokemonMetaData1,
      previousPokemonSpecieData,
      nextPokemonId,
      nextPokemonMetaData1,
      nextPokemonSpecieData
    );
  };

  useEffect(() => {
    searchPokemonMetaData();
  }, [index]);

  return (
    <>
      {pokemonMetaData.name ? (
        <button
          className={`pokemon_card_border ${pokemonCardBorderTypeClassName(
            pokemonMetaData.types[0].type.name
          )}`}
          onClick={() => {
            showPokemonDetailAnalog(
              false,
              pokemonMetaData.id,
              pokemonMetaData,
              pokemonSpecieData,
              previousPokemonMetaData.id,
              previousPokemonMetaData,
              previousPokemonSpecieData,
              nextPokemonMetaData.id,
              nextPokemonMetaData,
              nextPokemonSpecieData
            );
          }}
        >
          <div className="pokemon_card">
            <div className="pokemon_card_image-section">
              <div className="pokemon_card_image-container">
                <img
                  src={`${imagesrc}${pokemonCardFormatIDforImage(
                    pokemonMetaData.id
                  )}.png`}
                  alt={pokemonMetaData.name}
                  className="pokemon_card_image"
                />
              </div>
              <div className="pokemon_card_pokeball-background">
                <PokeBallUnder
                  className={`${pokemonCardPokeBallTypeClassName(
                    pokemonMetaData.types[0].type.name
                  )}`}
                />
              </div>
            </div>
            <div
              className={`pokemon_card_stats-container ${pokemonCardStatsTypeClassName(
                pokemonMetaData.types[0].type.name
              )}`}
            >
              <div
                className={`pokemon_card_stats-top ${pokemonCardStatsTopLeftBorder(
                  pokemonMetaData.types[0].type.name
                )}`}
              >
                <div className="pokemon_card_name-secondary">
                  N°{formatPokemonIdToFourDigits(pokemonMetaData.id)}
                </div>
                <h2 className="pokemon_card_name-primary">
                  {capitalize(pokemonMetaData.name)}
                </h2>
              </div>
            </div>
            <div className="pokemon_card_type-container">
              {pokemonMetaData.types.map((type) => (
                <div
                  key={type.type.name}
                  className={`pokemon_card_type-icon ${pokemonCardTypeIconClassName(
                    type.type.name
                  )}`}
                >
                  <div className="pokemon_card_icon_image">
                    <img
                      src={pokemonCardTypeIconPng(type.type.name)}
                      alt={type.type.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PokemonCard;
