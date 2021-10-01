import { Container } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"

import PageHeader from "./components/PageHeader"

export default function Students() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<GroupsIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Students"
            />
            
        </Container>
    )
}
