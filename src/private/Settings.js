import { Container } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"

import PageHeader from "./components/PageHeader"

export default function Settings() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<SettingsIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Settings"
            />

        </Container>
    )
}
