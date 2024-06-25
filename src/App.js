import { useState, useEffect } from "react";
// import "./App.css";
import "./style.css";
import PokemonCard from "./PokemonCard";
import PokemonDetailCardToolBar from "./PokemonDetailCardToolBar";
import PokemonDetailCardTop from "./PokemonDetailCardTop";
import PokemonDetailCardMiddle from "./PokemonDetailCardMiddle";
import SidebarGenBlock from "./SidebarGenBlock";
import SidebarPokemonBlock from "./SidebarPokemonBlock";
import { ReactComponent as PokeBall } from "./assets/Pokeball.svg";

import hoho from "./assets/hoho.png";
import leaf from "./assets/leaf.png";
import leaf2 from "./assets/leaf2.png";
import sun from "./assets/sun.png";
import landscape from "./assets/landscape.png";
import waveLeft from "./assets/wave-left.png";
import waveCorner from "./assets/wave-corner.png";
import waveStatic from "./assets/wave-static.png";
import gyaradosShiny from "./assets/gyaradosShiny.png";
import gyarados from "./assets/gyarados.png";
import waveDown from "./assets/wave-down.png";
import magikarpGroup from "./assets/magikarpGroup.png";
import person from "./assets/person.png";

const API_URL_INITIAL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";

const pokemon1 = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const App = () => {
  const originalPokemonGenerations = [
    {
      generation: 1,
      start: 1,
      end: 151,
      total: 151,
      description: "Generation I: Kanto Region",
      name: "Generation I",
    },
    {
      generation: 2,
      start: 152,
      end: 251,
      total: 100,
      description: "Generation II: Johto Region",
      name: "Generation II",
    },
    {
      generation: 3,
      start: 252,
      end: 386,
      total: 135,
      description: "Generation III: Hoenn Region",
      name: "Generation III",
    },
    {
      generation: 4,
      start: 387,
      end: 493,
      total: 107,
      description: "Generation IV: Sinnoh Region",
      name: "Generation IV",
    },
    {
      generation: 5,
      start: 494,
      end: 649,
      total: 156,
      description: "Generation V: Unova Region",
      name: "Generation V",
    },
    {
      generation: 6,
      start: 650,
      end: 721,
      total: 72,
      description: "Generation VI: Kalos Region",
      name: "Generation VI",
    },
    {
      generation: 7,
      start: 722,
      end: 809,
      total: 88,
      description: "Generation VII: Alola Region",
      name: "Generation VII",
    },
    {
      generation: 8,
      start: 810,
      end: 905,
      total: 96,
      description: "Generation VIII: Galar Region",
      name: "Generation VIII",
    },
    {
      generation: 9,
      start: 906,
      end: 1025,
      total: 120,
      description: "Generation IX: Paldea Region",
      name: "Generation IX",
    },
  ];

  const [pokemonPageCounter, setPokemonPageCounter] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedPokemonGeneration, setSelectedPokemonGeneration] = useState(0);

  const [viewPokemonCards, setViewPokemonCards] = useState(true);
  const [targetPokemon, setTargetPokemon] = useState();
  const [targetPokemonMetadata1, setTargetPokemonMetadata1] = useState();
  const [targetPokemonSpeciedata1, setTargetPokemonSpeciedata1] = useState();
  const [previousTargetPokemon, setPreviousTargetPokemon] = useState();
  const [previousTargetPokemonMetadata1, setPreviousTargetPokemonMetadata1] =
    useState();
  const [previousTargetPokemonSpeciedata1, setPreviousargetPokemonSpeciedata1] =
    useState();
  const [nextTargetPokemon, setNextTargetPokemon] = useState();
  const [nextTargetPokemonMetadata1, setNextTargetPokemonMetadata1] =
    useState();
  const [nextTargetPokemonSpeciedata1, setNextTargetPokemonSpeciedata1] =
    useState();
  const [pokemonTypeData, setPokemonTypeData] = useState({});
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  const [pokemonGenerations, setPokemonGenerations] = useState(
    originalPokemonGenerations
  );
  const totalPages = Math.ceil(
    pokemonGenerations[selectedPokemonGeneration].total / cardsPerPage
  ); // Assuming you have 1025 Pokemon

  const API_URL_TYPE = "https://pokeapi.co/api/v2/type/";

  const searchTypesData = async (index) => {
    const response = await fetch(`${API_URL_TYPE}${index}`);
    const data = await response.json();
    return data;
  };
  function getCardsPerPage() {
    if (window.innerWidth <= 776) {
      return 24;
    } else if (window.innerWidth >= 788 && window.innerWidth < 950) {
      return 25;
    } else if (window.innerWidth < 1300) {
      return 24;
    } else {
      return 28;
    }
  }
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    const fetchAllTypesData = async () => {
      const allData = {};
      for (let i = 1; i <= 18; i++) {
        const data = await searchTypesData(i);
        allData[data.name] = data;
      }
      setPokemonTypeData(allData);
    };
    fetchAllTypesData();
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setPokemonGenerations(
          originalPokemonGenerations.map((gen) => ({
            ...gen,
            name: gen.name.replace("Generation", "Gen."),
          }))
        );
      } else {
        setPokemonGenerations(originalPokemonGenerations);
      }
      setCardsPerPage(getCardsPerPage());
    };

    window.addEventListener("resize", handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //   const handlePageSelect = (event) => {
  //     setPokemonPageCounter(Number(event.target.value));
  //   };

  useEffect(() => {
    const header = document.getElementById("header");
    const leaf = document.getElementById("leaf");
    const leaf2 = document.getElementById("leaf2");
    // const hill1 = document.getElementById("hill1");
    // const hill4 = document.getElementById("hill4");
    // const hill5 = document.getElementById("hill5");
    const hoho = document.getElementById("hoho");
    const magikarpGroup = document.getElementById("magikarpGroup");
    const person = document.getElementById("person");
    const sun = document.getElementById("sun");
    const waveLeft = document.getElementById("waveLeft");
    const waveStatic = document.getElementById("waveStatic");
    const waveDown = document.getElementById("waveDown");
    const waveDownSlow = document.getElementById("waveDownSlow");
    const waveCorner = document.getElementById("waveCorner");
    const gyarados = document.getElementById("gyarados");
    const gyaradosShiny = document.getElementById("gyaradosShiny");
    const handleScroll = () => {
      const value = window.scrollY;
      header.style.marginTop = `${value * 1}px`;

      if (leaf) {
        leaf.style.top = `${value * -1.5}px`;
        leaf.style.left = `${value * 1.5}px`;
      }
      if (leaf2) {
        leaf2.style.top = `${value * -1.5}px`;
        leaf2.style.left = `${value * -1.5}px`;
      }
      if (hoho) {
        hoho.style.top = `${value * -1}px`;
        hoho.style.left = `${value * 1}px`;
      }
      if (sun) {
        sun.style.top = value < 250 ? `${value * 0.75}px` : `186.75px`;
      }
      if (waveLeft) {
        waveLeft.style.top = value < 250 ? `${value * 0.25}px` : `62.25px`;
        waveLeft.style.right = value < 250 ? `${-500 - value * -2}px` : `-2px`;
      }
      if (waveStatic) {
        waveStatic.style.top =
          value < 250 ? `${20 - value * 0.35}px` : `-67.15px`;
        waveStatic.style.left =
          value < 250 ? `${-700 - value * -2}px` : `-202px`;
      }
      if (waveCorner) {
        waveCorner.style.top = value < 320 ? `${value * 0.1}px` : `31.9px`;
      }
      if (magikarpGroup) {
        magikarpGroup.style.left =
          value < 475 ? `${450 - value * 2.2}px` : `-522.4px`;
        magikarpGroup.style.top =
          value < 475 ? `${-50 - value * -1.2}px` : `480.4px`;
      }
      if (gyaradosShiny) {
        const scaleValue = value < 250 ? 0.6 + value * 0.0011 : 0.8695;
        gyaradosShiny.style.transform = `scale(${scaleValue}) rotate(-10deg)`;
        gyaradosShiny.style.left =
          value < 250 ? `${-180 - value * -0.3}px` : `-106.5px`;
        gyaradosShiny.style.top =
          value < 250 ? `${80 - value * 0.2}px` : `30.6px`;
      }
      if (gyarados) {
        const scaleValue = value < 250 ? 0.8 + value * 0.0012 : 1.094;
        gyarados.style.transform = `scale(${scaleValue})`;
        gyarados.style.bottom =
          value < 250 ? `${-150 - value * -0.35}px` : `-64.25px`;
        gyarados.style.left = value < 250 ? `${value * -0.15}px` : `-36.75px`;
      }
      if (waveDownSlow) {
        waveDownSlow.style.top = value < 475 ? `${value * 0.13}px` : `61.49px`;
      }
      if (waveDown) {
        waveDown.style.top = value < 475 ? `${value * 0.2}px` : `94.2px`;
      }
      if (person) {
        person.style.left =
          value <= 250 ? `${-300 - value * -1.2}px` : `-1.2px`;
        person.style.bottom =
          value <= 250 ? `${-200 - value * -0.7}px` : `-25.7px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const viewPokemonDetailAnalog = (
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
    setViewPokemonCards(viewPokemonCards);
    setTargetPokemon(pokemonId);
    setTargetPokemonMetadata1(pokemonMetaData1);
    setTargetPokemonSpeciedata1(pokemonSpecieData);
    setPreviousTargetPokemon(previousPokemonId);
    setPreviousTargetPokemonMetadata1(previousPokemonMetaData1);
    setPreviousargetPokemonSpeciedata1(previousPokemonSpecieData);
    setNextTargetPokemon(nextPokemonId);
    setNextTargetPokemonMetadata1(nextPokemonMetaData1);
    setNextTargetPokemonSpeciedata1(nextPokemonSpecieData);
    setIsSidebarVisible(false);
  };

  const handleSelectGeneration = (generation) => {
    setSelectedPokemonGeneration(generation);
    setIsSidebarVisible(!isSidebarVisible);
    setPokemonPageCounter(0);
  };

  const updateToPreviousPage = () => {
    setPokemonPageCounter((current) => Math.max(0, current - 1));
  };

  const updateToNextPage = () => {
    setPokemonPageCounter((current) => Math.min(totalPages - 1, current + 1));
  };
  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");

  // Calculate the indices to be shown based on the current page
  const startIndex =
    pokemonPageCounter * cardsPerPage +
    pokemonGenerations[selectedPokemonGeneration].start;
  const endIndex = startIndex + cardsPerPage;

  return (
    <div className="App">
      <div className="pokedex_homepage-container">
        <div className="pokedex_homepage">
          <img src={sun} id="sun" />
          <img src={landscape} id="landscape" />
          <img src={waveLeft} id="waveLeft" />
          <img src={waveCorner} id="waveCorner" />
          <img src={waveStatic} id="waveStatic" />
          <img src={gyaradosShiny} id="gyaradosShiny" />
          <img src={gyarados} id="gyarados" />
          <img src={waveDown} id="waveDownSlow" />
          <img src={magikarpGroup} id="magikarpGroup" />
          <img src={waveDown} id="waveDown" />
          <img src={leaf} id="leaf" />
          <img src={leaf2} id="leaf2" />
          <img src={hoho} id="hoho" />
          <div className="pokedex_homepage-shadow"></div>
          <img src={person} id="person" />
          <h1 id="header">
            Poké<span>Pedia</span>
          </h1>
          <div className="pokedex_homepage-inset"></div>
        </div>
      </div>

      <div className="pokedex">
        {viewPokemonCards ? (
          <>
            <div
              className={`sidebar_button ${
                isSidebarVisible ? "visible" : "hidden"
              }`}
              onClick={toggleSidebarVisibility}
            >
              <PokeBall className={``} />
              <h4>Select Generation</h4>
            </div>
            <div
              className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
            >
              {pokemonGenerations.map((generation, index) => (
                <SidebarGenBlock
                  key={index}
                  generation={generation}
                  onClick={() => handleSelectGeneration(index)}
                  className={
                    selectedPokemonGeneration == index
                      ? "sidebarblock-active"
                      : ""
                  }
                />
              ))}
            </div>
            <div className="container">
              <div className="pokedex_title_row">
                <div className="pokedex_title_container">
                  <h1 className="pokedex_title">
                    {pokemonGenerations[selectedPokemonGeneration].description}
                  </h1>
                  <div className="pokedex_title_id_container">
                    <div className="pokedex_title_id-start">
                      N°
                      {formatPokemonIdToFourDigits(
                        pokemonGenerations[selectedPokemonGeneration].start
                      )}
                    </div>
                    -
                    <div className="pokedex_title_id-end">
                      N°
                      {formatPokemonIdToFourDigits(
                        pokemonGenerations[selectedPokemonGeneration].end
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pokedex_container">
                {Array.from({ length: cardsPerPage }, (_, index) => {
                  const cardIndex = startIndex + index; // +1 because Pokedex starts from 1
                  return cardIndex <=
                    pokemonGenerations[selectedPokemonGeneration].end ? ( // Ensure we do not exceed the total number of Pokemon
                    <PokemonCard
                      key={cardIndex}
                      index={cardIndex}
                      viewDetailAnalog={viewPokemonDetailAnalog}
                    />
                  ) : null;
                })}
              </div>
              <div className="pagination_container">
                {pokemonPageCounter !== 0 ? (
                  <button
                    className="pagination_button_outter previous"
                    onClick={updateToPreviousPage}
                  >
                    <div className="pagination_button_inner previous">
                      Prev.
                    </div>
                  </button>
                ) : (
                  ""
                )}
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-item ${
                        index === pokemonPageCounter ? "active" : ""
                      }`}
                      onClick={() => setPokemonPageCounter(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="pagination_button_outter"
                  onClick={updateToNextPage}
                >
                  <div className="pagination_button_inner">Next</div>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
            >
              {Array.from(
                {
                  length: pokemonGenerations[selectedPokemonGeneration].total,
                },
                (_, index) => (
                  <SidebarPokemonBlock
                    index={
                      pokemonGenerations[selectedPokemonGeneration].start +
                      index
                    }
                    target={targetPokemon}
                    viewPokemonDetailAnalog={viewPokemonDetailAnalog}
                  />
                )
              )}
            </div>
            <PokemonDetailCardToolBar
              viewDetailAnalog={viewPokemonDetailAnalog}
              pokemonId={targetPokemon}
              pokemonMeta1={targetPokemonMetadata1}
              pokemonSpecieData={targetPokemonSpeciedata1}
              previousPokemonId={previousTargetPokemon}
              previousPokemonMeta1={previousTargetPokemonMetadata1}
              previousPokemonSpecieData={previousTargetPokemonSpeciedata1}
              nextPokemonId={nextTargetPokemon}
              nextPokemonMeta1={nextTargetPokemonMetadata1}
              nextPokemonSpecieData={nextTargetPokemonSpeciedata1}
            />
            <div
              className={`sidebar_button detailcard_sidebar-btn ${
                isSidebarVisible ? "visible" : "hidden"
              }`}
              onClick={toggleSidebarVisibility}
            >
              <PokeBall className={``} />
              <h4>Select Generation</h4>
            </div>
            <div className="container">
              <PokemonDetailCardTop
                pokemonId={targetPokemon}
                pokemonMeta1={targetPokemonMetadata1}
                pokemonSpecieData={targetPokemonSpeciedata1}
              />
              <PokemonDetailCardMiddle
                pokemonId={targetPokemon}
                pokemonMeta1={targetPokemonMetadata1}
                pokemonSpecieData={targetPokemonSpeciedata1}
                pokemonTypeData={pokemonTypeData}
              />
            </div>
          </>
        )}
      </div>
      <footer className="footer">
        <div className="logo_container">
          <div className="logo">
            {" "}
            <PokeBall className={`logo-pokeball`} />
          </div>
          <div className="footer-logoName">
            Poké<span>Pedia</span>
          </div>
        </div>
        <hr></hr>
        <p>
          All content & design &copy;. Pokémon Database, 2008-2024. Pokémon
          images & names &copy;. 1995-2024 Nintendo/Game Freak.
        </p>
        <p>
          Data sourced from <a href="https://pokeapi.co/">PokéAPI.</a> Pokémon
          assets are sourcedfrom <a href="">serebii.net</a> and{" "}
          <a href="">img.pokemondb.net</a>
        </p>
        <p>Designed and Developed by Jordan Wang 2024</p>
        <PokeBall className={`footer-background`} />
      </footer>
    </div>
  );
};
export default App;
