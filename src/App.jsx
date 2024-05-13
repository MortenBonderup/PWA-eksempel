import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Forside from './pages/Forside'
import OpdaterEventSide from './pages/OpdaterEventSide'
import OpretEventSide from './pages/OpretEventSide'
import LoginSide from './pages/LoginSide'
import LogoutSide from './pages/LogoutSide'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Forside />} />
      <Route path="/login" element={<LoginSide />} />
      <Route path="/logout" element={<LogoutSide />} />
      <Route path="/opret" element={<OpretEventSide />} />
      <Route path="/opdater/:eventId" element={<OpdaterEventSide />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
