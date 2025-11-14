import { AppBar, Toolbar, Typography } from '@mui/material'

const Header: React.FC = () => {
    return (
        <AppBar 
            position="static" 
            elevation={0} 
            sx={{ 
                background: 'linear-gradient(90deg, #00BCD4 0%, #2196F3 100%)',
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)',
            }}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 2.5, sm: 3 } }} disableGutters>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.35rem' }, color: 'white' }}>
                    Arctic Eco-Routing Service
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header