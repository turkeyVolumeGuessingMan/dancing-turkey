import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Gobble from './lib/gobble';


function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div></div>
  }
  return (
    <Gobble />
  )
}

export default App
