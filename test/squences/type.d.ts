import { Location } from '../../src/share/constant'

export interface Step {
  (location?: Location): void
}

export interface Done {
  (...args: any[]): void
}

export interface Subscribe {
  (next: Function): Function
}