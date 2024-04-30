import React, { useEffect, useState, useCallback } from "react";
import PokemonThumbnail from "./components/PokemonThumbail";
import "./Pokemon.css";
import "./App.css";

function App() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [sortOption, setSortOption] = useState("id");
    const [filterType, setFilterType] = useState("");
    const [allTypes, setAllTypes] = useState([]);

    const getAllPokemons = useCallback(async () => {
        try {
            const res = await fetch(loadPoke);
            const data = await res.json();
            setLoadPoke(data.next);

            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );

            setAllPokemons((currentList) => [...currentList, ...pokemonDetails]);

            // Fetch all Pokemon types
            const typesRes = await fetch("https://pokeapi.co/api/v2/type/");
            const typesData = await typesRes.json();
            setAllTypes(typesData.results.map((type) => type.name));
        } catch (error) {
            console.error("Error fetching Pokemon list:", error);
        }
    }, [loadPoke]);

    const filterPokemons = useCallback(() => {
        const filteredList = allPokemons
            .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((pokemon) =>
                filterType ? pokemon.types.some((type) => type.type.name === filterType) : true
            );

        setFilteredPokemons(filteredList);
    }, [allPokemons, searchTerm, filterType]);

    const sortPokemons = useCallback(() => {
        const sortedList = [...filteredPokemons].sort((a, b) => {
            switch (sortOption) {
                case "id":
                    return a.id - b.id;
                case "name":
                    return a.name.localeCompare(b.name);
                case "height":
                    return a.height - b.height;
                case "weight":
                    return a.weight - b.weight;
                default:
                    return 0;
            }
        });

        setFilteredPokemons(sortedList);
    }, [filteredPokemons, sortOption]);

    useEffect(() => {
        getAllPokemons();
    }, [getAllPokemons]);

    useEffect(() => {
        filterPokemons();
    }, [filterPokemons]);

    useEffect(() => {
        sortPokemons();
    }, [sortPokemons]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    return (
        <div className="app-container">
            <h1 style={{ textAlign: "center" }}>Pokemon Kingdom.</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="filter">
                <label>Filter by Type:</label>
                <select value={filterType} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    {allTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="sort">
                <label>Sort by:</label>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                </select>
            </div>

            <div className="pokemon-container row-4">
                {filteredPokemons.map((pokemon, index) => (
                    <PokemonThumbnail
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.sprites.other.dream_world.front_default}
                        type={pokemon.types[0].type.name}
                        key={index}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        stat1={pokemon.stats[0].stat.name}
                        stat2={pokemon.stats[1].stat.name}
                        stat3={pokemon.stats[2].stat.name}
                        stat4={pokemon.stats[3].stat.name}
                        stat5={pokemon.stats[4].stat.name}
                        stat6={pokemon.stats[5].stat.name}
                        bs1={pokemon.stats[0].base_stat}
                        bs2={pokemon.stats[1].base_stat}
                        bs3={pokemon.stats[2].base_stat}
                        bs4={pokemon.stats[3].base_stat}
                        bs5={pokemon.stats[4].base_stat}
                        bs6={pokemon.stats[5].base_stat}
                    />
                ))}
                <button className="load-more" onClick={() => getAllPokemons()}>
                    More Pokemons
                </button>
            </div>
        </div>
    );
}

export default App;