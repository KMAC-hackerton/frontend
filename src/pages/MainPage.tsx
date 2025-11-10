import { Box } from '@mui/material'
import InputBar from '../components/InputBar'


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
        </Box>
    )
}

export default MainPage