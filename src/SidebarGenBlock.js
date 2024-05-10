import { useState, useEffect } from "react";
import "./SidebarGenBlock.css";
import gen1Image from "./assets/gen1.png";
import gen2Image from "./assets/gen2.png";
import gen3Image from "./assets/gen3.png";
import gen4Image from "./assets/gen4.png";
import gen5Image from "./assets/gen5.png";
import gen6Image from "./assets/gen6.png";
import gen7Image from "./assets/gen7.png";
import gen8Image from "./assets/gen8.png";
import gen9Image from "./assets/gen9.png";

const SidebarGenBlock = ({ generation, onClick }) => {
  const generationImage = {
    1: gen1Image,
    2: gen2Image,
    3: gen3Image,
    4: gen4Image,
    5: gen5Image,
    6: gen6Image,
    7: gen7Image,
    8: gen8Image,
    9: gen9Image,
  };

  const pokemonGenerationImage = (gen) => {
    return generationImage[gen];
  };
  const formatPokemonIdToFourDigits = (number) =>
    number.toString().padStart(4, "0");
  return (
    <div className="sidebar_block" onClick={onClick}>
      <div className="sidebar_block_image-container">
        <img
          src={`${pokemonGenerationImage(generation.generation)}`}
          alt={generation.name}
          className="sideb_block_generation_image"
        />
      </div>
      <div className="sidebar_block_gen_title_container">
        <h2 className="sidebar_block_gen_title">{generation.name}</h2>
        <div className="sidebar_block_national_id">
          <p className="sidebar_block_national_id-start">
            N°{formatPokemonIdToFourDigits(generation.start)}
          </p>
          -
          <p className="sidebar_block_national_id-end">
            N°{formatPokemonIdToFourDigits(generation.end)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SidebarGenBlock;
