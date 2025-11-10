import { Slider, Stack, Typography } from '@mui/material'
import { useInputBarContext } from '../Context/InputBarContext'
import type { WeightKey } from '../constants/inputBar'

type WeightSliderProps = {
    weightKey: WeightKey
    label: string
}

const WeightSlider = ({ weightKey, label }: WeightSliderProps) => {
    const { weights, setWeight } = useInputBarContext()

    const handleChange = (_: unknown, newValue: number | number[]) => {
        const nextValue = Array.isArray(newValue) ? newValue[0] : newValue
        setWeight(weightKey, nextValue)
    }

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                    {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {weights[weightKey]}%
                </Typography>
            </Stack>
            <Slider
                value={weights[weightKey]}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                onChange={handleChange}
            />
        </Stack>
    )
}

export default WeightSlider