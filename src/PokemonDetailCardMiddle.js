import { useState, useEffect } from "react";
import PokemonDetailCardMiddle_BaseStat from "./PokemonDetailCardMiddle_BaseStat";
import PokemonDetailCardMiddle_DamageContainer from "./PokemonDetailCardMiddle_DamageContainer";

import "./PokemonDetailCardMiddle.css";

const PokemonDetailCardMiddle = ({
  pokemonId,
  pokemonMeta1,
  pokemonSpecieData,
  pokemonTypeData,
}) => {
  const pokemonBaseStats = Object.values(pokemonMeta1.stats);
  const adjustSpecialStatName = (name) => {
    if (name.includes("special")) {
      return name === "special-attack" ? "sp.atk" : "sp.def";
    } else {
      return name;
    }
  };
  const calculateStatTotal = () => {
    const total = pokemonBaseStats.reduce((acc, stat) => {
      return acc + stat.base_stat;
    }, 0);
    return total;
  };
  const baseStatColor = (statName) => statColor[statName];
  const statColor = {
    hp: "red",
    attack: "orange",
    defense: "yellow",
    "special-attack": "green",
    "special-defense": "blue",
    speed: "purple",
  };

  const damageValueToNameOrCSSName = (damageValue, nameOrCss) => {
    return nameOrCss === "name"
      ? typeEffect[damageValue][0]
      : typeEffect[damageValue][1];
  };
  const typeEffect = {
    0: ["No effect", "no-effect"],
    0.25: ["Very not effective", "very-not"],
    0.5: ["Not effective", "not-effective"],
    1: ["Neutral effect", "neutral"],
    2: ["Effective", "effective"],
    4: ["Super effective", "super-effective"],
  };
  const damageFromStat = {
    bug: 1,
    dark: 1,
    dragon: 1,
    electric: 1,
    fairy: 1,
    fighting: 1,
    fire: 1,
    flying: 1,
    ghost: 1,
    grass: 1,
    ground: 1,
    ice: 1,
    normal: 1,
    poison: 1,
    psychic: 1,
    rock: 1,
    steel: 1,
    water: 1,
  };
  const damageToStat = {
    bug: 1,
    dark: 1,
    dragon: 1,
    electric: 1,
    fairy: 1,
    fighting: 1,
    fire: 1,
    flying: 1,
    ghost: 1,
    grass: 1,
    ground: 1,
    ice: 1,
    normal: 1,
    poison: 1,
    psychic: 1,
    rock: 1,
    steel: 1,
    water: 1,
  };
  const sortOrder = [0, 0.25, 0.5, 1, 2, 4];
  const [damageFrom, setDamageFrom] = useState({});
  const [damageTo, setDamageTo] = useState({});

  const calculateDamageFromAndTo = () => {
    if (pokemonTypeData[pokemonMeta1.types[0].type.name]) {
      const typesCount = pokemonMeta1.types.length;

      for (let i = 0; i < typesCount; i++) {
        const typeName = pokemonMeta1.types[i].type.name;

        const doubleDamageFrom =
          pokemonTypeData[typeName].damage_relations.double_damage_from;
        const halfDamageFrom =
          pokemonTypeData[typeName].damage_relations.half_damage_from;
        const noDamageFrom =
          pokemonTypeData[typeName].damage_relations.no_damage_from;

        const doubleDamageTo =
          pokemonTypeData[typeName].damage_relations.double_damage_to;
        const halfDamageTo =
          pokemonTypeData[typeName].damage_relations.half_damage_to;
        const noDamageTo =
          pokemonTypeData[typeName].damage_relations.no_damage_to;

        doubleDamageFrom.forEach((type) => {
          damageFromStat[type.name] *= 2;
        });

        halfDamageFrom.forEach((type) => {
          damageFromStat[type.name] *= 0.5;
        });

        noDamageFrom.forEach((type) => {
          damageFromStat[type.name] = 0;
        });

        doubleDamageTo.forEach((type) => {
          damageToStat[type.name] *= 2;
        });

        halfDamageTo.forEach((type) => {
          damageToStat[type.name] *= 0.5;
        });

        noDamageTo.forEach((type) => {
          damageToStat[type.name] = 0;
        });
      }
    }
    const groupedByValue = (damageStat) => {
      const grouped = Object.entries(damageStat).reduce((acc, [key, value]) => {
        if (!acc[value]) {
          acc[value] = [];
        }
        acc[value].push(key);
        return acc;
      }, {});

      // Sort the grouped object by the specified order
      const sorted = {};
      sortOrder.forEach((key) => {
        sorted[key] = grouped[key] || ["no"];
      });
      return sorted;
    };

    setDamageFrom(groupedByValue(damageFromStat));
    setDamageTo(groupedByValue(damageToStat));
  };

  useEffect(() => {
    calculateDamageFromAndTo();
  }, [pokemonTypeData, pokemonMeta1]);

  //   console.log(damageFrom); // Verify the updated damageFrom object
  //   console.log(damageTo); // Verify the updated damageTo object
  return (
    <div className="pokemonDetailCardMiddle">
      <div className="pokemonDetailCardMiddle_baseState-container">
        <h2 className="pokemonDetailCardMiddle_baseState_title">Base Stat</h2>
        {pokemonBaseStats.map((stat, index) => (
          <PokemonDetailCardMiddle_BaseStat
            key={index}
            name={adjustSpecialStatName(stat.stat.name)}
            statValue={stat.base_stat}
            color={baseStatColor(stat.stat.name)}
          />
        ))}
        <div className="pokemonDetailCard_base-stat base-stat-total">
          <h4 className="pokemonDetailCard_base-name">Total</h4>
          <div className="pokemonDetailCard_base-value base-value-total">
            {calculateStatTotal()}
          </div>
          <div className="pokemonDetailCard_base-graph">
            <div className="pokemonDetailCard_base-bar base-bar-total"></div>
          </div>
        </div>
      </div>

      <div className="pokemonDetailCardMiddle_damage-container">
        <div className="pokemonDetailCardMiddle_damageFromOrTo-container">
          <h2 className="pokemonDetailCardMiddle_damage-primary-title">
            Damage From <span>(Defense)</span>
          </h2>
          <div className="pokemonDetailCardMiddle_allDamage-container">
            {sortOrder
              .filter((value) => damageFrom[value])
              .map((value) => (
                <PokemonDetailCardMiddle_DamageContainer
                  key={value}
                  name={damageValueToNameOrCSSName(value, "name")}
                  css={damageValueToNameOrCSSName(value, "css")}
                  types={damageFrom[value]}
                />
              ))}
          </div>
        </div>
        <div className="pokemonDetailCardMiddle_damageFromOrTo-container">
          <h2 className="pokemonDetailCardMiddle_damage-primary-title">
            Damage To <span>(Attack)</span>
          </h2>
          <div className="pokemonDetailCardMiddle_allDamage-container">
            {sortOrder
              .filter((value) => damageTo[value])
              .map((value) => (
                <PokemonDetailCardMiddle_DamageContainer
                  key={value}
                  name={damageValueToNameOrCSSName(value, "name")}
                  css={damageValueToNameOrCSSName(value, "css")}
                  types={damageTo[value]}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailCardMiddle;
