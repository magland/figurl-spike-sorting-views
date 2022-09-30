import { isEqualTo, validateObject } from "@figurl/core-utils"

export type SortingCuration2ViewData = {
    type: 'SortingCuration2'
}

export const isSortingCuration2ViewData = (x: any): x is SortingCuration2ViewData => {
    return validateObject(x, {
        type: isEqualTo('SortingCuration2')
    })
}