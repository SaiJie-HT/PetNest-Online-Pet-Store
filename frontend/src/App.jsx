import { useState, useEffect } from 'react'
import './App.css'
import SignInPage from './pages/signInPage.jsx'

function App() {
  const [signInUser, setSignInUser] = useState(false);

  if (!signInUser) return <SignInPage userSignedIn = {setSignInUser}/>;

  return (
    <>

    </>
  )
}

export default App
