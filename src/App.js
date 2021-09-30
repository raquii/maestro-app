import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'

import {useIsLoggedInMutation} from './features/api'
import Private from './private/Private';
import Public from './public/Public';
import './App.css';


function App() {
  const [isLoggedIn] = useIsLoggedInMutation();
  const history = useHistory();

  const checkForToken = useCallback(async () => {
    try {
      await isLoggedIn().unwrap()
      history.push('/dashboard')
    } catch (error) {
      console.error()
      history.push('/home')
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    checkForToken()
  }, [checkForToken]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/me', {
  //     headers:{
  //       "Content-Type": 'application/json',
  //       Authorization: localStorage.getItem("token"),
  //     }
  //   })
  //   .then(r=>r.json())
  //   .then(data=>console.log(data))
  // }, [])

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
