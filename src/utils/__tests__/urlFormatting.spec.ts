import { describe, it, expect } from 'vitest'
import { formatUrl } from '../urlFormatting'

describe('URL formatting', () => {
  const testCases = [
    {
      name: 'wraps http link in href',
      url: 'http://example.com/test/123',
    },
    {
      name: 'wraps https link in href',
      url: 'https://example.com/test/123',
    },
    {
      name: 'wraps link url params in href',
      url: 'https://example.com/test/123?q=123',
    },
  ]

  it.each(testCases)('$name', ({ url }) => {
    const expected = `<a href="${url}" target="_blank">${url}</a>`
    expect(formatUrl(url)).toBe(expected)
  })
})
