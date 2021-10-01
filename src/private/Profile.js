import { Container } from "@mui/material"
import AccountBox from "@mui/icons-material/AccountBox"

import PageHeader from "./components/PageHeader"

export default function Profile() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<AccountBox fontSize="large" sx={{ mr: 1 }} />}
                page="Profile"
            />
            
        </Container>
    )
}
