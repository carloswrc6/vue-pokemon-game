import { GameStatus } from "@/modules/pokemon/interfaces"
import { describe, expect, test } from "vitest"

describe('Game status', ()=>{
  test('Should have a value of enum GameStatus', () => {
    expect(GameStatus.Playing).toBe('playing')
    expect(GameStatus.Won).toBe('won')
    expect(GameStatus.Lost).toBe('lost')
  })
})