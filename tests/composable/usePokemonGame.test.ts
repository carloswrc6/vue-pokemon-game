import { describe, expect, test, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter'

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import {withSetup} from '../utils/with-setup'
import { pokemonListFake } from '../data/fake-pokemon';

import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import confetti from 'canvas-confetti';

const mockPokemonApi = new MockAdapter(pokemonApi)

mockPokemonApi.onGet('/?limit=151').reply(200,{
  results: pokemonListFake
})

vi.mock('canvas-confetti', ()=>({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('Should initialize with the correct default values', async() => {
    const [results,app] = withSetup(usePokemonGame)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.isLoading.value).toBe(true)
    expect(results.pokemonOptions.value).toEqual([])
    expect(results.randomPokemon.value).toBe(undefined)

    // await new Promise( (r)=> setTimeout(r,2000) )
    await flushPromises()

    expect(results.isLoading.value).toBe(false)
    expect(results.pokemonOptions.value.length).toBe(4)
    expect(results.randomPokemon.value).toEqual(
      {
        id: expect.any(Number),
        name: expect.any(String),
      }
    )

  });

  test('should correctly handle hetNextRound',async ()=>{
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    results.gameStatus.value = GameStatus.Won

    results.getNextRound(5)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.pokemonOptions.value).toHaveLength(5)
  
  })

  test('should correctly handle getNextRound and return diferrent pokemons', async ()=>{
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const firstOptions = [...results.pokemonOptions.value].map( (p)=> p.name)

    results.getNextRound()

    const secondOptions =[...results.pokemonOptions.value]

    secondOptions.forEach( (pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name)
    })

  })

  test('should correctly handle a incorrect answer', async()=>{
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const {checkAnswer, gameStatus}= results;

    checkAnswer(1000000000)
    expect(gameStatus.value).toBe(GameStatus.Lost)

  })

  test('should correctly handle a correct answer', async()=>{
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const {checkAnswer, gameStatus, randomPokemon}= results;

    expect(gameStatus.value).toBe(GameStatus.Playing)
    checkAnswer(randomPokemon.value.id)

    expect(confetti).toHaveBeenCalled()
    expect(gameStatus.value).toBe(GameStatus.Won)

  })

});
