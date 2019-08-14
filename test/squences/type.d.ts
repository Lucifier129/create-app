import CA from '../../src/share/types'

export interface Step {
  (location?: CA.Location): void
}

export interface Done {
  (...args: any[]): void
}

export interface Subscribe {
  (next: Function): Function
}