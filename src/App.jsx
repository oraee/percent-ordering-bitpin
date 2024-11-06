import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketList } from "./pages/marketList/MarketList.jsx";
import MarketDetails from "./pages/marketDetails/MarketDetails.jsx";
import { ThemeProvider, CssBaseline, IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { theme as createTheme } from './theme/theme';
import RTL from './theme/RTL.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <RTL>
            <ThemeProvider theme={createTheme(mode)}>
                <CssBaseline />
                <Router>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                        <IconButton onClick={toggleMode} color="inherit">
                            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </div>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: {
                                xs: '100%',
                                sm: '500px',
                            },
                        }}
                    >

                        <Routes>
                            <Route path="/" element={<MarketList />} />
                            <Route path="/market/:marketId" element={<MarketDetails />} />
                        </Routes>
                    </Box>
                </Router>
            </ThemeProvider>
        </RTL>
    );
}

export default App;
