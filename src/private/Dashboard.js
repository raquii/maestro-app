import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';

import PageHeader from "./components/PageHeader";

export default function Dashboard() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PageHeader
                icon={<HomeIcon fontSize="large" sx={{ mr: 1 }} />}
                page="Dashboard"
            />
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h4" component='h2' gutterBottom color="primary" sx={{textAlign:'left'}}>
                            Schedule
                        </Typography>
                        <Divider sx={{mb:2}} />
                        <FullCalendar
                            plugins={[timeGridPlugin]}
                            initialView="timeGridDay"
                            nowIndicator={true}
                            slotMinTime="10:00"
                            slotMaxTime="21:00"
                            eventColor="#ee7d68"
                            contentHeight='auto'
                            expandRows
                        />

                    </Paper>
                </Grid>
                <Grid container item xs={12} md={4} spacing={2} direction='column'>
                    <Paper
                        sx={{
                            mt:2,
                            p: 2,
                            height: 100,
                            mb: 2
                        }}
                    >
                        <Grid item xs={12} >
                            Something About Students
                        </Grid>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            height: 100,
                            mb: 2
                        }}
                    >
                        <Grid item xs={12} >
                            Something Else About Students
                        </Grid>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            height: 100,
                            mb: 2
                        }}
                    >
                        <Grid item xs={12} >
                            Something Else About Students
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" component='h3' gutterBottom color="primary" sx={{textAlign:'left'}}>
                            Attendance
                        </Typography>
                        <Divider sx={{mb:2}} />
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    )
}
