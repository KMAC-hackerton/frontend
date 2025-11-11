import { Box } from '@mui/material'
import InputBar from '../components/InputBar'
import ResultsDisplay from '../components/ResultsDisplay'


const MainPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}
        >
            <InputBar />
            <ResultsDisplay />
        </Box>
    )
}

export default MainPage