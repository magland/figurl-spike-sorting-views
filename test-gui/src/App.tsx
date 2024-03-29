import { MuiThemeProvider } from '@material-ui/core';
import { defaultUnitSelection, UnitMetricSelectionContext, unitMetricSelectionReducer, UnitSelectionContext, unitSelectionReducer } from './package';
import { getFigureData, SetupUrlState, startListeningToParent } from '@figurl/interface';
import { useWindowDimensions } from '@figurl/core-utils';
import { useEffect, useMemo, useReducer, useState } from 'react';
import './localStyles.css';
import theme from './theme';
import View from './View';
import { defaultTimeseriesSelection, TimeseriesSelectionContext, timeseriesSelectionReducer } from '@figurl/timeseries-views';
import SetupSortingCuration from './package/context-sorting-curation/SetupSortingCuration';
// import { SetupAnnotations } from 'libraries/context-annotations';

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

function App() {
  const [data, setData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  const [unitSelection, unitSelectionDispatch] = useReducer(unitSelectionReducer, defaultUnitSelection)
  const [timeseriesSelection, timeseriesSelectionDispatch] = useReducer(timeseriesSelectionReducer, defaultTimeseriesSelection)

  const [unitMetricSelection, unitMetricSelectionDispatch] = useReducer(unitMetricSelectionReducer, {})

  useEffect(() => {
    if (queryParams.test === '1') {
      // To test the Test1View without using the figurl parent
      // for example, with no internet connection,
      // use http://localhost:3000?test=1
      // setData({type: 'Test1'})
    }
    else {
      getFigureData().then((data: any) => {
        if (!data) {
          setErrorMessage(`No data returned by getFigureData()`)
          return
        }
        setData(data)
      }).catch((err: any) => {
        setErrorMessage(`Error getting figure data`)
        console.error(`Error getting figure data`, err)
      })
    }
  }, [])

  const opts = useMemo(() => ({}), [])

  if (!queryParams.figureId) {
    return (
      <div style={{padding: 20}}>
        <h2>This page is not being embedded as a figurl figure.</h2>
      </div>
    )
  }

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  return (
    <MuiThemeProvider theme={theme}>
      <TimeseriesSelectionContext.Provider value={{timeseriesSelection, timeseriesSelectionDispatch}}>
        <UnitSelectionContext.Provider value={{unitSelection, unitSelectionDispatch}}>
          <UnitMetricSelectionContext.Provider value={{unitMetricSelection, unitMetricSelectionDispatch}}>
          {/* <SetupAnnotations> */}
            <SetupUrlState>
              <SetupSortingCuration>
                <View
                  data={data}
                  opts={opts}
                  width={width - 10}
                  height={height - 5}
                />
              </SetupSortingCuration>
            </SetupUrlState>
          {/* </SetupAnnotations> */}
          </UnitMetricSelectionContext.Provider>
        </UnitSelectionContext.Provider>
      </TimeseriesSelectionContext.Provider>
    </MuiThemeProvider>
  )
}

startListeningToParent()

export default App;

