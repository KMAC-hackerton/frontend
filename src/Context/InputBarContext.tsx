import { fetchPrediction, type RouteMetric, type PredictionRequest } from '../api/predict'
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
	risk: number
}

export interface InputBarState {
	due_date: number
	departure_lat: string
	departure_lon: string
	destination_lat: string
	destination_lon: string
	iceClass: string
	fuelType: string
	weights: InputBarWeights
}

interface InputBarContextValue extends InputBarState {
	metrics: RouteMetric[]
	imageUrl: string | null
	loading: boolean
	setDueDate: (value: number) => void
	setDepartureLat: (value: string) => void
	setDepartureLon: (value: string) => void
	setDestinationLat: (value: string) => void
	setDestinationLon: (value: string) => void
	setIceClass: (value: string) => void
	setFuelType: (value: string) => void
	setWeight: (key: WeightKey, value: number) => void
	resetInputs: () => void
	generateResults: () => Promise<void>
}

const DEFAULT_STATE: InputBarState = {
	due_date: 122,
	departure_lat: '',
	departure_lon: '',
	destination_lat: '',
	destination_lon: '',
	iceClass: '',
	fuelType: '',
	weights: { ...DEFAULT_WEIGHT_VALUES },
}

const InputBarContext = createContext<InputBarContextValue | undefined>(undefined)

export const InputBarProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<InputBarState>(DEFAULT_STATE)
	const [metrics, setMetrics] = useState<RouteMetric[]>([])
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)


	const setDueDate = useCallback((value: number) => {
		setState((prev) => ({ ...prev, due_date: value }))
	}, [])

	const setDepartureLat = useCallback((value: string) => {
		setState((prev) => ({ ...prev, departure_lat: value }))
	}, [])

	const setDepartureLon = useCallback((value: string) => {
		setState((prev) => ({ ...prev, departure_lon: value }))
	}, [])

	const setDestinationLat = useCallback((value: string) => {
		setState((prev) => ({ ...prev, destination_lat: value }))
	}, [])

	const setDestinationLon = useCallback((value: string) => {
		setState((prev) => ({ ...prev, destination_lon: value }))
	}, [])

	const setIceClass = useCallback((value: string) => {
		setState((prev) => ({ ...prev, iceClass: value }))
	}, [])

	const setFuelType = useCallback((value: string) => {
		setState((prev) => ({ ...prev, fuelType: value }))
	}, [])

	const setWeight = useCallback((key: WeightKey, value: number) => {
		setState((prev) => {
			const oldValue = prev.weights[key]
			const diff = value - oldValue
			
			// 나머지 두 개의 키를 찾기
			const otherKeys = (['fuel', 'blackCarbon', 'risk'] as WeightKey[]).filter(k => k !== key)
			
			const halfDiff = diff / 2
			const newWeights = {
				...prev.weights,
				[key]: value,
				[otherKeys[0]]: Math.max(0, Math.min(100, prev.weights[otherKeys[0]] - halfDiff)),
				[otherKeys[1]]: Math.max(0, Math.min(100, prev.weights[otherKeys[1]] - halfDiff)),
			}
			
			// 합이 정확히 100이 되도록 미세 조정
			const sum = newWeights[otherKeys[0]] + newWeights[otherKeys[1]] + newWeights[key]
			if (sum !== 100) {
				const adjustment = (100 - sum) / 2
				newWeights[otherKeys[0]] = Math.max(0, Math.min(100, newWeights[otherKeys[0]] + adjustment))
				newWeights[otherKeys[1]] = Math.max(0, Math.min(100, newWeights[otherKeys[1]] + adjustment))
			}
			
			return {
				...prev,
				weights: newWeights,
			}
		})
	}, [])

	const generateResults = useCallback(async () => {
		if (loading) {
			return
		}
		
		try {
			setLoading(true)
			
			// Context state를 API 요청 형식으로 변환
			const requestData: PredictionRequest = {
				t_start_idx: 0,
				t_goal_idx: state.due_date,
				lat_start: parseFloat(state.departure_lat) || 0,
				lon_start: parseFloat(state.departure_lon) || 0,
				lat_goal: parseFloat(state.destination_lat) || 0,
				lon_goal: parseFloat(state.destination_lon) || 0,
				BCF: parseFloat(state.iceClass) || 0, // iceClass를 숫자로 변환
				fuel_type: state.fuelType,
				w_fuel: state.weights.fuel,
				w_bc: state.weights.blackCarbon,
				w_risk: state.weights.risk,
			}
		console.log('Request Data:', requestData)
		const data = await fetchPrediction(requestData)
		console.log('Response Data:', data)
		setMetrics(data.cost_summary)
		setImageUrl(data.imageUrl)
		} catch (error) {
			console.error('Failed to generate results:', error)
			setMetrics([])
			setImageUrl(null)
		} finally {
			setLoading(false)
		}
	}, [loading, state])

	const resetInputs = useCallback(() => {
		setState({
			...DEFAULT_STATE,
			weights: { ...DEFAULT_WEIGHT_VALUES },
		})
		setMetrics([])
		setImageUrl(null)
	}, [])

	const contextValue = useMemo<InputBarContextValue>(
		() => ({
			...state,
			metrics,
			imageUrl,
			loading,
			setDueDate,
			setDepartureLat,
			setDepartureLon,
			setDestinationLat,
			setDestinationLon,
			setIceClass,
			setFuelType,
			setWeight,
			resetInputs,
			generateResults,
		}),
		[
			state,
			metrics,
			imageUrl,
			loading,
			setDueDate,
			setDepartureLat,
			setDepartureLon,
			setDestinationLat,
			setDestinationLon,
			setIceClass,
			setFuelType,
			setWeight,
			resetInputs,
			generateResults,
		],
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