import { describe, it, expect } from 'vitest'
import { calculateNickColour } from '../nickColour'

describe('Nick colour calculation', () => {
  it('assigns colour 1 when no nickname is provided', () => {
    expect(calculateNickColour('')).toBe(1)
  })

  it('assigns the same colour to a user returning to chat', () => {
    const user = 'Alice'
    const firstVisit = calculateNickColour(user)
    const returningVisit = calculateNickColour(user)

    expect(returningVisit).toBe(firstVisit)
  })

  it('assigns different colours to help distinguish between active users', () => {
    // Simulating a typical chat scenario with multiple users
    const alice = calculateNickColour('Alice')
    const bob = calculateNickColour('Bob')
    const charlie = calculateNickColour('Charlie')

    expect(alice).not.toBe(bob)
    expect(bob).not.toBe(charlie)
    expect(charlie).not.toBe(alice)
  })

  it('works with international nicknames', () => {
    const colour = calculateNickColour('José')
    expect(colour).toBeGreaterThanOrEqual(1)
    expect(colour).toBeLessThanOrEqual(16)
  })

  it('maintains colour assignments across typical IRC nickname variations', () => {
    const originalNick = calculateNickColour('Alice')
    const withBrackets = calculateNickColour('Alice[away]')
    const withUnderscore = calculateNickColour('Alice_away')

    // Different variations should get different colours to avoid confusion
    expect(withBrackets).not.toBe(originalNick)
    expect(withUnderscore).not.toBe(originalNick)
    expect(withUnderscore).not.toBe(withBrackets)
  })
})
