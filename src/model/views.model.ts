export type View = 'home' | 'station' | 'line' | 'traveltimes' | 'consultation'

export const viewList: Record<View, View> = {
  home: 'home',
  station: 'station',
  line: 'line',
  traveltimes: 'traveltimes',
  consultation: 'consultation',
}
