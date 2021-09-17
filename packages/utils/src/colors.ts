export const colors = [
  '#FC5C54',
  '#FFD95A',
  '#E95D72',
  '#6A87C8',
  '#5FD0F3',
  '#75C06B',
  '#FFDD86',
  '#5FC6D4',
  '#FF949A',
  '#FF8024',
  '#9BA1A4',
  '#EC66FF',
  '#FF8CBC',
  '#FF9A23',
  '#C5DADB',
  '#A8CE63',
  '#71ABFF',
  '#FFE279',
  '#B6B1B6',
  '#FF6780',
  '#A575FF',
  '#4D82FF',
  '#FFB35A'
]

export const avatarColor = [
  '#FF494A', // '255, 73, 74'
  '#01D3FF', // '2, 211, 255'
  '#FB60C4', // '251, 96, 196'
  '#3F6AFF', // '63, 106, 255'
  '#FFD963', // '255, 217, 99'
  '#B140FF', // '177, 64, 255'
  '#41EBC1', // '64, 235, 193'
  '#F46E38',
  '#6D7E8F' // '109, 126, 143'
]

// avatars groups emojis with their respective color backgrounds in the `avatarBackgrounds` object in colors.js
export const avatars = [
  { emoji: '🌶', colorIndex: 0 },
  { emoji: '🤑', colorIndex: 1 },
  { emoji: '🐙', colorIndex: 2 },
  { emoji: '🫐', colorIndex: 3 },
  { emoji: '🐳', colorIndex: 4 },
  { emoji: '🤶', colorIndex: 0 },
  { emoji: '🌲', colorIndex: 5 },
  { emoji: '🌞', colorIndex: 6 },
  { emoji: '🐒', colorIndex: 7 },
  { emoji: '🐵', colorIndex: 8 },
  { emoji: '🦊', colorIndex: 9 },
  { emoji: '🐼', colorIndex: 10 },
  { emoji: '🦄', colorIndex: 11 },
  { emoji: '🐷', colorIndex: 12 },
  { emoji: '🐧', colorIndex: 13 },
  { emoji: '🦩', colorIndex: 8 },
  { emoji: '👽', colorIndex: 14 },
  { emoji: '🎈', colorIndex: 0 },
  { emoji: '🍉', colorIndex: 8 },
  { emoji: '🎉', colorIndex: 1 },
  { emoji: '🐲', colorIndex: 15 },
  { emoji: '🌎', colorIndex: 16 },
  { emoji: '🍊', colorIndex: 17 },
  { emoji: '🐭', colorIndex: 18 },
  { emoji: '🍣', colorIndex: 19 },
  { emoji: '🐥', colorIndex: 1 },
  { emoji: '👾', colorIndex: 20 },
  { emoji: '🥦', colorIndex: 15 },
  { emoji: '👹', colorIndex: 0 },
  { emoji: '🙀', colorIndex: 17 },
  { emoji: '⛱', colorIndex: 4 },
  { emoji: '⛵️', colorIndex: 21 },
  { emoji: '🥳', colorIndex: 17 },
  { emoji: '🤯', colorIndex: 8 },
  { emoji: '🤠', colorIndex: 22 }
]

export const popularEmojis = avatars.map((avatar) => avatar.emoji)
export const emojiColorIndexes = avatars.map((avatar) => avatar.colorIndex)
const emojiCount = avatars.length

export function hashCode(text: string) {
  let hash = 0,
    i,
    chr
  if (text.length === 0) return hash
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash
}

export function addressHashedIndex(address: string) {
  if (address == null) return null
  return Math.abs(hashCode(address.toLowerCase()) % emojiCount)
}

export function addressHashedColorIndex(address: string) {
  if (address == null) return null
  return emojiColorIndexes[Math.abs(hashCode(address.toLowerCase()) % emojiCount)]
}

export function addressHashedEmoji(address: string) {
  const index = addressHashedIndex(address)
  if (index == null) return null
  return popularEmojis[index]
}

export function colorHexToIndex(colorHex: string | null) {
  if (!colorHex) return 0
  if (colors.includes(colorHex)) {
    return colors.indexOf(colorHex)
  }
  return 0
}
