export interface RouteMetric {
	id: string
	metric: string
	value: number
	share: number
}

export interface PredictResponse {
	metrics: RouteMetric[]
}

export const fetchPrediction = async (): Promise<PredictResponse> => {
	const response = await fetch('/mockData.json')

	if (!response.ok) {
		throw new Error('Failed to load prediction data')
	}

	return (await response.json()) as PredictResponse
}
