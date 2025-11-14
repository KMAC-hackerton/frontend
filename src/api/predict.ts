const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export interface RouteMetric {
	Metric: string
	Value: number
	Unit: string
}

export interface PredictionRequest {
	t_start_idx: number
	t_goal_idx: number
	lat_start: number
	lon_start: number
	lat_goal: number
	lon_goal: number
	BCF: number
	fuel_type: string
	w_fuel: number
	w_bc: number
	w_risk: number
}

export interface PredictResponse {
	visualization_file: string
	cost_summary: RouteMetric[]
}

export const fetchPrediction = async (requestData: PredictionRequest): Promise<PredictResponse> => {
	const response = await fetch(`${API_BASE_URL}/api/v1/find_route`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData),
	})

	if (!response.ok) {
		throw new Error('Failed to load prediction data')
	}

	return (await response.json()) as PredictResponse
}

// 이미지 URL 생성 함수
export const getImageUrl = (filePath: string): string => {
	const fileName = filePath.split('/').pop() || ''
	return `${API_BASE_URL}/api/v1/images/${fileName}`
}