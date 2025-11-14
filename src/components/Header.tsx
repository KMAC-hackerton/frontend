import { AppBar, Toolbar, Typography, Box } from '@mui/material'

const Header: React.FC = () => {
    return (
        <AppBar position="static" elevation={1} sx={{ backgroundColor: '#105396ff' }}>
            <Toolbar sx={{ minHeight: 64, px: { xs: 2.5, sm: 3 } }} disableGutters>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.35rem' } }}>
                    Arctic Eco-Routing Service
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header