import { useState, useEffect } from "react";
import "./PokemonCard.css";
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

  const formatPokemonHeightWeight = (number) => number / 10;

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

  const pokemonCardBorderTypeClassName = (pokemonType) =>
    "pokemon_card_border_type_" + pokemonType;
  const pokemonCardTypeClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType;
  const pokemonCardStatsTypeClassName = (pokemonType) =>
    "pokemon_card_stats_type_" + pokemonType;
  const pokemonCardStatsTopLeftBorder = (pokemonType) =>
    "pokemon_card_stats-top_" + pokemonType;
  const pokemonCardTypeIconClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType + "-icon";
  const pokemonCardTypeIconPng = (pokemonType) => typeIcons[pokemonType];

  useEffect(() => {
    searchPokemonMetaData();
  }, []);

  return (
    <>
      {pokemonMetaData.name ? (
        <div
          className={`pokemon_card_border ${pokemonCardBorderTypeClassName(
            pokemonMetaData.types[0].type.name
          )}`}
        >
          <div
            className={`pokemon_card ${pokemonCardTypeClassName(
              pokemonMetaData.types[0].type.name
            )}`}
          >
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
              <div
                className={`pokemon_card_stats-top ${pokemonCardStatsTopLeftBorder(
                  pokemonMetaData.types[0].type.name
                )}`}
              >
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
                    {formatPokemonHeightWeight(pokemonMetaData.height)}{" "}
                    <span>METER</span>
                  </div>
                </div>
                <div className="pokemon_card_weight">
                  <div className="pokemon_card_text-primary">Weight</div>
                  <div className="pokemon_card_text-secondary">
                    {formatPokemonHeightWeight(pokemonMetaData.weight)}{" "}
                    <span>K.G.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pokemon_card_type-container">
              {pokemonMetaData.types.length > 1 ? (
                <>
                  <div
                    className={`pokemon_card_type ${pokemonCardTypeIconClassName(
                      pokemonMetaData.types[0].type.name
                    )}`}
                  >
                    <div className="pokemon_card_icon_image">
                      <img
                        src={pokemonCardTypeIconPng(
                          pokemonMetaData.types[0].type.name
                        )}
                        alt={pokemonMetaData.types[0].type.name}
                      />
                    </div>
                    <div className="pokemon_card-type_name">
                      {pokemonMetaData.types[0].type.name}
                    </div>
                  </div>
                  <div
                    className={`pokemon_card_type ${pokemonCardTypeIconClassName(
                      pokemonMetaData.types[1].type.name
                    )}`}
                  >
                    <div className="pokemon_card_icon_image">
                      <img
                        src={pokemonCardTypeIconPng(
                          pokemonMetaData.types[1].type.name
                        )}
                        alt={pokemonMetaData.types[1].type.name}
                      />
                    </div>

                    <div className="pokemon_card-type_name">
                      {pokemonMetaData.types[1].type.name}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`pokemon_card_type ${pokemonCardTypeIconClassName(
                    pokemonMetaData.types[0].type.name
                  )}`}
                >
                  <div className="pokemon_card_icon_image">
                    <img
                      src={pokemonCardTypeIconPng(
                        pokemonMetaData.types[0].type.name
                      )}
                      alt={pokemonMetaData.types[0].type.name}
                    />
                  </div>

                  <div className="pokemon_card-type_name">
                    {pokemonMetaData.types[0].type.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PokemonCard;