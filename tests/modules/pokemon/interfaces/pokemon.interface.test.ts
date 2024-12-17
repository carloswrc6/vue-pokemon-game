import type { Pokemon } from "@/modules/pokemon/interfaces"
import { describe, expect, test } from "vitest"

describe('Pokemon Interface', ()=>{
  const pokemon: Pokemon={id:1,name:'bulbasaur'}
  test('Should have an property of object pokemon', () => {
    expect(pokemon).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    })
  })
})