//Consumir accion , leer array.
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonsAction, obtenerSiguientePokemonsAction } from '../redux/pokeDucks'


const Pokemones = () => {
    // const offSet = useRef(0);
    const dispatch = useDispatch();
    const pokeLista = useSelector(store => store.pokemones.array)
    // console.log(pokeLista);
    const handleSiguiente = (e) => {
        // offSet.current = offSet.current + 20;
        // dispatch(obtenerPokemonsAction(offSet.current));
        //Asi via param o gestionado todo interno en redux.
        dispatch(obtenerSiguientePokemonsAction());
    }
    useEffect(() => {
        dispatch(obtenerPokemonsAction());
    }, [])
    return (
        <div>
            <h2>Lista de Pokemones</h2>
            <ul>
            {
                pokeLista.map(poke => <li key={poke.name}>{poke.name}</li>)
            }
            </ul>
            <button onClick={handleSiguiente}>Siguientes 20</button>
        </div>
    );
}

export default Pokemones;