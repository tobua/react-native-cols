import { getConfig } from './index'
import getColWidth from './get-col-width'

// Calculates the left margin necessary inclucing offset margin.
export const calculateMarginLeft = (position, offset = 0) => {
  const config = getConfig()

  const spacer = position > 0 ? config.colSpace / 2 : 0
  const colSpace = offset > 0 ? config.colSpace : 0 // Other offset included in getColWidth
  return getColWidth(offset) + colSpace + spacer
}

// Calculates the margin necessary on the right.
export const calculateMarginRight = position => {
  const config = getConfig()

  position < config.cols ? config.colSpace / 2 : 0
}
