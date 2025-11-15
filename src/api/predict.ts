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
	imageUrl: string
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

	// X-Cost-Summary 헤더에서 cost summary 추출
	const costSummaryHeader = response.headers.get('X-Cost-Summary')
	console.log('X-Cost-Summary Header:', costSummaryHeader)
	const cost_summary: RouteMetric[] = costSummaryHeader ? JSON.parse(costSummaryHeader) : []
	console.log('Parsed cost_summary:', cost_summary)

	// 이미지 blob을 URL로 변환
	const imageBlob = await response.blob()
	const imageUrl = URL.createObjectURL(imageBlob)

	return {
		imageUrl,
		cost_summary,
	}
}