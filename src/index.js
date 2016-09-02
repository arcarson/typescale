const pxToRem = (pxValue, context) => `${parseInt(pxValue, 10) / context}rem`
const stripUnits = (value) => parseInt(value, 10)
const toPx = (int) => `${int}px`
const roundUpToNearestMultiple = (int, multiple) => Math.ceil(int / multiple) * multiple

const buildFontStack = (fontFamily) => {
  return `
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
    sans-serif
  `
}

const buildStyle = ({ fontFamily, fontSize, lineHeight, fontWeight, spacingUnit }) => {
  return {
    fontFamily: buildFontStack(fontFamily),
    fontSize: pxToRem(fontSize, spacingUnit),
    fontWeight,
    lineHeight: pxToRem(lineHeight, spacingUnit),
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  }
}

const generateHeadingElements = ({
  bodyFontSize,
  scale,
  spacingUnit,
  headingLineHeight,
  headingFontWeight,
  fontFamily,
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
      fontFamily,
    })
  })

  return styles
}

export default function setType({
  scale = 1.33,
  bodyFontSize = '16px',
  bodyLineHeight = 1.5,
  bodyFontWeight = 'normal',
  bodyFontFamily = undefined,
  headingLineHeight = 1.2,
  headingFontWeight = 'normal',
  headingFontFamily = undefined,
} = {}) {
  // Vertical rhythm unit
  const spacingUnit = (stripUnits(bodyFontSize) * bodyLineHeight) / 2

  const styles = generateHeadingElements({
    bodyFontSize,
    scale,
    headingLineHeight,
    headingFontWeight,
    fontFamily: headingFontFamily || bodyFontFamily,
    spacingUnit,
  })

  styles.html = {
    fontFamily: buildFontStack(bodyFontFamily),
    fontSize: toPx(spacingUnit),
    lineHeight: bodyLineHeight,
  }

  styles.p = buildStyle({
    fontFamily: bodyFontFamily,
    fontSize: stripUnits(bodyFontSize),
    lineHeight: stripUnits(bodyFontSize) * bodyLineHeight,
    fontWeight: bodyFontWeight,
    spacingUnit,
  })

  styles.small = buildStyle({
    fontFamily: bodyFontFamily,
    fontSize: stripUnits(bodyFontSize) / scale,
    lineHeight: stripUnits(bodyFontSize) * bodyLineHeight,
    fontWeight: bodyFontWeight,
    spacingUnit,
  })

  return styles
}
