import getPokemonOptions, { getPokemons, getPokemonNames } from "@/modules/pokemon/helpers/getPokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe('getPokemonOptions helpers ', () => {

    test('getPokemons debe retornar un array de números', () => {
        const pokemons = getPokemons()
        // console.log(pokemons);

        expect(pokemons.length).toBe(650)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[649]).toBe(650)
    });

    test('getPokemonNames debe retornar un array de 4 elementos con nombres de pokemons', async() => {
    //    const [p1, p2, p3, p4] = await getPokemonNames([1,2,3,4])

    //    expect(p1.name).toBe('bulbasaur')
    //    expect(p2.name).toBe('ivysaur')
    //    expect(p3.name).toBe('venusaur')
    //    expect(p4.name).toBe('charmander')

        const pokemonNames = await getPokemonNames([1,2,3,4])
        // console.log(pokemonNames);

        expect(pokemonNames).toStrictEqual(pokemons)
    });

    test('getPokemonOptions debe retornar un array desordenado', async() => {
        const pokemons = await getPokemonOptions()
        // console.log(pokemons);

        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual([
            {
                name: expect.any(String),
                id: expect.any(Number) 
            },
            {
                name: expect.any(String),
                id: expect.any(Number) 
            },
            {
                name: expect.any(String),
                id: expect.any(Number) 
            },
            {
                name: expect.any(String),
                id: expect.any(Number) 
            },
          ])
    });
});