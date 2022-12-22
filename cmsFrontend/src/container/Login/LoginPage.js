import { Box } from '@mui/material';
import { useTheme, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { tokens } from '../../theme';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { handleLoginService } from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { TYPE_LOGIN } from '../../utils/constant';
export default function LoginPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const handleLogin = async () => {
        localStorage.setItem(TYPE_LOGIN.TYPE_LOGIN, TYPE_LOGIN.TRADITIONAL);
        let res = await handleLoginService({
            email: inputValues.email,
            password: inputValues.password,
        });
        if (res && res.errCode === 0) {
            localStorage.setItem(TYPE_LOGIN.USER_DATA, JSON.stringify(res.user));

            if (res.user.roleId === TYPE_LOGIN.ROLE_ADMIN) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            toast.error(res.errMessage);
        }
    };
    const handleLoginOauth = () => {
        localStorage.setItem(TYPE_LOGIN.TYPE_LOGIN, TYPE_LOGIN.OAUTH);
        loginWithRedirect();
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
                    Welcome to login !
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                    Sign in to your account to continue
                </Typography>
                <Box sx={{ backgroundColor: colors.primary[600] }} display="flex" gap={'10px'} padding="15px" borderRadius={'5px'}>
                    <InfoOutlinedIcon sx={{ color: colors.blueAccent[300] }} />
                    <Typography variant="h5" color={colors.blueAccent[300]}>
                        Use devtest01@gmail.com and @password123 to sign in
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    label="Email"
                    name="email"
                    color="secondary"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.firstName}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    name="password"
                    color="secondary"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.firstName}
                />
                <FormControlLabel sx={{ width: '100%' }} control={<Checkbox color="secondary" />} label="Remember me" />
                <Button
                    onClick={() => handleLogin()}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ fontWeight: 700, fontSize: '14px' }}
                >
                    Sign In
                </Button>
                <Button
                    onClick={() => handleLoginOauth()}
                    variant="contained"
                    color="redAccent"
                    fullWidth
                    style={{ fontWeight: 700, fontSize: '14px' }}
                >
                    Login with oAuth
                </Button>
            </Box>
        </Box>
    );
}
