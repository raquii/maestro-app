import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect } from 'react';

import Private from './private/Private';
import Public from './public/Public';
import './App.css';
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

function handleEventClick(clickInfo){
  console.log(clickInfo.event)
}


function App() {

  useEffect(() => {
    fetch('http://localhost:3000/me', {
      headers:{
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem("token"),
      }
    })
    .then(r=>r.json())
    .then(data=>console.log(data))
  }, [])

  return (
    <div className="App">
      <Private/>
      {/* <FullCalendar 
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={data} 
        eventClick={handleEventClick}
        nowIndicator={true}
        slotMinTime="09:00"
        slotMaxTime="21:00"
        eventColor="#ee7d68"
      /> */}
    </div>
  );
}

export default App;
