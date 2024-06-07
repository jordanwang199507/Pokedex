import { useState, useEffect } from "react";
import "./SidebarPokemonBlock.css";
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

const SidebarPokemonBlock = ({ index, viewPokemonDetailAnalog }) => {
  const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/";
  const API_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
  const imagesrc = "https://www.serebii.net/scarletviolet/pokemon/new/small/";

  const [pokemonMetaData, setPokemonMetaData] = useState({});
  const [pokemonSpecieData, setPokemonSpecieData] = useState({});

  const searchPokemonMetaData = async () => {
    const response = await fetch(`${API_URL_INITIAL}${index}`);
    const data = await response.json();
    setPokemonMetaData(data);
  };

  const searchPokemonSpecieData = async () => {
    const response_specie = await fetch(`${API_URL_SPECIES}${index}`);
    const data = await response_specie.json();
    return data; // Return the fetched species data
  };

  const pokemonCardFormatIDforImage = (pokemonId) =>
    pokemonId < 999
      ? pokemonId.toString().padStart(3, "0")
      : pokemonId.toString();

  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  const pokemonCardTypeIconClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType + "-icon";

  const pokemonCardTypeIconPng = (pokemonType) => typeIcons[pokemonType];

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

  const showPokemonDetailAnalog = async () => {
    const specieData = await searchPokemonSpecieData(); // Fetch species data
    setPokemonSpecieData(specieData); // Set species data in state
    viewPokemonDetailAnalog(
      false,
      pokemonMetaData.id,
      pokemonMetaData,
      specieData
    ); // Update view only after species data is fetched
  };

  useEffect(() => {
    searchPokemonMetaData();
  }, []);

  return (
    <>
      {pokemonMetaData.name ? (
        <div
          className="sidebar_pokemon"
          onClick={() => {
            showPokemonDetailAnalog();
          }}
        >
          <div className="sidebar_pokemon_left-container">
            {pokemonMetaData.id && (
              <img
                src={`${imagesrc}${pokemonCardFormatIDforImage(
                  pokemonMetaData.id
                )}.png`}
                alt={pokemonMetaData.name || "Pokemon image"} // Provide a default alt if name is not available
                className="sidebar_pokemon_image"
              />
            )}
          </div>
          <div className="sidebar_pokemon_right-container">
            <div className="sidebar_pokemon_identity">
              <div className="sidebar_pokemon_index">
                N°{formatPokemonIdToFourDigits(pokemonMetaData.id)}
              </div>
              <div className="sidebar_pokemon_name">{pokemonMetaData.name}</div>
            </div>
            <div className="sidebar_pokemon_type">
              {pokemonMetaData.types.length > 1 ? (
                <>
                  <div
                    className={`pokemon_card_type-icon ${pokemonCardTypeIconClassName(
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
                  </div>
                  <div
                    className={`pokemon_card_type-icon ${pokemonCardTypeIconClassName(
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
                  </div>
                </>
              ) : (
                <div
                  className={`pokemon_card_type-icon ${pokemonCardTypeIconClassName(
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
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};
export default SidebarPokemonBlock;
