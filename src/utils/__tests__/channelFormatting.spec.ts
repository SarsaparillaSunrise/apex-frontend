import { describe, it, expect } from 'vitest'
import { formatChannelName } from '../channelFormatting'

describe('Channel name formatting', () => {
  it('converts leading + to # for URL-safe channel names', () => {
    expect(formatChannelName('+channel')).toBe('#channel')
    expect(formatChannelName('++channel')).toBe('##channel')
    expect(formatChannelName('+++channel')).toBe('###channel')
    expect(formatChannelName('++++channel')).toBe('####channel')
  })

  it('leaves channels without leading + unchanged', () => {
    expect(formatChannelName('channel')).toBe('channel')
    expect(formatChannelName('help')).toBe('help')
    expect(formatChannelName('channel+plus')).toBe('channel+plus')
  })
})
