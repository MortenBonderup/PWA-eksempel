/* eslint-disable */

import { useEffect, useState } from "react";

export default function EventFormular({ savePost, post }) {
    const [titel, setTitel] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [tidspunkt, setTidspunkt] = useState("");
    const [sted, setSted] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        if (post) {
            setTitel(post.titel);
            setTidspunkt(post.tidspunkt);
            setSted(post.sted);
            setBeskrivelse(post.beskrivelse);
        }
    }, [post]);

    async function haandterFormular(e) {
        e.preventDefault();
        const formData = {
            titel: titel,
            tidspunkt: tidspunkt,
            sted: sted,
            beskrivelse: beskrivelse
        }

        savePost(formData);

    }

    return (
        <form onSubmit={haandterFormular}>
            <label style={{ display: "block" }}>
                Titel
                <input type="text" name="titel" value={titel || ""} placeholder="Indtast event-titel" onChange={e => setTitel(e.target.value)} required />
            </label>
            <label style={{ display: "block" }}>
                Tidspunkt<input type="text" name="tidspunkt" value={tidspunkt || ""} placeholder="Indtast tidspunkt" onChange={e => setTidspunkt(e.target.value)} required />
            </label>
            <label style={{ display: "block" }}>
                Sted<input type="text" name="sted" value={sted || ""} placeholder="Indtast sted" onChange={e => setSted(e.target.value)} required />
            </label>
            <label style={{ display: "block" }}>
                Beskrivelse<textarea name="beskrivelse" value={beskrivelse || ""} placeholder="Indtast beskrivelse" onChange={e => setBeskrivelse(e.target.value)} cols="50" rows="10" required />
            </label>

            <p className="text-error">{errorMessage}</p>
            <button type="submit">Gem event</button>
        </form>
    );

}