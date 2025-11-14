export type WeightKey = 'fuel' | 'blackCarbon' | 'risk'

export const ICE_CLASSES = [
  { value: 'HighPC', label: 'PC1 ~ PC5' },
  { value: 'MediumPC', label: 'PC6 / PC7' },
  { value: 'NonePC', label: 'Non-Ice Class' },
] as const

export const FUEL_TYPES = [
  { value: 'MGO', label: 'MGO' },
  { value: 'LSFO', label: 'LSFO' },
  { value: 'LNG', label: 'LNG'},
  { value: 'eMeOH', label: 'eMeOH' },
] as const

export const WEIGHT_LABELS: Record<WeightKey, string> = {
  fuel: 'Fuel',
  blackCarbon: 'Black Carbon',
  risk: 'Risk',
}

export const DEFAULT_WEIGHT_VALUES: Record<WeightKey, number> = {
  fuel: 60,
  blackCarbon: 20,
  risk: 20,
}
