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
    ICE_CLASSES,
    FUEL_TYPES,
    WEIGHT_LABELS,
    type WeightKey,
} from '../constants/inputBar'
import WeightSlider from './WeightSlider'

const InputBar = () => {
    const {
        departure_lat,
        departure_lon,
        destination_lat,
        destination_lon,
        iceClass,
        fuelType,
        setDepartureLat,
        setDepartureLon,
        setDestinationLat,
        setDestinationLon,
        setIceClass,
        setFuelType,
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
                            label="Departure lat"
                            placeholder="35.04"
                            value={departure_lat}
                            onChange={(event) => setDepartureLat(Number(event.target.value))}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Departure lon"
                            placeholder="129.01"
                            value={departure_lon}
                            onChange={(event) => setDepartureLon(Number(event.target.value))}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Destination lat"
                            placeholder="34.39"
                            value={destination_lat}
                            onChange={(event) => setDestinationLat(Number(event.target.value))}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Destination lon"
                            placeholder="135.24"
                            value={destination_lon}
                            onChange={(event) => setDestinationLon(Number(event.target.value))}
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
                                <InputLabel id="ice-class-label">Ice Class</InputLabel>
                                <Select
                                    labelId="ice-class-label"
                                    value={iceClass}
                                    label="Ice Class"
                                    onChange={handleSelectChange(setIceClass)}
                                >
                                    {ICE_CLASSES.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
                                <Select
                                    labelId="fuel-type-label"
                                    value={fuelType}
                                    label="Fuel Type"
                                    onChange={handleSelectChange(setFuelType)}
                                >
                                    {FUEL_TYPES.map((option) => (
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