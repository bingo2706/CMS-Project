import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useTheme } from '@mui/material';
import * as React from 'react';
import { tokens } from '../../theme';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ItemSidebar from '../../components/ItemSidebar';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { FormattedMessage } from 'react-intl';
import { useFetchUserInfo } from '../../container/customize/fetchInfoUser';
const drawerWidth = 240;

export default function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(true);
    const { data: dataUser } = useFetchUserInfo();
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        background: colors.primary[400],
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
        background: colors.primary[400],
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',

        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }));

    return (
        <Box
            sx={{
                display: 'flex',
                background: '#f2f0f0 !important',
            }}
        >
            <Drawer variant="permanent" open={open} theme={theme}>
                <DrawerHeader>
                    {open ? (
                        <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'} ml="15px">
                            <Typography variant="h3" color={colors.grey[100]}>
                                ADMIN
                            </Typography>
                            <IconButton sx={{ mr: 0.75 }} onClick={() => setOpen(!open)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <IconButton sx={{ mr: 0.75 }} onClick={() => setOpen(!open)}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    )}
                </DrawerHeader>
                {open && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={dataUser.image}
                                style={{ cursor: 'pointer', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                                {dataUser.firstName + ' ' + dataUser.lastName}
                            </Typography>
                            <Typography variant="h5" color={colors.greenAccent[500]}>
                                <FormattedMessage id="sidebar.titleJob" />
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Divider />
                <List>
                    <ItemSidebar icon={<HomeOutlinedIcon />} url="/admin" text={<FormattedMessage id="sidebar.dashboard" />} open={open} />
                    <ItemSidebar
                        icon={<AccountBoxOutlinedIcon />}
                        url="/admin/user"
                        open={open}
                        text={<FormattedMessage id="sidebar.user" />}
                    />
                    <ItemSidebar
                        icon={<NoteAltOutlinedIcon />}
                        url="/admin/project"
                        open={open}
                        text={<FormattedMessage id="sidebar.project" />}
                    />
                </List>
                <Divider />
                <List>
                    <ItemSidebar icon={<AutoDeleteIcon />} url="/admin/trash" open={open} text={<FormattedMessage id="sidebar.trash" />} />
                </List>
            </Drawer>
        </Box>
    );
}
