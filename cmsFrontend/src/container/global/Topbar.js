import { Box, IconButton, useTheme, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Language from '../../components/Language';
import UserInfoMenu from '../../components/UserInfoMenu';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
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
                    <UserInfoMenu />
                </Box>
            </Box>
        </div>
    );
};
export default Topbar;
