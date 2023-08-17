import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions Component tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        // pokemons: pokemons
        pokemons,
      },
    });
  });

  test("debe hacer match con el snapshot ", () => {
    console.log(wrapper.html());
    // expect(wrapper.html()).toMatchInlineSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  });

  test("debe mostrar las 4 opciones correctamente", () => {
    const [p1, p2, p3, p4] = wrapper.findAll('li')

    expect( p1.exists() ).toBeTruthy()
    expect( p2.exists() ).toBeTruthy()
    expect( p3.exists() ).toBeTruthy()
    expect( p4.exists() ).toBeTruthy()

    expect(p1.text()).toBe('pikachu')
    expect(p2.text()).toBe('charmander')
    expect(p3.text()).toBe('venusaur')
    expect(p4.text()).toBe('mew')
  });

  test("debe de emitir 'selection' con sus respectivos parámetros al hacer click", () => {
    const [p1, p2, p3, p4] = wrapper.findAll('li')

    // estímulo
    p1.trigger('click')
    p2.trigger('click')
    p3.trigger('click')
    p4.trigger('click')

    // console.log( wrapper.emitted('selection') )
    expect( wrapper.emitted('selection')[0] ).toEqual([5])
    expect( wrapper.emitted('selection')[1] ).toEqual([10])
    expect( wrapper.emitted('selection')[2] ).toEqual([15])
    expect( wrapper.emitted('selection')[3] ).toEqual([20])
  });
});
