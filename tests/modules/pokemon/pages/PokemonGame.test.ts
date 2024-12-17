import { describe, expect, test, vi, type Mock } from 'vitest';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';

const pokemonsOptions = [
  { id: 1, name: 'p1' },
  { id: 2, name: 'p2' },
  { id: 3, name: 'p3' },
  { id: 4, name: 'p4' },
];
vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValueOnce({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      pokemonOptions: [],
      randomPokemon: undefined,
      // Methods
      getNextRound: vi.fn(),
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h3').text()).toBe('Cargando Pokémons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('should render <PokemonPicture/> and <PokemonOptions/>', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      pokemonOptions: pokemonsOptions,
      randomPokemon: pokemonsOptions.at(0),
      // Methods
      getNextRound: vi.fn(),
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
    const pokemons = pokemonsOptions.map((p) => p.name);

    // console.log('wrapper ',wrapper.html())
    expect(wrapper.find('img').attributes('src')).toBe(imageUrl);

    const buttons = wrapper.findAll('.capitalize');
    expect(buttons).length(4);

    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });

  test('should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      pokemonOptions: pokemonsOptions,
      randomPokemon: pokemonsOptions.at(0),
      // Methods
      getNextRound: vi.fn(),
      checkAnswer: vi.fn(),
    });
    const wrapper = mount(PokemonGame);

    const button = wrapper.find('[data-test-id="btn-new-game"]');
    // console.log(wrapper.find('[data-test-id="btn-new-game"]'))
    expect(button.text()).toBe('¿Jugar de nuevo?');
  });
  test('should call the getNextRound function when the button is clicked', async () => {
    const spyNextRoundFn = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      pokemonOptions: pokemonsOptions,
      randomPokemon: pokemonsOptions.at(0),
      // Methods
      getNextRound: spyNextRoundFn,
      checkAnswer: vi.fn(),
    });
    const wrapper = mount(PokemonGame);

    const button = wrapper.find('[data-test-id="btn-new-game"]');
    await button.trigger('click');

    expect(spyNextRoundFn).toHaveBeenCalled();
    expect(spyNextRoundFn).toHaveBeenCalledWith(4);
  });
});
