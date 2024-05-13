import { Link, useNavigate } from "react-router-dom";
import EventFormular from "../components/EventFormular";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OpretEventSide() {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    // Gemmer et ny-oprettet event. Hvis det går godt,
    // så dirigeres brugeren til forside, ellers toast-besked
    // med fejlmeddelelse.
    async function OpretEvent(nytevent) {
        const url = "https://events2-95c96-default-rtdb.europe-west1.firebasedatabase.app/events.json";

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(nytevent)
            });
            const data = await response.json();
            console.log(data);
            // navigate("/");
            toast.success("Dit event blev oprettet.")
        } catch {
            toast.error("Dit forsøg på at oprette et event mislykkedes. Prøv igen senere.")
        }
    }

    // Tjekker om bruger er logget ind, hvis ikke brugeren er 
    // logget ind, så dirigeres brugeren til login-siden.
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [user, loading, navigate]);

    return (
        <>
            <section>
                <Link to="/">Til forsiden</Link>
                <h1>Opret nyt event</h1>
                <EventFormular savePost={OpretEvent} />
            </section>
            <ToastContainer />
        </>
    );
}