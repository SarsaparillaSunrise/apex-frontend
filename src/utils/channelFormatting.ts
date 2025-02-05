export const decodeChannelName = (channel: string): string => {
  const prefix = channel.match(/^\+*/)[0]
  return '#'.repeat(prefix.length) + channel.slice(prefix.length)
}
