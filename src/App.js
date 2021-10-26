import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'

import { useIsLoggedInMutation } from './features/api'
import Private from './private/Private';
import Public from './public/Public';
import './App.css';


function App() {
  const [isLoggedIn, { isSuccess }] = useIsLoggedInMutation();
  const history = useHistory();
  const email = useSelector(state => state.user.email);


  useEffect(() => {
    isLoggedIn()
      .unwrap()
      .then(() => {
          history.push('/dashboard')
      })
    .catch(()=>history.push('/welcome'))
  }, [history, isLoggedIn]);

  return (
    <div className="App">
      {email.length > 0 ?
        <Private />
        :
        <Public />
      }
    </div>
  );
}

export default App;
