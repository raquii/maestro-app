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
  const email = useSelector(state => state.user.email);

  const checkForToken = useCallback(async () => {
    try {
      await isLoggedIn().unwrap()
      history.push('/dashboard')
    } catch (error) {
      console.error()
      history.push('/welcome')
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    checkForToken()
  }, [checkForToken]);

  return (
    <div className="App">
      {email.length > 0 ? 
      <Private/> 
      :
      <Public/>
      }
    </div>
  );
}

export default App;
