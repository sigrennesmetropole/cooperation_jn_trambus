import type { LineNumber } from '@/model/lines.model'
export type LineFigureTypes = 'station' | 'parking' | 'frequency'

export interface LineFigureModel {
  id: LineFigureTypes
  idLine: LineNumber
  figure: number
  unit?: string
  description: string
  icon?: string
  moreInformation?: string
}
