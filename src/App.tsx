import { Box } from '@mui/material'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import { InputBarProvider } from './Context/InputBarContext'

function App() {
  return (
    <InputBarProvider>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f7f9fc',
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
          <MainPage />
        </Box>
        <Footer />
      </Box>
    </InputBarProvider>
  )
}

export default App
