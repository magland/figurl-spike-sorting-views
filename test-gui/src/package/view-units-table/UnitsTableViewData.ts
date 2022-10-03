import { validateObject } from "@figurl/core-utils"
import { isString, isArrayOf, isEqualTo, isNumber, isOneOf } from "@figurl/core-utils"

type UTColumn = {
    key: string
    label: string
    dtype: string
}

const isUTColumn = (x: any): x is UTColumn => {
    return validateObject(x, {
        key: isString,
        label: isString,
        dtype: isString
    })
}

type UTRow = {
    unitId: number | string
    values: {[key: string]: any}
}

const isUTRow = (x: any): x is UTRow => {
    return validateObject(x, {
        unitId: isOneOf([isNumber, isString]),
        values: () => (true)
    })
}

export type UnitsTableViewData = {
    type: 'UnitsTable'
    columns: UTColumn[]
    rows: UTRow[]
}

export const isUnitsTableViewData = (x: any): x is UnitsTableViewData => {
    return validateObject(x, {
        type: isEqualTo('UnitsTable'),
        columns: isArrayOf(isUTColumn),
        rows: isArrayOf(isUTRow)
    })
}