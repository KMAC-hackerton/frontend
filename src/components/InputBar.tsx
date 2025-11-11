import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Box,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useInputBarContext } from '../Context/InputBarContext'
import {
    VESSEL_SIZES,
    VESSEL_TYPES,
    WEIGHT_LABELS,
    type WeightKey,
} from '../constants/inputBar'
import WeightSlider from './WeightSlider'

const InputBar = () => {
    const {
        departure,
        destination,
        vesselType,
        vesselSize,
        setDeparture,
        setDestination,
        setVesselType,
        setVesselSize,
        generateResults,
        loading,
    } = useInputBarContext()

    const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent<string>) => {
        setter(event.target.value)
    }

    return (
        <Box
            sx={{
                width: '40%',
                pl: 7,
                pt: 5,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Stack spacing={3} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <Stack spacing={3}>
                    <Stack spacing={2}>
                        <TextField
                            label="Departure"
                            placeholder="Busan"
                            value={departure}
                            onChange={(event) => setDeparture(event.target.value)}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Destination"
                            placeholder="Osaka"
                            value={destination}
                            onChange={(event) => setDestination(event.target.value)}
                            size="small"
                            fullWidth
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            Vessel Information
                        </Typography>
                        <Stack direction="row" spacing={1.5}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="vessel-type-label">Type</InputLabel>
                                <Select
                                    labelId="vessel-type-label"
                                    value={vesselType}
                                    label="Type"
                                    onChange={handleSelectChange(setVesselType)}
                                >
                                    {VESSEL_TYPES.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="vessel-size-label">Size</InputLabel>
                                <Select
                                    labelId="vessel-size-label"
                                    value={vesselSize}
                                    label="Size"
                                    onChange={handleSelectChange(setVesselSize)}
                                >
                                    {VESSEL_SIZES.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Divider />

                    <Stack spacing={1.5}>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            Weighting
                        </Typography>
                        <Stack spacing={2}>
                            {(Object.keys(WEIGHT_LABELS) as WeightKey[]).map((key) => (
                                <WeightSlider key={key} label={WEIGHT_LABELS[key]} weightKey={key} />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Button
                    variant="contained"
                    size="large"
                    onClick={generateResults}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </Stack>
        </Box>
    )
}

export default InputBar