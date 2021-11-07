
export type ColumnContentType = 'text' | 'link-outer' | 'link-inner'

/**
 * Represent single table column
 */
export type BaseColumn = {
  /**
   * Name of data property that contains value that should be displayed in the cell
   */
  param: string

  /**
   * Table column label parameters
   */
  label: {

    /**
     * Label text
     */
    text: string

    /**
     * Icon to be desplayed before label text
     */
    icon?: string
  },

  /**
   * Column content type
   */
  type: ColumnContentType
}

/**
 * Column which content type is outer link
 */
export type LinkOuterColumn = BaseColumn & {
  type: 'link-outer',
  hrefBase: string,
  target?: string
}

/**
 * Column which content type is link
 */
export type LinkInnerColumn = BaseColumn & {
  type: 'link-inner',
  routeName: string
}

/**
 * Column which content type is text
 */
export type TextColumn = BaseColumn & {
  type: 'text'
}

export type Column = TextColumn | LinkInnerColumn | LinkOuterColumn
