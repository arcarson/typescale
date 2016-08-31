const pxToRem = (pxValue, context) => `${parseInt(pxValue, 10) / context}rem`
const stripUnits = (value) => parseInt(value, 10)
const toPx = (int) => `${int}px`
const roundUpToNearestMultiple = (int, multiple) => Math.ceil(int / multiple) * multiple

const buildStyle = ({ fontStack, fontSize, lineHeight, fontWeight, spacingUnit }) => {
  return {
    fontSize: pxToRem(fontSize, spacingUnit),
    lineHeight: pxToRem(lineHeight, spacingUnit),
    fontWeight,
    margin: 0,
    fontFamily: fontStack,
  }
}

const generateHeadingElements = ({
  bodyFontSize,
  scale,
  spacingUnit,
  headingLineHeight,
  headingFontWeight,
  fontStack,
  headingElements = ['h5', 'h4', 'h3', 'h2', 'h1'],
} = {}) => {
  const styles = {}

  headingElements.forEach((element, i) => {
    const fontValue = stripUnits(bodyFontSize) * Math.pow(scale, i)
    const lineHeight = roundUpToNearestMultiple((fontValue * headingLineHeight), spacingUnit / 2)
    styles[element] = buildStyle({
      fontSize: toPx(fontValue),
      fontWeight: headingFontWeight,
      lineHeight,
      spacingUnit,
      fontStack,
    })
  })

  return styles
}

export default function setType({
  scale = 1.33,
  bodyFontSize = '16px',
  bodyLineHeight = 1.5,
  bodyFontWeight = 'normal',
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

  // Vertical rhythm unit
  const spacingUnit = (stripUnits(bodyFontSize) * bodyLineHeight) / 2

  const styles = generateHeadingElements({
    bodyFontSize,
    scale,
    headingLineHeight,
    headingFontWeight,
    fontStack,
    spacingUnit,
  })

  styles.html = {
    fontFamily: fontStack,
    fontSize: toPx(spacingUnit),
    lineHeight: bodyLineHeight,
  }

  styles.p = buildStyle({
    fontStack,
    fontSize: stripUnits(bodyFontSize),
    lineHeight: stripUnits(bodyFontSize) * bodyLineHeight,
    fontWeight: bodyFontWeight,
    spacingUnit,
  })

  styles.small = buildStyle({
    fontStack,
    fontSize: stripUnits(bodyFontSize) / scale,
    lineHeight: stripUnits(bodyFontSize) * bodyLineHeight,
    fontWeight: bodyFontWeight,
    spacingUnit,
  })

  return styles
}
