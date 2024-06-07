import { useState, useEffect } from "react";
import "./PokemonDetailCardMiddle_DamageContainer.css";
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

const PokemonDetailCardMiddle_DamageContainer = ({ name, css, types }) => {
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
  return (
    <>
      <div key={name} className="pokemonDetailCardMiddle_damage-innercontainer">
        <div
          className={`pokemonDetailCardMiddle_damage-title-container ${css}`}
        >
          <h4 className="pokemonDetailCardMiddle_damage-secondary-title">
            {name}
          </h4>
        </div>
        <div className="pokemonDetailCardMiddle_damage-types-container">
          {types.map((type) =>
            type === "no" ? (
              <></>
            ) : (
              <div
                className={`pokemon_card_type-icon ${pokemonCardTypeIconClassName(
                  type
                )}`}
              >
                <div className="pokemon_card_icon_image">
                  <img src={pokemonCardTypeIconPng(type)} alt={type} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default PokemonDetailCardMiddle_DamageContainer;
