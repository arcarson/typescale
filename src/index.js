const roundUpHalf = (number) => {
  return Math.ceil(number * 2) / 2
}

const calcLineHeight = (fontSize, lineHeightRatio) => {
  return roundUpHalf(fontSize * lineHeightRatio)
}

const fontStyle = (fontStack, fontSize, lineHeight, fontWeight) => {
  return {
    fontFamily: fontStack,
    fontSize: `${fontSize}rem`,
    fontWeight,
    lineHeight: `${lineHeight}rem`,
    margin: 0,
  }
}

const generateHeadingElements = ({
  scale,
  headingLineHeight,
  headingFontWeight,
  fontStack,
  headingElements = ['h5', 'h4', 'h3', 'h2', 'h1'],
} = {}) => {
  const styles = {}

  headingElements.forEach((element, i) => {
    const fontSize = 1 * Math.pow(scale, i)
    const lineHeight = calcLineHeight(fontSize, headingLineHeight)
    styles[element] = fontStyle(fontStack, fontSize, lineHeight, headingFontWeight)
  })

  return styles
}

export default function setType({
  baseFontSize = '16px',
  scale = 1.33,
  bodyLineHeight = 1.5,
  headingLineHeight = 1.2,
  headingFontWeight = 'normal',
  fontFamily,
} = {}) {
  const fontStack = `
    ${fontFamily},
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif`

  const styles = generateHeadingElements({
    scale,
    headingLineHeight,
    headingFontWeight,
    fontStack,
  })

  styles.html = {
    fontFamily: fontStack,
    fontSize: baseFontSize,
    lineHeight: bodyLineHeight,
  }
  styles.p = fontStyle(fontStack, 1, bodyLineHeight, 'normal')
  styles.small = fontStyle(fontStack, (1 / scale), bodyLineHeight, 'normal')

  return styles
}
