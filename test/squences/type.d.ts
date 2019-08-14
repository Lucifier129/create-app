import CA from '../../src/'

export interface Step {
  (location?: CA.Location): void
}

export interface Done {
  (...args: any[]): void
}

export interface Subscribe {
  (next: Function): Function
}