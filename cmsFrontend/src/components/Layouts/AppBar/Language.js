import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useDispatch } from 'react-redux';
import { changeLanguageStart } from '../../../redux/action/LanguageAction';
import { FLAG_URL } from '../../../utils/constant';
import { USER_REFERENCE } from '../../../utils/constant';
export default function Language() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const open = Boolean(anchorEl);

    const AvatarUrl = {
        vi: FLAG_URL.VI,
        en: FLAG_URL.EN,
    };
    const fetchUserReference = () => {
        let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
        if (userReference && userReference.language) {
            return userReference.language;
        } else {
            return 'vi';
        }
    };
    const [url, seturl] = React.useState(AvatarUrl[fetchUserReference()]);
    //const [url, seturl] = React.useState(AvatarUrl['vi']);
    const dispatch = useDispatch();
    const handleClick = (event, value) => {
        setAnchorEl(event.currentTarget);
        if (value) {
            seturl(AvatarUrl[value]);
            dispatch(changeLanguageStart(value));
            let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
            localStorage.setItem(USER_REFERENCE.USER_REFERENCE, JSON.stringify({ ...userReference, language: value }));
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Vietnamese">
                    <IconButton
                        onClick={(e) => handleClick(e)}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={url} sx={{ width: 24, height: 24 }}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiAvatar-root': {
                            width: 24,
                            height: 24,
                        },
                        borderRadius: '6px',
                        backgroundColor: colors.primary[400],
                        width: '40px',
                    },
                }}
                transformOrigin={{ horizontal: 'top', vertical: 'center' }}
                anchorOrigin={{ horizontal: 'bottom', vertical: 'center' }}
            >
                <Box display="flex" flexDirection="column">
                    <Tooltip title="Vietnamese">
                        <IconButton
                            onClick={(e) => handleClick(e, 'vi')}
                            size="small"
                            sx={{ ml: 0.5 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar src={AvatarUrl.vi} sx={{ width: 24, height: 24 }}></Avatar>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="English">
                        <IconButton
                            onClick={(e) => handleClick(e, 'en')}
                            size="small"
                            sx={{ ml: 0.5 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar src={AvatarUrl.en} sx={{ width: 24, height: 24 }}></Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Menu>
        </React.Fragment>
    );
}
