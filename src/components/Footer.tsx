import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Link, Stack, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f1f1f1',
                width: '100%',
                py: 2,
                px: { xs: 3, sm: 6 },
            }}
        >
            <Stack spacing={1.5} alignItems="flex-start" sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 0.2 }}>
                    GitHub
                </Typography>
                <Stack direction="row" spacing={4}>
                    <Link
                        href="https://github.com/KMAC-hackerton/frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 500,
                            color: 'text.primary',
                        }}
                        aria-label="Go to GitHub frontend repository"
                    >
                        <GitHubIcon fontSize="small" />
                        <Typography variant="body2" component="span">
                            Frontend Repository
                        </Typography>
                    </Link>
                    <Link
                        href="https://github.com/KMAC-hackerton/backend"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 500,
                            color: 'text.primary',
                        }}
                        aria-label="Go to GitHub backend repository"
                    >
                        <GitHubIcon fontSize="small" />
                        <Typography variant="body2" component="span">
                            Backend Repository
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Footer
