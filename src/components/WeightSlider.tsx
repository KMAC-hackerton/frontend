import { Box, Slider, Stack, Typography } from '@mui/material'
import { useInputBarContext } from '../Context/InputBarContext'
import type { WeightKey } from '../constants/inputBar'

type WeightSliderProps = {
    weightKey: WeightKey
    label: string
}

const SLIDER_COLORS: Record<WeightKey, { main: string; bg: string }> = {
    fuel: { main: '#2196F3', bg: '#E3F2FD' },
    blackCarbon: { main: '#607D8B', bg: '#ECEFF1' },
    risk: { main: '#FF9800', bg: '#FFF3E0' },
}

const WeightSlider = ({ weightKey, label }: WeightSliderProps) => {
    const { weights, setWeight } = useInputBarContext()

    const handleChange = (_: unknown, newValue: number | number[]) => {
        const nextValue = Array.isArray(newValue) ? newValue[0] : newValue
        setWeight(weightKey, nextValue)
    }

    const colors = SLIDER_COLORS[weightKey]

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600} color="text.primary">
                    {label}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: colors.bg,
                        color: colors.main,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                    }}
                >
                    {weights[weightKey].toFixed(1)}%
                </Box>
            </Stack>
            <Slider
                value={weights[weightKey]}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                onChange={handleChange}
                sx={{
                    color: colors.main,
                    '& .MuiSlider-thumb': {
                        backgroundColor: colors.main,
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: colors.main,
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#E0E0E0',
                    },
                }}
            />
        </Stack>
    )
}

export default WeightSlider