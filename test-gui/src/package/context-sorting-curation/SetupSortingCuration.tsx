import { FunctionComponent, PropsWithChildren, useMemo, useReducer } from "react";
import SortingCurationContext, { sortingCurationReducer } from './SortingCurationContext';

type Props = {
}

const SetupSortingCuration: FunctionComponent<PropsWithChildren<Props>> = ({children}) => {
    const [sortingCuration, sortingCurationDispatch] = useReducer(sortingCurationReducer, {})
    const value = useMemo(() => (
        {sortingCuration, sortingCurationDispatch}
    ), [sortingCuration, sortingCurationDispatch])

    return (
        <SortingCurationContext.Provider value={value}>
            {children}
        </SortingCurationContext.Provider>
    )
}

export default SetupSortingCuration