import { Box } from '@mui/material';
import { tokens } from '../../theme';
import { useTheme, Typography, Button } from '@mui/material';

function Home() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let handleNavigateLogin = () => {
        window.location.href = process.env.REACT_APP_URL_LOGIN;
    };

    return (
        <Box display={'flex'} margin="0 auto" justifyContent="center" width={'100%'} alignItems={'center'}>
            <Box
                sx={{ backgroundColor: colors.primary[400], padding: '40px', borderRadius: '5px' }}
                display="flex"
                flexDirection={'column'}
                justifyContent="center"
                alignItems={'center'}
                gap="20px"
            >
                <Typography variant="h3" color={colors.greenAccent[500]}>
                    Welcome to CMS dashboard !
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                    Sign in to your account to continue
                </Typography>

                <Button
                    onClick={() => handleNavigateLogin()}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ fontWeight: 700, fontSize: '14px' }}
                >
                    Sign In
                </Button>
                <Button variant="contained" color="redAccent" fullWidth style={{ fontWeight: 700, fontSize: '14px' }}>
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
}
export default Home;
