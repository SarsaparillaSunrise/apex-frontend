import { describe, it, expect } from 'vitest'
import { formatUrl } from '../urlFormatting'

const standardUrlTestCases = [
  {
    scenario: 'converts http URL to clickable link',
    given: 'check out http://example.com/test/123 for more info',
    url: 'http://example.com/test/123',
  },
  {
    scenario: 'converts https URL to clickable link',
    given: 'visit https://example.com/test/123 now',
    url: 'https://example.com/test/123',
  },
  {
    scenario: 'preserves query parameters in URL links',
    given: 'here: https://example.com/test/123?q=123 done',
    url: 'https://example.com/test/123?q=123',
  },
]

const multipleUrlText = 'check both http://example.com and https://test.com/123'
const twitterUrl = 'https://x.com/kitten_beloved/status/1833901995704668474'
const twitterPath = 'kitten_beloved/status/1833901995704668474'

describe('URL Formatting', () => {
  describe('Standard URLs', () => {
    it.each(standardUrlTestCases)('$scenario', ({ given, url }) => {
      const expected = given.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
      expect(formatUrl(given)).toBe(expected)
    })

    it('converts multiple URLs in text to clickable links', () => {
      const expected = 'check both <a href="http://example.com" target="_blank">http://example.com</a> and <a href="https://test.com/123" target="_blank">https://test.com/123</a>'
      expect(formatUrl(multipleUrlText)).toBe(expected)
    })
  })

  describe('Twitter/X URLs', () => {
    it('shows mirror link first with original Twitter URL in parentheses', () => {
      const TWITTER_MIRROR_URL = import.meta.env.VITE_TWITTER_MIRROR_URL
      const input = `check this tweet: ${twitterUrl}`
      const expected = `check this tweet: <a href="${TWITTER_MIRROR_URL}/${twitterPath}" target="_blank">${TWITTER_MIRROR_URL}/${twitterPath}</a> (<a href="${twitterUrl}" target="_blank">${twitterUrl}</a>)`
      expect(formatUrl(input)).toBe(expected)
    })
  })

  describe('Edge Cases', () => {
    it('returns empty string for empty input', () => {
      expect(formatUrl('')).toBe('')
    })
  })
})
