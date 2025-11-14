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
    Paper,
} from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'
import BarChartIcon from '@mui/icons-material/BarChart'
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
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 3,
                                gap: 2.5,
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1.5,
                            }}>
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: '#E3F2FD',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <RoomIcon sx={{
                                        color: '#1976D2',
                                        fontSize: 24,
                                    }}/>
                                </Box>
                                <Typography variant="h6" fontWeight={600}>Route Configuration</Typography>
                            </Box>
                            <Divider/>
                            <TextField
                                label="Departure lat"
                                placeholder="35.04"
                                value={departure_lat}
                                onChange={(event) => {
                                    const value = event.target.value
                                    // 빈 문자열이거나 유효한 숫자 형식만 허용 (-, -., 123, 123., 123.45 등)
                                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                                        setDepartureLat(value)
                                    }
                                }}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Departure lon"
                                placeholder="129.01"
                                value={departure_lon}
                                onChange={(event) => {
                                    const value = event.target.value
                                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                                        setDepartureLon(value)
                                    }
                                }}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Destination lat"
                                placeholder="34.39"
                                value={destination_lat}
                                onChange={(event) => {
                                    const value = event.target.value
                                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                                        setDestinationLat(value)
                                    }
                                }}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Destination lon"
                                placeholder="135.24"
                                value={destination_lon}
                                onChange={(event) => {
                                    const value = event.target.value
                                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                                        setDestinationLon(value)
                                    }
                                }}
                                size="small"
                                fullWidth
                            />
                        </Paper>
                    </Stack>

                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 2.5,
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: '#E3F2FD',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <DirectionsBoatIcon sx={{
                                    color: '#1976D2',
                                    fontSize: 24,
                                }}/>
                            </Box>
                            <Typography variant="h6" fontWeight={600}>Vessel Information</Typography>
                        </Box>
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
                    </Paper>

                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 1,
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: '#E8F5E9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <BarChartIcon sx={{
                                    color: '#2E7D32',
                                    fontSize: 24,
                                }}/>
                            </Box>
                            <Typography variant="h6" fontWeight={600}>Environmental Weighting</Typography>
                        </Box>
                        <Stack spacing={2}>
                            {(Object.keys(WEIGHT_LABELS) as WeightKey[]).map((key) => (
                                <WeightSlider key={key} label={WEIGHT_LABELS[key]} weightKey={key} />
                            ))}
                        </Stack>
                    </Paper>
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