const CHAR_MAX = 25
const BREAK_LINE_TOLERANCE = 10
export function shorterName(poiName: string) {
  let shorterName = poiName.replace("'", ' ')
  if (poiName.length > CHAR_MAX) {
    shorterName = shorterName.slice(0, CHAR_MAX).concat('...')
  }
  return shorterName
}

export function splitName(full_name: string) {
  if (full_name.length <= CHAR_MAX) {
    return full_name
  }

  let name = full_name.slice(0, CHAR_MAX)
  const spaceIndex = name.lastIndexOf(' ')

  if (
    spaceIndex !== -1 &&
    spaceIndex >= CHAR_MAX - BREAK_LINE_TOLERANCE &&
    spaceIndex <= CHAR_MAX + BREAK_LINE_TOLERANCE
  ) {
    name = name.slice(0, spaceIndex)
  }

  return name + '\n' + full_name.slice(name.length).trim()
}
