import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Gobble from './lib/gobble';
import roastAFreshTurkey from './lib/turkey';
import lerkey from './lib/lerkey';

const turkey = roastAFreshTurkey();


function App() {

  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div></div>
  }
  return (
    <Gobble turkey={turkey} />
  )
}

export default App
