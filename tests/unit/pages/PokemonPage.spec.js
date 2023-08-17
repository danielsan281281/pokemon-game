import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage Component tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe hacer match con el snapshot ", () => {
    // console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot()
  });

  test("debe llamar el mixPokemonArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
    shallowMount(PokemonPage);

    expect( mixPokemonArraySpy ).toHaveBeenCalled()
  });

  test("debe hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount( PokemonPage , {
        data(){
            return {
                pokemonArr: pokemons,
                pokemon: pokemons[0],
                showPokemon: false,
                showAnswer: false,
                message: ''
            }
        }
    })

    expect(wrapper.html()).toMatchSnapshot()    
  });

 test('debe mostrar los componentes de PokemonPicture y PokemonOptions', () => {
    const wrapper = shallowMount( PokemonPage , {
        data(){
            return {
                pokemonArr: pokemons,
                pokemon: pokemons[0],
                showPokemon: false,
                showAnswer: false,
                message: ''
            }
        }
    })
    
    // console.log(wrapper.html());
    
    const picture = wrapper.find('pokemon-picture-stub')
    const options = wrapper.find('pokemon-options-stub')

    // PokemonPicture debe de existir
    expect( picture.exists()).toBeTruthy()

    // PokemonOptions debe de existir
    expect( options.exists()).toBeTruthy()

    // PokemonPicture tenga el atributo pokemonId === '5'
    expect( picture.attributes('pokemonid')).toBe('5')
    
    // PokemonOptions tenga el atributo pokemons toBe true
    expect( options.attributes('pokemons')).toBeTruthy()
 });

 test('pruebas con checkAnswer ', async() => {
    const wrapper = shallowMount( PokemonPage , {
        data(){
            return {
                pokemonArr: pokemons,
                pokemon: pokemons[0],
                showPokemon: false,
                showAnswer: false,
                message: ''
            }
        }
    })

    // console.log(wrapper.vm); // vm es el componente de Vue ya montado
    await wrapper.vm.checkAnswer(5) // esperar a que Vue haga la renderización del componente y se ejecute el ciclo de vida del componente
    expect( wrapper.find('h2').exists() ).toBeTruthy()
    expect( wrapper.vm.showPokemon ).toBeTruthy()
    expect( wrapper.find('h2').text() ).toBe(`Correcto, ${pokemons[0].name}`)

    await wrapper.vm.checkAnswer(10)
    expect( wrapper.find('h2').exists() ).toBeTruthy()
    expect( wrapper.vm.showPokemon ).toBeTruthy()
    expect( wrapper.find('h2').text() ).toBe(`Oops, era ${pokemons[0].name}`)
 });
});
