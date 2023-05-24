import Line1 from '@/assets/icons/line1.svg'
import Line2 from '@/assets/icons/line2.svg'
import Line3 from '@/assets/icons/line3.svg'
import Line4 from '@/assets/icons/line4.svg'

export class LinePlanningStateTypes {
  static readonly UNSTARTED = new LinePlanningStateTypes(
    'unStarted',
    'En étude',
    '#858585',
    '#bebebe'
  )
  static readonly UNDER_CONSTRUCTION = new LinePlanningStateTypes(
    'underConstruction',
    'En travaux',
    '#F43F5E',
    '#FDA4AF'
  )
  // static readonly CONSTRUCTION_FINISHED = new LinePlanningStateTypes(
  //   'constructionFinished',
  //   'Travaux finalisés',
  //   '#FACC15',
  //   '#FEF08A'
  // )
  static readonly COMMISIONING = new LinePlanningStateTypes(
    'commisioning',
    'En service',
    '#65A30D',
    '#BEF264'
  )

  private constructor(
    public readonly id: string,
    public readonly printValue: string,
    public readonly color: string,
    public readonly deemphasizedColor: string
  ) {}

  toString() {
    return this.printValue
  }
}

export class LineName {
  static readonly LINE_1 = new LineName('line1', 'Ligne 1', Line1)
  static readonly LINE_2 = new LineName('line2', 'Ligne 2', Line2)
  static readonly LINE_3 = new LineName('line3', 'Ligne 3', Line3)
  static readonly LINE_4 = new LineName('line4', 'Ligne 4', Line4)

  private constructor(
    public readonly id: string,
    public readonly printValue: string,
    public readonly img: string
  ) {}

  toString() {
    return this.printValue
  }
}
