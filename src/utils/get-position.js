export default ({ left, center, right }) => {
  if (left) {
    return 'flex-start'
  }
  if (center) {
    return 'center'
  }
  if (right) {
    return 'flex-end'
  }
  return 'stretch'
}
