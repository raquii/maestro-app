import { Container, Typography } from "@mui/material"

export default function Welcome() {
    return (
        <Container component="main" sx={{ mt: 4, textAlign: "left" }}>
            <Typography variant="h1" color="text" fontFamily="Merriweather" fontStyle="italic">
                Motif:
            </Typography>
            <Typography variant="h3" color="text">
                A Scheduling App for Music Teachers &amp; Students
            </Typography>
        </Container>
    )
}
