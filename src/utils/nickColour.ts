export const calculateNickColour = (nick: string): number => {
  if (!nick) return 1
  const sum = Array.from(nick).reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0)
  return (sum % 16) + 1
}
