import { describe, it, expect } from 'vitest'
import { decodeChannelName } from '../channelFormatting'

describe('decodeChannelName', () => {
  it('converts leading + to # for URL-safe channel names', () => {
    expect(decodeChannelName('+channel')).toBe('#channel')
    expect(decodeChannelName('++channel')).toBe('##channel')
    expect(decodeChannelName('+++channel')).toBe('###channel')
    expect(decodeChannelName('++++channel')).toBe('####channel')
  })

  it('leaves channels without leading + unchanged', () => {
    expect(decodeChannelName('channel')).toBe('channel')
    expect(decodeChannelName('help')).toBe('help')
    expect(decodeChannelName('channel+plus')).toBe('channel+plus')
  })
})
