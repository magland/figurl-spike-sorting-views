import { FunctionComponent } from "react"
import { ViewComponentProps } from "./core-view-component-props"
import { AutocorrelogramsView, isAutocorrelogramsViewData } from "./view-autocorrelograms"
import { AverageWaveformsView, isAverageWaveformsViewData } from "./view-average-waveforms"
import { ConfusionMatrixView, isConfusionMatrixViewData } from "./view-confusion-matrix"
import { CrossCorrelogramsView, isCrossCorrelogramsViewData } from "./view-cross-correlograms"
import { ElectrodeGeometryView, isElectrodeGeometryViewData } from "./view-electrode-geometry"
import { isLiveCrossCorrelogramsViewData, LiveCrossCorrelogramsView } from "./view-live-cross-correlograms"
import { isRasterPlotViewData, RasterPlotView } from "./view-raster-plot"
import { isSortingCuration2ViewData, SortingCuration2View } from "./view-sorting-curation-2"
import { isSpikeAmplitudesViewData, SpikeAmplitudesView } from "./view-spike-amplitudes"
import { isSpikeLocationsViewData, SpikeLocationsView } from "./view-spike-locations"
import { isUnitLocationsViewData, UnitLocationsView } from "./view-unit-locations"
import { isUnitMetricsGraphViewData, UnitMetricsGraphView } from "./view-unit-metrics-graph"
import { isUnitSimilarityMatrixViewData, UnitSimilarityMatrixView } from "./view-unit-similarity-matrix"
import { isUnitsTableViewData, UnitsTableView } from "./view-units-table"

const loadView = (o: {data: any, width: number, height: number, opts: any, ViewComponent: FunctionComponent<ViewComponentProps>}) => {
    const {data, width, height} = o
    if (isAutocorrelogramsViewData(data)) {
        return <AutocorrelogramsView data={data} width={width} height={height} />
    }
    else if (isAverageWaveformsViewData(data)) {
        return <AverageWaveformsView data={data} width={width} height={height} />
    }
    else if (isConfusionMatrixViewData(data)) {
        return <ConfusionMatrixView data={data} width={width} height={height} />
    }
    else if (isCrossCorrelogramsViewData(data)) {
        return <CrossCorrelogramsView data={data} width={width} height={height} />
    }
    else if (isElectrodeGeometryViewData(data)) {
        return <ElectrodeGeometryView data={data} width={width} height={height} />
    }
    else if (isLiveCrossCorrelogramsViewData(data)) {
        return <LiveCrossCorrelogramsView data={data} width={width} height={height} />
    }
    else if (isRasterPlotViewData(data)) {
        return <RasterPlotView data={data} width={width} height={height} />
    }
    else if (isSortingCuration2ViewData(data)) {
        return <SortingCuration2View data={data} width={width} height={height} />
    }
    else if (isSpikeAmplitudesViewData(data)) {
        return <SpikeAmplitudesView data={data} width={width} height={height} />
    }
    else if (isSpikeLocationsViewData(data)) {
        return <SpikeLocationsView data={data} width={width} height={height} />
    }
    else if (isUnitLocationsViewData(data)) {
        return <UnitLocationsView data={data} width={width} height={height} />
    }
    else if (isUnitMetricsGraphViewData(data)) {
        return <UnitMetricsGraphView data={data} width={width} height={height} />
    }
    else if (isUnitSimilarityMatrixViewData(data)) {
        return <UnitSimilarityMatrixView data={data} width={width} height={height} />
    }
    else if (isUnitsTableViewData(data)) {
        return <UnitsTableView data={data} width={width} height={height} />
    }
    else return undefined
}

export default loadView