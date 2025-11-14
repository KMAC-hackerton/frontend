const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export interface RouteMetric {
	Metric: string,
	Value: Number,
	Unit: string
}

export interface PredictResponse {
	file_url: string
	cost_summary: RouteMetric[]
}

export const fetchPrediction = async (): Promise<PredictResponse> => {
	const response = await fetch(`${API_BASE_URL}/api/v1/find_route`)

	if (!response.ok) {
		throw new Error('Failed to load prediction data')
	}

	return (await response.json()) as PredictResponse
}
