export function formatChannelName(channel: string): string {
  const hashCount = (channel.match(/^\++/) || [''])[0].length
  return hashCount ? '#'.repeat(hashCount) + channel.slice(hashCount) : channel
}
