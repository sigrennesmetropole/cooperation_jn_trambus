import { describe, it, expect } from 'vitest'

import { shorterName, splitName } from '@/helpers/nameFormatHelper'

describe('NameFormatHelper', () => {
  describe('#shorterName', () => {
    it('short when more than 20 chars', () => {
      const nameTooLong = 'THIS_NAME_IS_REALLY_TOO_LONG'
      const shortName = shorterName(nameTooLong)
      expect(shortName).toBe('THIS_NAME_IS_REALLY_TOO_L...')
    })
    it('does not short when less than 20 chars', () => {
      const nameOk = 'SHORT_ENOUGH'
      const shortName = shorterName(nameOk)
      expect(shortName).toBe(nameOk)
    })
  })
  describe('#splitName', () => {
    it('short when more than 20 chars', () => {
      const nameTooLong = 'THIS NAME IS REALLY TOO LONG'
      const shortName = splitName(nameTooLong)
      expect(shortName).toBe('THIS NAME IS REALLY TOO\nLONG')
    })
    it('does not short when less than 20 chars', () => {
      const nameOk = 'SHORT_ENOUGH'
      const shortName = splitName(nameOk)
      expect(shortName).toBe(nameOk)
    })
  })
})
