import { fetchPrediction, type RouteMetric } from '../api/predict'
import { DEFAULT_WEIGHT_VALUES, type WeightKey } from '../constants/inputBar'
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react'

export interface InputBarWeights {
	fuel: number
	blackCarbon: number
	noise: number
	risk: number
}

export interface InputBarState {
	departure: string
	destination: string
	vesselType: string
	vesselSize: string
	weights: InputBarWeights
}

interface InputBarContextValue extends InputBarState {
	metrics: RouteMetric[]
	loading: boolean
	setDeparture: (value: string) => void
	setDestination: (value: string) => void
	setVesselType: (value: string) => void
	setVesselSize: (value: string) => void
	setWeight: (key: WeightKey, value: number) => void
	resetInputs: () => void
	generateResults: () => Promise<void>
}

const DEFAULT_STATE: InputBarState = {
	departure: '',
	destination: '',
	vesselType: '',
	vesselSize: '',
	weights: { ...DEFAULT_WEIGHT_VALUES },
}

const InputBarContext = createContext<InputBarContextValue | undefined>(undefined)

export const InputBarProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<InputBarState>(DEFAULT_STATE)
	const [metrics, setMetrics] = useState<RouteMetric[]>([])
	const [loading, setLoading] = useState(false)

	const setDeparture = useCallback((value: string) => {
		setState((prev) => ({ ...prev, departure: value }))
	}, [])

	const setDestination = useCallback((value: string) => {
		setState((prev) => ({ ...prev, destination: value }))
	}, [])

	const setVesselType = useCallback((value: string) => {
		setState((prev) => ({ ...prev, vesselType: value }))
	}, [])

	const setVesselSize = useCallback((value: string) => {
		setState((prev) => ({ ...prev, vesselSize: value }))
	}, [])

	const setWeight = useCallback((key: WeightKey, value: number) => {
		setState((prev) => ({
			...prev,
			weights: {
				...prev.weights,
				[key]: value,
			},
		}))
	}, [])

	const generateResults = useCallback(async () => {
		if (loading) {
			return
		}
		try {
			setLoading(true)
			const data = await fetchPrediction()
			setMetrics(data.metrics)
		} catch (error) {
			console.error(error)
			setMetrics([])
		} finally {
			setLoading(false)
		}
	}, [loading, setLoading, setMetrics])

	const resetInputs = useCallback(() => {
		setState({
			...DEFAULT_STATE,
			weights: { ...DEFAULT_WEIGHT_VALUES },
		})
		setMetrics([])
	}, [setState, setMetrics])

	const contextValue = useMemo<InputBarContextValue>(
		() => ({
			...state,
			metrics,
			loading,
			setDeparture,
			setDestination,
			setVesselType,
			setVesselSize,
			setWeight,
			resetInputs,
			generateResults,
		}),
		[state, metrics, loading, setDeparture, setDestination, setVesselType, setVesselSize, setWeight, resetInputs, generateResults],
	)

	return <InputBarContext.Provider value={contextValue}>{children}</InputBarContext.Provider>
}

export const useInputBarContext = () => {
	const context = useContext(InputBarContext)

	if (!context) {
		throw new Error('useInputBarContext must be used within an InputBarProvider')
	}

	return context
}

export const useInputWeights = () => {
	const { weights, setWeight } = useInputBarContext()
	return { weights, setWeight }
}

