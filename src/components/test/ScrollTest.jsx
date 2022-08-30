import axios from "axios"
import { useEffect, useState } from "react";

import React from 'react';

const ScrollTest = () => {
    let offset = 0;
    const [pokemon, setPokemon] = useState([]);
    const loadMorePokemon = () => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then(({ data }) => {
            const newPokemon = [];
            data.results.forEach((p) => newPokemon.push(p.name));
            setPokemon(oldPokemon => [...oldPokemon, ...newPokemon]);
        });
        offset += 10;
    }

    const handleScroll = (e) => {
        // console.log("top: ", e.target.documentElement.scrollTop);
        // console.log("win: ", window.innerHeight);
        // console.log("height: ", e.target.documentElement.scrollHeight);
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >= 
            e.target.documentElement.scrollHeight
            ){
            // console.log("at the bottom of the page");
            loadMorePokemon();
        }
    }

    useEffect(() => {
        loadMorePokemon();
        window.addEventListener("scroll", handleScroll)
    }, [])

    return (
        <div>
            {pokemon.map((p, i) => {
                return <div key={i} className="border flex w-40 h-40" style={{width: "100px", height: "100px"}}>{i + 1}{p}</div>
            })}
        </div>
    );
};

export default ScrollTest;