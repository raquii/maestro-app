import {Box, Typography} from '@mui/material'

export default function PageHeader({page, icon}) {
    return (
        <Box sx={{ textAlign: 'left', display: 'flex', alignItems: 'center'}}>
                {icon}
                <Typography variant="h4" component="h1">
                    {page}
                </Typography>
        </Box>
    )
}
