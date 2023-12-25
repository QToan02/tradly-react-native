const formatCardNumber = (input: string): string => {
  if (input.length <= 4) return input

  const replaced: string = input.slice(0, 6) + '*'.repeat(6) + input.slice(12)
  const splitted: RegExpMatchArray | null = replaced.match(/.{1,4}/g)

  if (!splitted) return input
  const formatted = splitted.join(' ').trim()

  return formatted
}

export default formatCardNumber
