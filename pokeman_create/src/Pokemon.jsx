import './index.css';
import React, { useState, useEffect } from 'react';
import { PokemonCards } from './PokemonCards';
export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [search,setSearch]=useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=100";
    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            console.log(data);
            const detailedPokemonData = await Promise.all(
                data.results.map(async (curPokemon) => {
                    const res = await fetch(curPokemon.url);
                    const data = await res.json();
                    return data;
                })
            );
            console.log(detailedPokemonData);
            setPokemon(detailedPokemonData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false)
        }
    };
    
    useEffect(() => {
        fetchPokemon();
    }, []);
    const searchData=pokemon.filter((curPokemon)=>
      curPokemon.name.toLowerCase().includes(search.toLowerCase())
    )
    if (loading){
        return(
            <div><h1>Loading....</h1></div>
        )
    }
    if(error) {
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }
    return (
        <section className="container">
            <header>
                <h1>Catch Pokémon</h1>
            </header>
            <div class="pokemon-search">
                <input type="text" 
                placeholder="Search any Pokemon"
                value={search} 
                onChange={(e)=>setSearch(e.target.value)} />

            </div>
            <div>
                <ul className="cards">
                    {searchData.map((curPokemon) => {
                        return (                           
                                <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
