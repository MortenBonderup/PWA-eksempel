/* eslint-disable */

export default function Event({ event, AabnDialog }) {

    return (
        <article className="aktivitet">
            <h3>{event.titel}</h3>
            <p>{event.tidspunkt}</p>
            <p>{event.sted}</p>
            <p><button onClick={AabnDialog} value={event.id}>Vis mere...</button></p>
        </article>

    );
}