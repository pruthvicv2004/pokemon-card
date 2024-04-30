// src/components/Pokemon.js

import React from 'react';
import './Pokemon.css';

const Pokemon = (props) => {
  const { id, name, type, image } = props.pokemon;

  return (
    <div className="pokemon-card col-4" key={id}>
      <img className="pokemon-image" src={image} alt={`${name} Pokemon`} />
      <div className="pokemon-details">
        <h3>{name}</h3>
        <p>Type: {type}</p>
      </div>
    </div>
  );
};

export default Pokemon;