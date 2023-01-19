import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box data-testid="icon">{icon}</Box>
                <Box>
                    <Typography data-testid="title" variant="h4" fontWeight="bold" fontSize={'48px'} sx={{ color: colors.grey[100] }}>
                        {title}
                    </Typography>
                    <Typography data-testid="subtitle" variant="h5" sx={{ color: colors.greenAccent[500] }}>
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default StatBox;
