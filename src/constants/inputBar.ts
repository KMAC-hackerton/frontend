export type WeightKey = 'fuel' | 'blackCarbon' | 'noise' | 'risk'

export const VESSEL_TYPES = [
  { value: 'container', label: 'Container Ship' },
  { value: 'bulk', label: 'Bulk Carrier' },
  { value: 'tanker', label: 'Tanker' },
  { value: 'research', label: 'Research Vessel' },
] as const

export const VESSEL_SIZES = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const

export const WEIGHT_LABELS: Record<WeightKey, string> = {
  fuel: 'Fuel',
  blackCarbon: 'Black Carbon',
  noise: 'Noise',
  risk: 'Risk',
}

export const DEFAULT_WEIGHT_VALUES: Record<WeightKey, number> = {
  fuel: 60,
  blackCarbon: 20,
  noise: 10,
  risk: 10,
}
