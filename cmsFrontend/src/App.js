import {} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import 'react-toastify/dist/ReactToastify.css';
import MyRoutes from './components/Routes/Routes';
import { withFormatDate } from './hoc/withFormatDate';
import { withToast } from './hoc/withToast';
import { compose } from 'redux';
function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <MyRoutes />
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default compose(withToast, withFormatDate)(App);
