import { getConfig } from './index'

// Calculates the width of a span 1 col without spaces.
export default cols => {
  const config = getConfig()

  if (cols === 0) {
    return 0
  }

  const totalSpace = (config.cols - 1) * config.colSpace
  const space = (cols - 1) * config.colSpace
  // screenwidth - Screenpadding left and right - all space
  const singleColWidth = (config.width - totalSpace) / config.cols

  return singleColWidth * cols + space
}
