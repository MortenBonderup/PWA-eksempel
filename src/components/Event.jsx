/* eslint-disable */

import { useNavigate } from "react-router-dom";

export default function Event({ event, AabnDialog }) {
    const navigate = useNavigate();

    function haandterKlik() {
        navigate(`opdater/${event.id}`);
    }

    return (
        <article className="aktivitet" style={{ border: "1px solid black", width: "400px" }}>
            <h3>{event.titel}</h3>
            <p>{event.tidspunkt}</p>
            <p>{event.sted}</p>
            <p><button onClick={AabnDialog} value={event.id}>Vis mere...</button></p>
            <p><button onClick={haandterKlik}>Rediger event</button></p>
        </article>

    );
}