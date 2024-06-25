import { useState, useEffect } from "react";
import "./PokemonDetailCardMiddle_BaseStat.css";

const PokemonDetailCardMiddle_BaseStat = ({ name, statValue, color }) => {
  const assignBaseStatColor = (valueOrGraph) => {
    return valueOrGraph === "value"
      ? "base-value-" + color
      : "base-bar-" + color;
  };
  return (
    <>
      <div className="pokemonDetailCard_base-stat">
        <h4 className="pokemonDetailCard_base-name">{name}</h4>
        <div
          className={`pokemonDetailCard_base-value ${assignBaseStatColor(
            "value"
          )}`}
        >
          {statValue}
        </div>
        <div className="pokemonDetailCard_base-graph">
          <div className="bar">
            <div
              className={`pokemonDetailCard_base-bar ${assignBaseStatColor(
                "bar"
              )}`}
              style={{ width: `${(statValue / 252) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonDetailCardMiddle_BaseStat;
