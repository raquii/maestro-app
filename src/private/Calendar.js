import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container, Paper, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

import './calendar/calendar.css';

import PageHeader from './components/PageHeader';
import CalendarToolbar from './calendar/CalendarToolbar';
import EventTypes from './calendar/EventTypes';
import EventForm from './calendar/EventForm';
import EventSummary from './calendar/EventSummary';
import CalendarSettings from './calendar/CalendarSettings';

export default function Calendar() {
  const settings = useSelector(state => state.settings.attributes);
  const events = useSelector(state => state.events);
  const colors = {
    lesson: settings.lessonColor,
    group_lesson: settings.groupLessonColor,
    recital: settings.recitalColor,
    make_up_lesson: settings.makeUpLessonColor,
    vacation: settings.vacationColor,
    birthday: settings.birthdayColor,
  };
  const eventsWithColors = events.map(e => ({ ...e, color: colors[e.eventType] }))

  const [selectedEvent, setSelectedEvent] = useState({});

  const calendarRef = useRef();

  const [openMenu, setOpenMenu] = useState({
    eventTypes: false,
    eventSummary: false,
    calendarSettings: false,
  });

  const handleMenus = (menu) => {
    switch (menu) {
      case 'eventTypes':
        setOpenMenu({ ...openMenu, eventTypes: true })
        break;
      case 'eventSummary':
        setOpenMenu({ ...openMenu, eventSummary: true })
        break;
      case 'calendarSettings':
        setOpenMenu({ ...openMenu, calendarSettings: true })
        break;
      default:
        setOpenMenu({
          eventTypes: false,
          eventSummary: false,
          calendarSettings: false,
        })
        break;
    }
  };

  const handleEventClick = (e) => {
    const id = e.event.id;
    const event = events.find(evt => evt.id === id);
    setSelectedEvent(event);
    handleMenus('eventSummary')
  };

  const handleDateClick = (e) => {
    console.log(e)
  }
  const { path, url } = useRouteMatch();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {openMenu.eventTypes &&
        <EventTypes
          closeMenu={handleMenus}
          open={openMenu.eventTypes}
        />
      }
      {openMenu.eventSummary &&
        <EventSummary
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          closeMenu={handleMenus}
          open={openMenu.eventSummary}
          url={url}
        />
      }
      {openMenu.calendarSettings &&
        <CalendarSettings
          open={openMenu.calendarSettings}
          handleClose={handleMenus}
        />
      }
      <Switch>
        <Route exact path={`${path}/event-details`}>
          <EventForm />
        </Route >
        <Route path={`${path}/event-details/:id`}>
          <EventForm event={selectedEvent} setSelectedEvent={setSelectedEvent} />
        </Route >
        <Route path={`${path}/default-event-details`}>
          <EventForm defaultLesson={true} />
        </Route >
        <Route exact path={`${path}`}>
          <PageHeader icon={<EventIcon fontSize="large" sx={{ mr: 1 }} />} page="Calendar" />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <CalendarToolbar
                  handleMenus={handleMenus}
                  calendarRef={calendarRef}
                  url={url}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: 'auto' }}>
                <div id='calendar'>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={settings.initialView}
                    weekends={settings.weekends}
                    ref={calendarRef}
                    events={eventsWithColors}
                    eventClick={handleEventClick}
                    nowIndicator={true}
                    dateClick={handleDateClick}
                    slotMinTime={settings.slotMinTime}
                    slotMaxTime={settings.slotMaxTime}
                    eventColor="#ee7d68"
                    height='auto'
                    
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </Container>
  )
}
