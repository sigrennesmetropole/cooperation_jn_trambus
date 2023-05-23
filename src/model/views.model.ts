
export type View = 'home' | 'station' | 'line' | 'traveltimes' | 'legalnotice' | 'consultation'

export const viewList: Record<View, View> = {
  home: 'home',
  station: 'station',
  line: 'line',
  traveltimes: 'traveltimes',
  legalnotice: 'legalnotice',
  consultation: 'consultation',
}
