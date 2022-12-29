import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
const ItemSidebar = ({ icon, text, open, url }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <Link style={{ textDecoration: 'none', color: colors.grey[100] }} to={url}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <Tooltip title={text} placement="bottom">
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </Tooltip>
                </ListItemButton>
            </Link>
        </ListItem>
    );
};

export default ItemSidebar;
