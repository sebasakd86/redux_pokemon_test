// constantes
const dataInicial = {
    array: [],
    offset: 0
}

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const SIGUIENTE_POKE_SUCCESS = 'SIGUIENTE_POKE_SUCCESS'

// reducer
export default function pokesReducer(state = dataInicial, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload};
        case SIGUIENTE_POKE_SUCCESS:
            return { ...state, array: action.payload.array, offset: action.payload.offset};
        default:
            return state
    }
}
// actions
export const obtenerPokemonsAction = (offset=0) => async (dispatch) => {
    try {
        const res = await (await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)).json();
        // console.log(offset, res.results);
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.results
        })
    } 
    catch (error) {
        console.log(error)
    }
}

export const obtenerSiguientePokemonsAction = () => async (dispatch,getState) => {
    console.log('state', getState().pokemones.offset);
    const sig = getState().pokemones.offset + 20;
    try {
        const res = await (await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${sig}&limit=20`)).json();
        // console.log(offset, res.results);
        dispatch({
            type: SIGUIENTE_POKE_SUCCESS,
            payload: {
                array: res.results,
                offset: sig
            }
        })
    } 
    catch (error) {
        console.log(error)
    }
}