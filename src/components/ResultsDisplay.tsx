import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useInputBarContext } from '../Context/InputBarContext'

const ResultsDisplay = () => {
    const { metrics, loading } = useInputBarContext()
    const hasMetrics = metrics.length > 0

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                px: 6,
                py: 5,
            }}
        >
            <Paper
                elevation={0}
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    minHeight: 260,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eef3fb',
                    borderRadius: 2,
                }}
            >
                <Typography variant="subtitle1" color="text.secondary">
                    Map placeholder
                </Typography>
            </Paper>

            <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ borderRadius: 2, overflow: 'hidden' }}
            >
                <Table size="small" aria-label="route metrics">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Value (a.u.)
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Share (%)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Loading results...
                                </TableCell>
                            </TableRow>
                        ) : hasMetrics ? (
                            metrics.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell component="th" scope="row">
                                        {row.metric}
                                    </TableCell>
                                    <TableCell align="right">{row.value.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.share.toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Generate a route to view results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ResultsDisplay