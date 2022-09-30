import { getFileData, storeFileData, useUrlState } from "@figurl/interface";
import { Button } from "@material-ui/core";
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SortingCuration, useSortingCuration } from "../context-sorting-curation";

type Props ={
}

const SaveControl: FunctionComponent<Props> = () => {
	const {sortingCuration, sortingCurationDispatch} = useSortingCuration()

    const {urlState, updateUrlState} = useUrlState()

	const uri = useMemo(() => (urlState['sortingCuration']), [urlState])

	const [saving, setSaving] = useState<boolean>(false)

	const handleSaveSnapshot = useCallback(() => {
		if (!sortingCuration) return
		const x = JSONStringifyDeterministic(sortingCuration)
		setSaving(true)
		;(async () => {
			try {
				const uri = await storeFileData(x)
				updateUrlState({sortingCuration: uri})
			}
			finally {
				setSaving(false)
			}
		})()
	}, [updateUrlState, sortingCuration])

    ///////////////////////////////////////////////////////////////
	const first = useRef<boolean>(true)
	useEffect(() => {
		if (!first.current) return
		if (!sortingCurationDispatch) return
		const uri = (urlState.sortingCuration || '') as string
		if (uri) {
			getFileData(uri, () => {}).then((x) => {
				if (!x) {
					console.warn('Empty curation state')
					return
				}
				sortingCurationDispatch({type: 'SET_CURATION', curation: x as any as SortingCuration})
			}).catch((err: Error) => {
				console.warn('Problem getting sorting curation state')
				console.warn(err)
			})
		}
		first.current = false
	}, [urlState.sortingCuration, first, sortingCurationDispatch])

	return (
		<div>
			<p>URI: {uri}</p>
			<div>
				<Button disabled={saving} onClick={handleSaveSnapshot}>Save as snapshot</Button>
			</div>
		</div>
	)
}

// Thanks: https://stackoverflow.com/questions/16167581/sort-object-properties-and-json-stringify
export const JSONStringifyDeterministic = ( obj: Object, space: string | number | undefined =undefined ) => {
    var allKeys: string[] = [];
    JSON.stringify( obj, function( key, value ){ allKeys.push( key ); return value; } )
    allKeys.sort();
    return JSON.stringify( obj, allKeys, space );
}

export default SaveControl
