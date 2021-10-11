import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { Container, Paper, Grid } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'

import PageHeader from './components/PageHeader'
import './calendar/calendar.css'
import CalendarToolbar from './calendar/CalendarToolbar'

export default function Calendar() {

  const data = [
    {
      id: 1,
      allDay: false,
      start: '',
      end: '',
      daysOfWeek: [1],
      startTime: '12:30',
      endTime: '13:30',
      startRecur: '2021-09-27',
      endRecur: '',
      title: 'Lisa Lesson',
      type: "Lesson"
    },
    {
      id: 2,
      allDay: false,
      start: '',
      end: '',
      daysOfWeek: [1],
      startTime: '13:30',
      endTime: '14:15',
      startRecur: '2021-09-27',
      endRecur: '',
      title: 'Hannah Lesson',
      type: "Lesson"
    },
    {
      id: 3,
      allDay: false,
      start: '',
      end: '',
      daysOfWeek: [1],
      startTime: '14:30',
      endTime: '15:30',
      startRecur: '2021-09-27',
      endRecur: '',
      title: 'Dennis Lesson',
      type: "Lesson"
    },
    {
      id: 4,
      allDay: false,
      start: '',
      end: '',
      daysOfWeek: [1],
      startTime: '15:45',
      endTime: '16:30',
      startRecur: '2021-09-27',
      endRecur: '',
      title: 'Audrianna Lesson',
      type: "Lesson"
    },
  ]


  const handleEventClick = () => {
    console.log('clicked')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        icon={<EventIcon fontSize="large" sx={{ mr: 1 }} />}
        page="Calendar"
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <CalendarToolbar />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              height: 'auto'
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={data}
              eventClick={handleEventClick}
              nowIndicator={true}
              slotMinTime="09:00"
              slotMaxTime="21:00"
              eventColor="#ee7d68"
              height='auto'
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
