const roundUpHalf = (number) => {
  return Math.ceil(number * 2) / 2
}

const calcLineHeight = (fontSize, lineHeightRatio) => {
  return roundUpHalf(fontSize * lineHeightRatio)
}

const fontStyle = (fontFamily, fontSize, lineHeight, fontWeight) => {
  return {
    fontFamily,
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
  fontFamily,
  headingElements = ['h5', 'h4', 'h3', 'h2', 'h1'],
} = {}) => {
  const styles = {}

  headingElements.forEach((element, i) => {
    const fontSize = 1 * Math.pow(scale, i)
    const lineHeight = calcLineHeight(fontSize, headingLineHeight)
    styles[element] = fontStyle(fontFamily, fontSize, lineHeight, headingFontWeight)
  })

  return styles
}

export default function setType({
  baseFontSize = '16px',
  scale = 1.33,
  bodyLineHeight = 1.5,
  headingLineHeight = 1.2,
  headingFontWeight = 'normal',
  fontFamily = `
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
    sans-serif
  `,
} = {}) {
  const styles = generateHeadingElements({
    scale,
    headingLineHeight,
    headingFontWeight,
    fontFamily,
  })

  styles.html = {
    fontFamily,
    fontSize: baseFontSize,
    lineHeight: bodyLineHeight,
  }
  styles.p = fontStyle(fontFamily, 1, bodyLineHeight, 'normal')
  styles.small = fontStyle(fontFamily, (1 / scale), bodyLineHeight, 'normal')

  return styles
}
