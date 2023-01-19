import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../mockTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
function ProvideTheme(props) {
    const [theme, colorMode] = useMode();
    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ColorModeContext.Provider value={colorMode}>
                            <ThemeProvider theme={theme}>
                                <CssBaseline />
                                {props.children}
                            </ThemeProvider>
                        </ColorModeContext.Provider>
                    </LocalizationProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
}
export default ProvideTheme;
