import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

export default ResponsiveGrid;