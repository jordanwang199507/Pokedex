import "./PokemonDetailCardTop.css";
import { ReactComponent as PokeBallUnder } from "./assets/Pokeball_under.svg";
import bugIcon from "./type-icons/bug.png";
import darkIcon from "./type-icons/dark.png";
import dragonIcon from "./type-icons/dragon.png";
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

const PokemonDetailCard = ({ pokemonId, pokemonMeta1, pokemonSpecieData }) => {
  const imagesrc = "https://img.pokemondb.net/sprites/home/normal/"; // to fetch pokemon image
  const englishDescription =
    pokemonSpecieData?.flavor_text_entries?.filter(
      (entry) =>
        entry.language.name === "en" &&
        (entry.version.name === "shield" ||
          entry.version.name === "lets-go-pikachu")
    ) || [];

  console.log(pokemonSpecieData);
  const formatPokemonHeightWeight = (number) => number / 10;
  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");
  const pokemonCardPokeBallTypeClassName = (pokemonType) =>
    "pokemon_card_pokeball_type_" + pokemonType;
  const pokemonCardTypeIconClassName = (pokemonType) =>
    "pokemon_card_type_" + pokemonType + "-icon";
  const pokemonCardTypeIconPng = (pokemonType) => typeIcons[pokemonType];
  const typeIcons = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
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
      {pokemonMeta1.name ? (
        <div className="pokemonDetailCardTop">
          <div className="pokemonDetailCard_info-left">
            <div className="pokemonDetailCard_id">
              N°{formatPokemonIdToFourDigits(pokemonId)}
            </div>
            <div className="pokemonDetailCard_name">{pokemonMeta1.name}</div>
            <div className="pokemonDetailCard_family">
              {pokemonSpecieData?.genera?.[7]?.genus || ""}
            </div>
            <div className="pokemonDetailCard_types-container">
              {pokemonMeta1.types.length > 1 ? (
                <>
                  <div
                    className={`pokemonDetailCard_types ${pokemonCardTypeIconClassName(
                      pokemonMeta1.types[0].type.name
                    )}`}
                  >
                    <div className="pokemonDetailCard_icon_image">
                      <img
                        src={pokemonCardTypeIconPng(
                          pokemonMeta1.types[0].type.name
                        )}
                        alt={pokemonMeta1.types[0].type.name}
                      />
                    </div>
                    <div className="pokemonDetailCard-type_name">
                      {pokemonMeta1.types[0].type.name}
                    </div>
                  </div>
                  <div
                    className={`pokemonDetailCard_types ${pokemonCardTypeIconClassName(
                      pokemonMeta1.types[1].type.name
                    )}`}
                  >
                    <div className="pokemonDetailCard_icon_image">
                      <img
                        src={pokemonCardTypeIconPng(
                          pokemonMeta1.types[1].type.name
                        )}
                        alt={pokemonMeta1.types[1].type.name}
                      />
                    </div>
                    <div className="pokemonDetailCard-type_name">
                      {pokemonMeta1.types[1].type.name}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`pokemonDetailCard_types ${pokemonCardTypeIconClassName(
                    pokemonMeta1.types[0].type.name
                  )}`}
                >
                  <div className="pokemonDetailCard_icon_image">
                    <img
                      src={pokemonCardTypeIconPng(
                        pokemonMeta1.types[0].type.name
                      )}
                      alt={pokemonMeta1.types[0].type.name}
                    />
                  </div>
                  <div className="pokemonDetailCard-type_name">
                    {pokemonMeta1.types[0].type.name}
                  </div>
                </div>
              )}
            </div>

            <div className="pokemonDetailCard_info-title pokedex-entry">
              POKEDEX ENTRY
            </div>
            <div className="pokemonDetailCard_pokedex-entry">
              {englishDescription[0]?.flavor_text || ""}
            </div>
          </div>

          <div className="pokemonDetailCard_image-section">
            <div className="pokemonDetailCard_image">
              <img
                src={`${imagesrc}${pokemonMeta1.name}.png`}
                alt={pokemonMeta1.name}
                className="pokemonDetailCard_image"
              />
            </div>
            <div className="pokemonDetailCard_pokeball-background">
              <PokeBallUnder
                className={`${pokemonCardPokeBallTypeClassName(
                  pokemonMeta1.types[0].type.name
                )}`}
              />
            </div>
          </div>
          <div className="pokemonDetailCard_info-right">
            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Ability</div>
              {pokemonMeta1.abilities.length > 1 ? (
                <div className="pokemonDetailCard_info-abilities-container">
                  {pokemonMeta1.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={`pokemonDetailCard_info-ability ${
                        index % 2 === 0
                          ? "yellow-background"
                          : "white-background"
                      }`}
                    >
                      {ability.ability.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pokemonDetailCard_info-abilities-conttainer">
                  <div className="pokemonDetailCard_info-ability yellow-background">
                    {pokemonMeta1.abilities[0].ability.name}
                  </div>
                </div>
              )}
            </div>

            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Height</div>
              <div className="pokemonDetailCard_info-entry">
                {formatPokemonHeightWeight(pokemonMeta1.height)}
                <span>Meter</span>
              </div>
            </div>
            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Weight</div>
              <div className="pokemonDetailCard_info-entry">
                {formatPokemonHeightWeight(pokemonMeta1.weight)}
                <span>K.G.</span>
              </div>
            </div>
            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Catch Rate</div>
              <div className="pokemonDetailCard_info-entry">
                {pokemonSpecieData?.capture_rate || ""}%
              </div>
            </div>
            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Growth Rate</div>
              <div className="pokemonDetailCard_info-entry">
                {pokemonSpecieData?.growth_rate?.name || ""}
              </div>
            </div>
            <div className="pokemonDetailCard_info-container">
              <div className="pokemonDetailCard_info-title">Base EXP.</div>
              <div className="pokemonDetailCard_info-entry">
                {pokemonMeta1.base_experience}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PokemonDetailCard;
