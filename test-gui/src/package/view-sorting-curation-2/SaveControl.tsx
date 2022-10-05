import { randomAlphaString } from '@figurl/core-utils';
import { Hyperlink } from '@figurl/core-views';
import { getFileData, storeFileData, useSignedIn, useUrlState } from "@figurl/interface";
import { Button } from "@material-ui/core";
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SortingCuration, useSortingCuration } from "../context-sorting-curation";

type Props ={
}

const SaveControl: FunctionComponent<Props> = () => {
	const {sortingCuration, sortingCurationDispatch} = useSortingCuration()

    const {urlState, updateUrlState} = useUrlState()

	const [errorString, setErrorString] = useState<string>('')

	const uri = useMemo(() => (urlState['sortingCuration']), [urlState])

	const [saving, setSaving] = useState<boolean>(false)

	const {userId} = useSignedIn()

	const handleSaveSnapshot = useCallback(() => {
		if (!sortingCuration) return
		const x = JSONStringifyDeterministic(sortingCuration)
		setSaving(true)
		setErrorString('')
		;(async () => {
			try {
				const uri = await storeFileData(x)
				updateUrlState({sortingCuration: uri})
			}
			catch(err: any) {
				setErrorString(`Problem saving file data: ${err.message}`)
			}
			finally {
				setSaving(false)
			}
		})()
	}, [updateUrlState, sortingCuration])

	const handleSaveJot = useCallback((o: {new?: boolean}={}) => {
		if (!sortingCuration) return
		const uri: string | undefined = urlState.sortingCuration
		const jotId = uri && uri.startsWith('jot://') && (!o.new) ? uri.split('?')[0].split('/')[2] : randomAlphaString(12)
		const x = JSONStringifyDeterministic(sortingCuration)
		setSaving(true)
		setErrorString('')
		;(async () => {
			try {
				await storeFileData(x, {jotId})
				updateUrlState({sortingCuration: `jot://${jotId}`})
			}
			catch(err: any) {
				setErrorString(`Problem saving file data: ${err.message}`)
			}
			finally {
				setSaving(false)
			}
		})()
	}, [urlState.sortingCuration, sortingCuration, updateUrlState])

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

	const uriStartsWithJot = (urlState.sortingCuration || '').startsWith('jot://')
	const jotId = uriStartsWithJot ? urlState.sortingCuration.split('?')[0].split('/')[2] : ''
	const buttonStyle: React.CSSProperties = useMemo(() => ({textTransform: 'none'}), [])

	return (
		<div>
			<p>URI: {uri}</p>
			<div>
				{
					uriStartsWithJot && (
						<span>
							<Button style={buttonStyle} disabled={saving || !userId || (!uriStartsWithJot)} onClick={() => handleSaveJot({new: false})}>Save as {uri}</Button>
							{userId && <Hyperlink href={`https://jot.figurl.org/jot/${jotId}`} target="_blank">manage</Hyperlink>}
						</span>
					)
				}
				<br />
				<Button style={buttonStyle} disabled={saving} onClick={handleSaveSnapshot}>Save as snapshot</Button>
				<br />
				<Button style={buttonStyle} disabled={saving || !userId} onClick={() => handleSaveJot({new: true})}>Save as new jot</Button>
				<br />
				{
					saving && 'Saving...'
				}
				{
					!userId && <span style={{fontStyle: 'italic', color: 'gray'}}>You are not signed in</span>
				}
			</div>
			{errorString && <div style={{color: 'red'}}>{errorString}</div>}
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
