import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

describe('PokemonPicture', () => {
  test('Should render the hidden image when showPokemon prop is false', () => {
    const pokemonId = 25
    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: pokemonId,
        showPokemon: false,
      },
    });

    const image = wrapper.find('img')
    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imageSource
      })
    )
  });

  test('Should render the image when showPokemon prop is true', () => {
    const pokemonId = 25
    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: pokemonId,
        showPokemon: true,
      },
    });

    const image = wrapper.find('img')
    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: imageSource
      })
    )
  });
});
