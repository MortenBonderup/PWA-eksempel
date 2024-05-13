import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventFormular from "../components/EventFormular";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OpdaterEventSide() {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const params = useParams();
    const [user, loading] = useAuthState(auth);

    const url = `https://events2-95c96-default-rtdb.europe-west1.firebasedatabase.app/events/${params.eventId}.json`;

    // Henter oplysninger for det udvalgte event og 
    // gemmer oplysningerne i "event" variablen.
    useEffect(() => {
        async function getEvent() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setEvent(data);
            } catch {
                toast.error("Eventet kan ikke indlæses og opdateres. Prøv igen senere.")
            }
        }
        getEvent();
    }, [url]);

    // Kontrollerer om brugeren er logget på. Hvis ikke sendes 
    // brugeren til login-siden.
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [user, loading, navigate]);

    // Gemmer det opdaterede event med de ny-indtastede
    // oplysninger i Firebase.
    async function gemEvent(opdateretEvent) {
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(opdateretEvent)
            });
            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch {
            toast.error("Dit forsøg på at opdatere eventet mislykkedes. Prøv igen senere.")
        }
    }

    // Sletter det specifikke event efter at brugeren har bekræftet, at det
    // er det som skal ske.
    async function sletEvent() {
        const bekraeftSlet = window.confirm(`Vil du slette dette event "${event.titel}"?`)

        if (bekraeftSlet) {
            try {
                const response = await fetch(url, {
                    method: "DELETE"
                });

                const data = await response.json();
                console.log(data);
                navigate("/");
            } catch {
                toast.error("Dit forsøg på at slette eventet mislykkedes. Prøv igen senere.")
            }
        }

    }

    return (
        <>
            <section>
                <Link to="/">Til forsiden</Link>
                <h1>Opdater Event</h1>
                <EventFormular post={event} savePost={gemEvent} />
                <button onClick={sletEvent}>
                    Slet event
                </button>
            </section>
            <ToastContainer />
        </>
    );
}