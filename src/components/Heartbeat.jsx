import { useEffect } from "react";
import { useState } from "react";

export default function Heartbeat() {

    const [status, setStatus] = useState("");

    async function tjekInternet() {
        try {
            const response = await fetch("https://pizzaprojektet-8987d-default-rtdb.europe-west1.firebasedatabase.app/pizza.json");

            // Hvis fetch er succesfuld, så
            if (response.ok) {
                setStatus("Online");
            } else {
                setStatus("Offline");
            }
        } // Slut på try

        catch { // Hvis der ikke er forbindelse til Internettet, så
            setStatus("Offline");
        }
    }

    // Hver gang komponenten indlæses, tjekkes der for internetforbindelse
    useEffect(() => {
        tjekInternet();
    }, []);

    return (
        <div>
            <p>Browseren er {status}</p>
            <button onClick={tjekInternet}>Tjek internet-forbindelsen</button>
        </div>
    )


}