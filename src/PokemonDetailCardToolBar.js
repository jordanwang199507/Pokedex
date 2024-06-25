import { useState, useEffect } from "react";
// import "./PokemonDetailCardToolBar.css";
import "./style.css";
import { ReactComponent as PokeBall } from "./assets/Pokeball.svg";

const PokemonDetailCardToolBar = ({
  viewDetailAnalog,
  pokemonId,
  pokemonMeta1,
  pokemonSpecieData,
  previousPokemonId,
  previousPokemonMeta1,
  previousPokemonSpecieData,
  nextPokemonId,
  nextPokemonMeta1,
  nextPokemonSpecieData,
}) => {
  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  const [previousPreviousPokemonMetaData, setPreviousPreviousPokemonMetaData] =
    useState({});
  const [
    previousPreviousPokemonSpecieData,
    setPreviousPreviousPokemonSpecieData,
  ] = useState({});
  const [nextNextPokemonMetaData, setNextNextPokemonMetaData] = useState({});
  const [nextNextPokemonSpecieData, setNextNextPokemonSpecieData] = useState(
    {}
  );

  const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/";
  const API_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";

  const searchPokemonMetaData = async (index) => {
    if (index <= 0) return null;
    const response_meta = await fetch(`${API_URL_INITIAL}${index}`);
    if (!response_meta.ok) return null;
    const data_meta = await response_meta.json();
    return data_meta;
  };

  const searchPokemonSpecieData = async (index) => {
    if (index <= 0) return null;
    const response_specie = await fetch(`${API_URL_SPECIES}${index}`);
    if (!response_specie.ok) return null;
    const data = await response_specie.json();
    return data; // Return the fetched species data
  };

  const showPokemonDetailAnalog = async (whichIncrement) => {
    let nextNextMeta = {};
    let nextNextSpecie = {};
    let previousPreviousMeta = {};
    let previousPreviousSpecie = {};

    if (whichIncrement === "nextNext") {
      nextNextMeta = await searchPokemonMetaData(nextPokemonId + 1);
      nextNextSpecie = await searchPokemonSpecieData(nextPokemonId + 1);
      viewDetailAnalog(
        false,
        nextPokemonId,
        nextPokemonMeta1,
        nextPokemonSpecieData,
        pokemonId === 1 ? null : pokemonId,
        pokemonId === 1 ? {} : pokemonMeta1,
        pokemonId === 1 ? {} : pokemonSpecieData,
        nextPokemonId + 1,
        nextNextMeta,
        nextNextSpecie
      );
    } else {
      previousPreviousMeta = await searchPokemonMetaData(previousPokemonId - 1);
      previousPreviousSpecie = await searchPokemonSpecieData(
        previousPokemonId - 1
      );
      viewDetailAnalog(
        false,
        previousPokemonId,
        previousPokemonMeta1,
        previousPokemonSpecieData,
        previousPokemonId === 1 ? null : previousPokemonId - 1,
        previousPokemonId === 1 ? {} : previousPreviousMeta,
        previousPokemonId === 1 ? {} : previousPreviousSpecie,
        pokemonId,
        pokemonMeta1,
        pokemonSpecieData
      );
    }
  };

  return (
    <div className="PokemonDetailCardToolBar">
      <div className="PokemonDetailCardToolBar-container">
        {pokemonId !== 1 && previousPokemonId ? (
          <div
            className="PokemonDetailCardToolBar-previousBtn"
            onClick={() => {
              showPokemonDetailAnalog("previousPrevious");
            }}
          >
            <div className="pagination_button_outter previous">
              <div className="pagination_button_inner previous"></div>
            </div>
            <div className="button_info">
              <h5 className="PokemonDetailCardToolBar-index">
                N°{formatPokemonIdToFourDigits(previousPokemonId)}
              </h5>
              <h5 className="PokemonDetailCardToolBar-name">
                {previousPokemonMeta1.name}
              </h5>
            </div>
          </div>
        ) : (
          <div className="PokemonDetailCardToolBar-previousBtn hidden">
            <div className="pagination_button_outter previous">
              <div className="pagination_button_inner previous"></div>
            </div>
          </div>
        )}

        <div
          className="PokemonDetailCardToolBar_overallButton"
          onClick={() => viewDetailAnalog(true, null, null, null)}
        >
          <PokeBall className={``} />
          <h4 className="PokemonDetailCardToolBar_text">All Pokemon</h4>
        </div>

        {nextPokemonId ? (
          <div
            className="PokemonDetailCardToolBar-nextBtn"
            onClick={() => {
              showPokemonDetailAnalog("nextNext");
            }}
          >
            <div className="button_info">
              <h5 className="PokemonDetailCardToolBar-index">
                N°{formatPokemonIdToFourDigits(nextPokemonId)}
              </h5>
              <h5 className="PokemonDetailCardToolBar-name">
                {nextPokemonMeta1.name}
              </h5>
            </div>
            <div className="pagination_button_outter">
              <div className="pagination_button_inner"></div>
            </div>
          </div>
        ) : (
          <div className="PokemonDetailCardToolBar-nextBtn hidden">
            <div className="pagination_button_outter">
              <div className="pagination_button_inner"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailCardToolBar;
