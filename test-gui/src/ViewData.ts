import { isOneOf } from '@figurl/core-utils'
import { AutocorrelogramsViewData, isAutocorrelogramsViewData } from "./package"
import { MainLayoutViewData, isMainLayoutViewData } from '@figurl/core-views'

export type ViewData =
    AutocorrelogramsViewData |
    MainLayoutViewData

export const isViewData = (x: any): x is ViewData => {
    return isOneOf([
        isAutocorrelogramsViewData,
        isMainLayoutViewData
    ])(x)
}