import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
    direction: 'rtl',
    typography: {
        fontFamily: 'IranSans, Arial, sans-serif',
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#4CF09D',
                },
                background: {
                    default: '#E9E9E9',
                },
            }
            : {
                primary: {
                    main: '#4CF09D',
                },
                background: {
                    default: '#1A1A1A',
                    paper: '#1d1d1d',
                },
                text: {
                    primary: '#ffffff',
                },
            }),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    margin: 0,
                },
            },
        },
    },
});

export const theme = (mode) => {
    const themeOptions = getDesignTokens(mode);
    return createTheme({
        ...themeOptions,
        direction: 'rtl',
    });
};
