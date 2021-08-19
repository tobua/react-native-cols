import { getConfig } from './../utils/config'

// Get the width of a col by span including the covered space.
export default (span) => {
  const config = getConfig()

  if (span === 0) {
    return 0
  }

  const generalColSpace = (config.cols - 1) * config.colSpace
  const coveredColSpace = (span - 1) * config.colSpace
  const singleColWidth = (config.width - generalColSpace) / config.cols

  return singleColWidth * span + coveredColSpace
}
