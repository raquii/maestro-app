import { Container, Typography } from "@mui/material"
import MoneyIcon from '@mui/icons-material/MonetizationOnOutlined';

import PageHeader from "./components/PageHeader"


export default function Billing() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<MoneyIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Billing"
            />
            <Typography variant="h3" color="initial">Coming Soon!</Typography>
        </Container>
    )
}
