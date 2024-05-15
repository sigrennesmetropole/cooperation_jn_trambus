import type { LineNumber } from '@/model/lines.model'
import type { BusNumber } from '@/model/bus.model'

export function getColorLine(
  colorType: String,
  lineNumber: LineNumber,
  variant: Number | string
): string {
  const key = `T${lineNumber}-${variant}`
  return `${colorType}-${key}`
}
export const busColors: Record<BusNumber, String> = {
  C1: 'lime-500', // #95C11E
  C2: 'sky-600', // #008BD2
  C3: 'yellow-400', // #FFCC00
  C4: 'fuchsia-900', // #6F2282
  C5: 'amber-500', // #F39200
  C6: 'cyan-400', // #61C3D9
  C7: 'yellow-600', // #D39D2F
  C7ex: 'yellow-800', // #D39D2F
}

export function getColorBus(colorType: String, busNumber: BusNumber): string {
  return `${colorType}-${busColors[busNumber]}`
}
