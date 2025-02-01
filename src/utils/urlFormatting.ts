export const formatUrl = (text: string): string => {
  if (!text) return ''

  const urlPattern = /(https?:\/\/[^\s<]+)/g
  const twitterPattern = /^https?:\/\/(twitter\.com|x\.com)\/(.+)/

  return text.replace(urlPattern, (url) => {
    const twitterUrl = url.match(twitterPattern)
    if (twitterUrl) {
      const TWITTER_MIRROR_URL = import.meta.env.VITE_TWITTER_MIRROR_URL
      const [, , path] = twitterUrl
      const mirrorUrl = `${TWITTER_MIRROR_URL}/${path}`
      return `<a href="${mirrorUrl}" target="_blank">${mirrorUrl}</a> (<a href="${url}" target="_blank">${url}</a>)`
    }
    return `<a href="${url}" target="_blank">${url}</a>`
  })
}
