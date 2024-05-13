import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Forside from './pages/Forside'
import OpdaterEventSide from './pages/OpdaterEventSide'
import OpretEventSide from './pages/OpretEventSide'
import LoginSide from './pages/LoginSide'
import LogoutSide from './pages/LogoutSide'

function App() {
  const [events, setEvents] = useState([]);
  const [titel, setTitel] = useState("");
  const [beskrivelse, setBeskrivelse] = useState("");

  useEffect(() => {

    // dummy data vises når der ingen forbindelse er til firebase 
    // eller local storage.
    const dummy = [{
      id: "0",
      titel: "No data to show!",
      tidspunkt: "Try again later",
      sted: "We are so sorry.",
      beskrivelse: "No data to show. Try again later. Sorry!"
    }]

    async function getData() {
      try { // Prøv at forbinde til firebase,
        const response = await fetch("https://events2-95c96-default-rtdb.europe-west1.firebasedatabase.app/events.json")

        // Hvis forbindelsen til firebase kan etableres, 
        // gem events i events variabel og local storage.
        if (response.ok) {
          const data = await response.json();
          const postsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          setEvents(postsArray);
          localStorage.setItem("events", JSON.stringify(postsArray));
        }
        // Hvis der ikke kan etableres forbindelse til firebase, så
        // hent events fra local storage. Hvis ikke der er events 
        // i local storage, så vis dummy data til brugeren.
      } catch {
        if (localStorage.getItem("events") !== null) {
          setEvents(JSON.parse(localStorage.getItem("events")));
        } else {
          setEvents(dummy);
        }
      }
    }
    getData();
  }, []); // slut på useEffect

  // Start på funktion som håndterer dialogboks og dens indhold.
  async function AabnDialog(event) {
    const id = event.target.value;
    const dialog = document.getElementById("dialog");

    // Efter klik på læse mere knap, prøv at hente data for specifik
    // event i firebase.
    try {
      const response = await fetch(`https://events2-95c96-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`);

      // Hvis success med firebase, opdater titel og beskrivelse variable.
      if (response.ok) {
        const data = await response.json();
        setTitel(data.titel);
        setBeskrivelse(data.beskrivelse);
      }
      // Hvis ikke der er forbindelse til firebase, find titel og beskrivelse
      // for event i local storage.
    } catch {
      const event = events.find(event => event.id === id);
      setTitel(event.titel);
      setBeskrivelse(event.beskrivelse);
      // Viser dialog boks med titel og beskrivelsesinfo.
    } finally {
      dialog.showModal();
    }

  }

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
