// PokemonGrid.js
import React from "react";
import PokemonThumbnail from "./PokemonThumbNail";

const PokemonGrid = ({ pokemonList }) => {
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedPokemonList = chunkArray(pokemonList, 5);

  return (
    <div>
      {chunkedPokemonList.map((row, rowIndex) => (
        <div key={rowIndex} className="pokemon-row">
          {row.map((pokemon) => (
            <PokemonThumbnail key={pokemon.id} {...pokemon} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;