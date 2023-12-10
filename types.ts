import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export interface Config {
  width: number
  cols: number
  colSpace: number
  rowSpace: number
  debug: boolean
  padding?: number
}

export interface ColPosition {
  width: number
  marginLeft: number
  marginRight: number
  marginBottom: number
}

export interface ColProps {
  span?: number | string
  offset?: number
  left?: boolean
  center?: boolean
  right?: boolean
  style?: StyleProp<ViewStyle>
  children: ReactNode
}
