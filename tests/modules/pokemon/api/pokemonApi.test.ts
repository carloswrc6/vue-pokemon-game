import { pokemonApi } from "@/modules/pokemon/api/pokemonApi"
import { describe, expect, test } from "vitest"

describe('pokemonApi', ()=>{
  test('Should be configurated as expect', () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon'
    expect(pokemonApi.defaults.baseURL).toBe(baseURL)
  })
})