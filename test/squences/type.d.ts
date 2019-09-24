import { HistoryBaseLocation } from '../../src/client'

export interface Step {
  (location?: HistoryBaseLocation): void
}

export interface Done {
  (...args: any[]): void
}

export interface Subscribe {
  (next: Function): Function
}