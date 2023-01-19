import { Box, IconButton, useTheme, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Language from '../components/Layouts/AppBar/Language';
import UserInfoMenu from '../components/Layouts/AppBar/UserInfoMenu';
import { useNavigate } from 'react-router-dom';
//import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { IDENTITY_PROVIDER } from '../utils/constant';
import { HandleLogoutSuccess } from '../redux/action/UserAction';
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let dataUser = useSelector((state) => state.UserReducer.dataUser);
    // const { logout } = useAuth0();
    const handleLogout = () => {
        dispatch(HandleLogoutSuccess());
        localStorage.removeItem(IDENTITY_PROVIDER.ID_TOKEN);
        localStorage.removeItem(IDENTITY_PROVIDER.ACCESS_TOKEN);
        window.location.href = process.env.REACT_APP_URL_LOGOUT;
        //logout({ returnTo: `${window.location.origin}/login` });
    };
    const handleGotoAcount = () => {
        navigate(`/admin/user/detail/${dataUser.id}`);
    };
    return (
        <div>
            <Box display="flex" justifyContent="space-between" p={2}>
                {/* SEARCH BAR */}
                <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                    <Tooltip title="Search">
                        <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                {/* ICONS */}
                <Box display="flex">
                    <Tooltip title="Mode">
                        <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Notification">
                        <IconButton>
                            <NotificationsOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Language />

                    <Tooltip title="Setting">
                        <IconButton>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <UserInfoMenu handleLogout={handleLogout} handleGotoAcount={handleGotoAcount} />
                </Box>
            </Box>
        </div>
    );
};
export default Topbar;
