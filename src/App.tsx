import { Route, Routes, useNavigate } from 'react-router-dom'
import { LiveVideo } from './assets/components/LiveVideo'
import { ConnectForm } from './assets/components/ConnectForm';
import './App.css'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

function App() {
  const navigate = useNavigate()
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  const handleConnect = (channelName: string) => {
    navigate(`/via/${channelName}`) // on form submit, navigate to new route
  }

  return (
    <Routes>
      <Route path='/' element={ <ConnectForm connectToVideo={ handleConnect } /> } />
      <Route path='/via/:channelName' element={
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
      } />
    </Routes>
  )
}

export default App